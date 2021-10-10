import { NativeEventEmitter, NativeModules } from "react-native";

const NativeModule: Readonly<{
  initialTimeZone: string;
  getTimeZone: () => Promise<string>;
}> = NativeModules.RNModuleTemplate;

export const initialTimeZone = NativeModule.initialTimeZone;

export function getTimeZone(): Promise<string> {
  return NativeModule.getTimeZone();
}

const emitter = new NativeEventEmitter(NativeModules.RNModuleTemplate);

type Listeners = {
  timeZoneChange: (body: { date: string; value: string }) => void;
};

export function addListener<Type extends keyof Listeners>(
  type: Type,
  listener: Listeners[Type],
): () => void {
  const subscription = emitter.addListener(type, listener);
  return subscription.remove;
}
