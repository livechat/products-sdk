import { WidgetMixin } from './widget';

enum PropertiesEvents {
  UpdateProperties = 'update_properties'
}

export type IUpdateProperties = {
  onboarded?: boolean;
  plan?: string;
  error_code?: string | null;
} & Record<string, string | number | boolean | null | undefined>;

export interface IPropertiesApi {
  updateProperties(properties?: IUpdateProperties): Promise<void>;
}

export const withProperties: WidgetMixin<IPropertiesApi, void> = widget => ({
  ...widget,
  updateProperties(properties?: IUpdateProperties): Promise<void> {
    return widget.sendMessage(PropertiesEvents.UpdateProperties, properties);
  }
});
