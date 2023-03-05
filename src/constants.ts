import {TypedRegEx} from "typed-regex"
export type LogMessage = {
  timestamp: string;
  thread: string;
  level: string;
  sender: string;
  message: string;
}
export interface BasicLogEvent extends LogMessage {
  eventName?: string;
}
export interface NonLogEvent extends BasicLogEvent {
  eventName: undefined;
}
export interface PlayerJoinedLogEvent extends BasicLogEvent {
  eventName: "playerJoined";
  playerName: string;
}
export interface PlayerLeftLogEvent extends BasicLogEvent{
  eventName: "playerLeft";
  playerName: string;
}
export interface ChatMessageLogEvent extends BasicLogEvent {
  eventName: "chatMessage";
  playerName: string;
  messageContent: string;
}
export interface ActionMessageLogEvent extends BasicLogEvent {
  eventName: "actionMessage";
  playerName: string;
  messageContent: string;
}
export interface ServerStartingLogEvent extends BasicLogEvent {
  eventName: "serverStarting";
  version: string;
}
export interface ServerStartedLogEvent extends BasicLogEvent {
  eventName: "serverStarted";
  startupTime: string;
}
export interface ServerStoppingLogEvent extends BasicLogEvent {
  eventName: "serverStopping";
}
export interface ServerStoppedLogEvent extends BasicLogEvent {
  eventName: "serverStopped";
}
export interface BackupStartedLogEvent extends BasicLogEvent {
  eventName: "backupStarted";
}
export interface AnvilSavedLogEvent extends BasicLogEvent {
  eventName: "anvilSaved";
  dimension: string;
}
export interface BackupStoppedLogEvent extends BasicLogEvent {
  eventName: "backupStopped";
  dimension: string;
}
export interface PreparingSpawnLogEvent extends BasicLogEvent {
  eventName: "preparingSpawn";
  progress: string;
}
export interface PlayerAchievementLogEvent extends BasicLogEvent {
  eventName: "playerAchievement";
  playerName: string;
  advancement: string;
}
export interface PlayerListLogEvent extends BasicLogEvent {
  eventName: "playerList";
  playerCount: string;
  playerMax: string;
}
export interface PlayerListItemLogEvent extends BasicLogEvent {
  eventName: "playerListItem";
  playerName: string;
}

export type LogEvent = NonLogEvent|PlayerJoinedLogEvent|PlayerLeftLogEvent|ActionMessageLogEvent|ServerStartingLogEvent|ServerStartedLogEvent|AnvilSavedLogEvent|PreparingSpawnLogEvent|PlayerAchievementLogEvent|PlayerListLogEvent|PlayerListItemLogEvent|ServerStoppingLogEvent|ServerStoppedLogEvent|BackupStartedLogEvent;
export const DEFAULT_LOG_MESSAGE_REGEX = TypedRegEx('^\\[(?<hh>\\d{2}):(?<mm>\\d{2}):(?<ss>\\d{2})\\] \\[(?<thread>[\\w|\\s]+)/(?<level>\\w+)\\]:\\s{1}(?<message>[\\w|\\s|\\W|\\d\\.]*)', 'g');
export const SEVTECH_LOG_MESSAGE_REGEX = TypedRegEx('^\\[(?<timestamp>\\d{2}:\\d{2}:\\d{2})\\] \\[(?<thread>[\\w|\\s]+)/(?<level>\\w+)\\] \\[(?<sender>[\\w|\\W]+)\\]:\\s{1}(?<message>[\\w|\\s|\\W|\\d\\.]*)', 'g');


export const DEFAULT_LOGGED_EVENT_PATTERNS = {
  playerJoined: TypedRegEx('^(?<playerName>[\\w|\\W\\_]*) joined the game', 'g'),
  playerLeft: TypedRegEx('^(?<playerName>[\\w|\\W|\\_]*) left the game', 'g'),
  chatMessage: TypedRegEx('^<(?<playerName>[\\w|\\W]*)> (?<messageContent>[\\w|\\W|\\_|\\d||\\s]*)', 'g'),
  serverStarting: TypedRegEx('Starting minecraft server version (?<version>[\\.|\\d]*)', 'g'),
  serverStarted: TypedRegEx('Time elapsed: (?<startupTime>[\\d]*) ms/m', 'g'),
  serverStopping: TypedRegEx('Stopping server', 'g'),
  serverStopped: TypedRegEx('Stopped the server', 'g'),
  backupStarted: TypedRegEx('Starting Backup. The server may lag for a bit!', 'g'),
  anvilSaved: TypedRegEx('ThreadedAnvilChunkStorage \\((?<dimension>[\\w|\\W|\\:|]*)\\): All chunks are saved', 'g'),
  backupStopped: TypedRegEx('Server Backup done!', 'g'),
  preparingSpawn: TypedRegEx('Preparing spawn area: (?<progress>[\\d]*)%', 'g'),
  playerAchievement: TypedRegEx('^(?<playerName>[\\w|\\W]*) has made the advancement \\[(?<advancement>[\\w|\\W|_]*)\\]', 'g'),
};

export const SEVTECH_LOGGED_EVENT_PATTERNS = {
  playerJoined: TypedRegEx('^(?<playerName>[\\w|\\W\\_]*) joined the game', 'g'),
  playerLeft: TypedRegEx('^(?<playerName>[\\w|\\W|\\_]*) left the game', 'g'),
  chatMessage: TypedRegEx('^<(?<playerName>[\\w|\\W]*)> (?<messageContent>[\\w|\\W|\\_|\\d||\\s]*)', 'g'),
  actionMessage: TypedRegEx('^\\* (?<playerName>[\\w|\\W]*) (?<messageContent>[\\w|\\W|\\_|\\d||\\s]*)'),
  serverStarting: TypedRegEx('Starting minecraft server version (?<version>[\\.|\\d]*)', 'g'),
  serverStarted: TypedRegEx('Done \\((?<startupTime>[\\w|\\W]*)\\)!', 'g'),
  serverStopping: TypedRegEx('Stopping server', 'g'),
  serverStopped: TypedRegEx('Stopped the server', 'g'),
  backupStarted: TypedRegEx('Starting Backup. The server may lag for a bit!', 'g'),
  anvilSaved: TypedRegEx('ThreadedAnvilChunkStorage \\((?<dimension>[\\w|\\W|\\:|]*)\\): All chunks are saved', 'g'),
  backupStopped: TypedRegEx('Server Backup done!', 'g'),
  preparingSpawn: TypedRegEx('Preparing spawn area: (?<progress>[\\d]*)%', 'g'),
  playerAchievement: TypedRegEx('^(?<playerName>[\\w|\\W]*) has made the advancement \\[(?<advancement>[\\w|\\W|_]*)\\]', 'g'),
  playerList: TypedRegEx('^There are (?<playerCount>[\\d]+)/(?<playerMax>[\\d]+) players online:'),
};