import {
  SEVTECH_LOG_MESSAGE_REGEX as LOG_MESSAGE_REGEX,
  SEVTECH_LOGGED_EVENT_PATTERNS as LOGGED_EVENT_PATTERNS,
  LogMessage,
  LogEvent,
  NonLogEvent,
  PlayerListItemLogEvent,
} from "./constants";

export function createLogMessage(raw:string){
  const result = LOG_MESSAGE_REGEX.captures(raw);
  return result;
}
type LOGGED_EVENT_KEY = keyof typeof LOGGED_EVENT_PATTERNS;
export function logMessageToEvent(logMessage?:LogMessage):LogEvent|undefined {
  if (!logMessage) {
    return undefined;
  }
  for (const eventName in LOGGED_EVENT_PATTERNS) {
    const pattern = LOGGED_EVENT_PATTERNS[eventName as LOGGED_EVENT_KEY];

    if (logMessage.level === "INFO" &&
      pattern.isMatch(logMessage.message)) {
      const result = pattern.captures(logMessage.message);
      const eventData = Object.assign(result||{}, { eventName });
      return Object.assign(logMessage, eventData) as LogEvent;
    }
  }
  return logMessage as NonLogEvent;
}

export function isPlayerListItemEvent(log:LogMessage) {
  return log.thread === 'Server thread' &&
    log.level === 'INFO' &&
    log.sender === 'net.minecraft.server.dedicated.DedicatedServer' &&
    /^([a-zA-Z0-9_]{2,16})$/.test(log.message);
}
export function logEventToPlayerEvent(log:LogMessage): PlayerListItemLogEvent {
  return {...log, eventName: "playerListItem", playerName: log.message};
}

