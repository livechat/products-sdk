import { WidgetMixin } from './widget';

enum PropertiesEvents {
  UpdateProperties = 'update_properties'
}

export interface IPropertiesApi {
  updateProperties(properties?: object): Promise<void>;
}

export const withProperties: WidgetMixin<IPropertiesApi, void> = widget => ({
  ...widget,
  updateProperties(properties?: object): Promise<void> {
    return widget.sendMessage(PropertiesEvents.UpdateProperties, properties);
  }
});
