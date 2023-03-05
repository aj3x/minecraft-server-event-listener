process.stdin.resume();//so the program will not close instantly
import {Tail} from 'tail';

import {logMessageToEvent, createLogMessage, isPlayerListItemEvent, logEventToPlayerEvent} from './utils';
import Notifly from './notify';
import environment from './environment';

const tail = new Tail(environment.logfile);

const servername = environment.server_name;
let listing = 0;
let listArr:string[] | null = null;
tail.on("line", function(data:any) {
  const logMessage = createLogMessage(data);
  if (!logMessage) return;
  let event = logMessageToEvent(logMessage);
  if (listing && isPlayerListItemEvent(logMessage)) {
    event = logEventToPlayerEvent(logMessage);
  }
  if (event) {
    switch (event.eventName) {
      case "playerJoined":
        Notifly.player(servername, event);
        // Notifly.push(`${event.playerName} joined ${servername}`);
        break;
      case "playerLeft":
        Notifly.player(servername, event);
        // Notifly.push(`${event.playerName} left ${servername}`);
        break;
      case "serverStarting":
        Notifly.push(`${servername} is starting back up`);
        break;
      case "serverStarted":
        Notifly.push(`${servername} is back online! (づ ◕‿◕ )づ`);
        break;
      case "serverStopping":
        Notifly.push(`${servername} is shutting down ( •_•)>`);
        break;
      case "playerList":
        if (Number(event.playerCount) == 0) {
          Notifly.push(`No one is on ${servername} right now 😭`)
        } else if (listArr === null) {
          listArr = [];
          listing = Number(event.playerCount);
        }
        break;
      case "playerListItem":
        if (listArr !== null && !listArr.includes(event.playerName)) {
          listArr.push(event.playerName);
          listing--;
          if (listing === 0) {
            Notifly.push(`There are ${listArr.length} users on ${servername}: ${listArr.join(", ")}`)
            listArr = null;
          }
        }
        break;
    }
  }
});
tail.on("error", function(error:any) {
  console.error('ERROR: ', error);
});

// Handle shutdowns
process.on("SIGINT", () => Notifly.shutdown());
process.on("SIGTERM", () => Notifly.shutdown());
process.on("beforeExit", () => Notifly.shutdown());
process.on("exit", () => Notifly.shutdown());
