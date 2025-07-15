import { connectToParent } from '@livechat/postmessage/es5';
import {
  IConnectionDriver,
  ConnectionListener,
  IInboxMessage,
  IOutboxMessage
} from './interfaces';
import { getIsEventOriginAllowed } from './helpers';

export function Plain(): IConnectionDriver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  let currentListener: ConnectionListener = (_: IInboxMessage) => { };

  function handleEvent(event) {
    const isEventOriginAllowed = getIsEventOriginAllowed(event.origin);

    if (isEventOriginAllowed) {
      currentListener(event.data);
    }
  }

  window.addEventListener('message', handleEvent);

  return {
    listen(listener: ConnectionListener) {
      currentListener = listener;
    },
    send(message: IOutboxMessage) {
      parent.postMessage(message, '*');
      return Promise.resolve();
    }
  };
}

interface ITrustedChild {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call: (method: string, ...args: any[]) => Promise<void>;
}

export function Trusted(): Promise<IConnectionDriver> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  let currentListener: ConnectionListener = (_: IInboxMessage) => { };

  function handleMessage(message: IInboxMessage) {
    currentListener(message);
  }

  return connectToParent({ handle: handleMessage }).promise.then(
    (child: ITrustedChild) => ({
      listen(listener: ConnectionListener) {
        currentListener = listener;
      },
      send(message: IOutboxMessage) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return child.call('handle', message).then(() => { });
      }
    })
  );
}
