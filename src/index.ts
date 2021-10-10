import { NativeEventEmitter, NativeModules } from "react-native";

const NativeModule: Readonly<{
  initialTimeZone: string;
  getTimeZone: () => Promise<string>;
}> = NativeModules.RNModuleTemplate;

export const initialTimeZone = NativeModule.initialTimeZone;

export function getTimeZone(): Promise<string> {
  return NativeModule.getTimeZone();
}

type EventHandler = (body: { date: string; value: string }) => void;

const emitter = new NativeEventEmitter(NativeModules.RNModuleTemplate);
const handlers = new Set<EventHandler>();

emitter.addListener("timeZoneChange", (data) => {
  handlers.forEach((handler) => handler(data));
});

export function addListener(
  type: "timeZoneChange",
  handler: EventHandler,
): () => void {
  handlers.add(handler);

  return () => {
    handlers.delete(handler);
  };
}
