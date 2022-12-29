import { WidgetMixin } from './widget';

export interface IAmplitudeApi {
  trackEvent(name: string, properties: object): Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const withAmplitude: WidgetMixin<IAmplitudeApi, {}> = widget => ({
  ...widget,
  trackEvent(name: string, properties: object): Promise<void> {
    if (typeof name !== 'string' || typeof properties !== 'object') {
      throw new Error('You have to specify the event name and its properties');
    }

    return widget.sendMessage('track', {
      event_name: name,
      event_properties: properties
    });
  }
});
