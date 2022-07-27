import { withAmplitude } from "../shared/amplitude";
import { withCustomerProfile } from "../shared/customer-profile";
import { createWidget } from "../shared/widget";
import { IConnection, createConnection } from "../connection";
import { IDetailsWidgetEvents, IDetailsWidgetApi } from "./interfaces";

function DetailsWidget(connection: IConnection<IDetailsWidgetEvents>) {
  const base = createWidget<IDetailsWidgetApi, IDetailsWidgetEvents>(
    connection,
    {
      // putMessage(text: string): Promise<void> {
      //   return connection.sendMessage("put_message", text);
      // },
      // watchMessages(): Promise<void> {
      //   return connection.sendMessage("watch_messages");
      // },
      refreshSession(): Promise<void> {
        return connection.sendMessage("plugin_loaded");
      },
    }
  );

  const widget = withAmplitude(withCustomerProfile(base));

  return widget;
}

export interface IDetailsWidget extends ReturnType<typeof DetailsWidget> {}

export default function createDetailsWidget(): Promise<IDetailsWidget> {
  let widget: IDetailsWidget;
  return createConnection()
    .then((connection) => {
      widget = DetailsWidget(connection);
      return connection.sendMessage("plugin_inited");
    })
    .then(() => widget);
}
