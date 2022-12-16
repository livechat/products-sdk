# HelpDesk SDK

This SDK is a set of tools that will help you integrate your apps with the [HelpDesk App](https://app.helpdesk.com//).

[![mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
![npm](https://img.shields.io/npm/v/@livechat/helpdesk-sdk?label=version)
[![turborepo](https://img.shields.io/badge/maintained%20with-turborepo-blueviolet)](https://turbo.build/repo)

For full documentation please head to [Building HelpDesk apps](https://developers.livechat.com/docs/getting-started/helpdesk-apps).

## Installation

The package can be installed directly from NPM.

```
npm install --save @livechat/helpdesk-sdk
```

The NPM package is distributed both as a CommonJS and ES6 module. It should be used together with a module bundler, such as Webpack or Rollup.

We also distrubute a UMD build of the package, which can be used directly in the browser.

```html
<script src="https://unpkg.com/@livechat/helpdesk-sdk@latest/dist/helpdesk-sdk.umd.min.js"></script>
```

## Basic usage

Use one of the methods exported by the SDK.

### `createDetailsWidget(): Promise<IDetailsWidget>`

Creates a widget instance to be used in the Ticket Details context.

```js
import { createDetailsWidget } from ‘@livechat/helpdesk-sdk’;

createDetailsWidget().then(widget => {
  // do something with the widget
});
```

### `createFullscreenWidget(): Promise<IFullscreenWidget>`

Creates a widget instance to be used as a Fullscreen app.

```js
import { createFullscreenWidget } from ‘@livechat/helpdesk-sdk’;

createFullscreenWidget().then(widget => {
  // do something with the widget
});
```

## Widgets (`IWidget`)

All widgets share a common interface.

- `on(eventName: string, eventHandler: (data: any) => void): void`) - registers the event handler to be called when a given event occurs

- `off(eventName: string, eventHandler: (data: any) => void): void`) - unregisters the previously registered handler from the event

You can use it to track the events happening in the HelpDesk App.

```js
import { createDetailsWidget } from ‘@livechat/agent-app-sdk’;

createDetailsWidget().then(widget => {
  function onTicketInfo(ticketInfo) {
    // do something with the ticket info when it changes
  }

  // register when you need it
  widget.on('ticket_info', onTicketInfo);

  // ...

  // unregister when you’re done
  widget.off('ticket_info', onTicketInfo);
});
```

Each widget type offers a different set of events that you can listen to. Check them out in the descriptions below.

## Details widget (`IDetailsWidget`)

A type of widget that has access to the Chat Details context.

### Events

#### `ticket_info`

Emitted when user opens a ticket within Tickets. The handler will get the ticket info object as an argument:

```ts
interface ITicketInfo {
  id: string;
  shortId: string;
  date: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  lastMessageAt?: Date;
  events: any[];
  requester: any;
  status: any;
  spam: any;
  subject: string;
  source: any;
  tagIds: string[];
  teamIds: string[];
  assignment: any;
  ratingRequestSent: boolean;
  totalRatings: number;
  rating?: any;
  ccs?: any[];
  draft?: any;
  integrations?: any;
  priority: any;
  followers: string[];
  childTickets: any[];
  parentTicket: any;
  customFields?: any;
}
```

### Methods

#### `getTicketInfo(): ITicketInfo | null`

Gets the ticket info recorded most recently. Returns the `ITicketInfo` object, which is identical to the one emitted by the `ticket_info` event or `null`.

#### `modifySection(section): Promise<void>`

With this method, you can modify any custom section declared in the widget's opening state in Developers Console. The `section` argument should be an object implementing the section defintion interface, for example:

```javascript
const section = {
  title: ‘My section’,
  components: [
    // …
    {
      type: ‘button’,
      data: {
        label: ‘My section button’,
        id: ‘section-button’
      }
    }
    // …
  ]
};

widget.modifySection(section);
```

The `title` of a given section has to match the one specified in the opening state. Otherwise, the section won't change. Also, the HelpDesk App ignores the commands without valid section definitions. Make sure that the definition you're sending is correct.

## Fullscreen widget (`IFullscreenWidget`)

### Events

This widget currently does not support any events.

### Methods

#### `setNotificationBadge(count: number | null): Promise<void>`

Displays a red badge on top of the Fullscreen app icon. Use this to notify users there’s something important inside the widget. Make sure users can dismiss the notification to avoid cluttered UI.

## Contributing

Pull requests are welcome. For major changes, please open an issue first, so we can discuss what you would like to change. Follow a [Contributing guide](https://github.com/livechat/products-sdk/blob/master/CONTRIBUTING.md) for more details.

## License

The code and documentation in this project are released under the [MIT License](https://choosealicense.com/licenses/mit/).
