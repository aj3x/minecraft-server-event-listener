import Discord from "discord.js";
import { PlayerJoinedLogEvent, PlayerLeftLogEvent } from "./constants";
import environment from "./environment";
const client = new Discord.WebhookClient({
    url: environment.discordWebhookUrl
});

// client.addListener("")

export default class Notifly {
    static userstates:Record<string,Discord.APIMessage|undefined> = {};
    static async player(servername: string, event:PlayerJoinedLogEvent|PlayerLeftLogEvent) {
        // delete previous player message
        const lastPlayerMsg = this.userstates[event.playerName]
        if (environment.deleteLastPlayerMessagesOn.new && lastPlayerMsg)
          client.deleteMessage(lastPlayerMsg);
        
        const action = event.eventName === "playerJoined" ? "joined" : "left";
        const message = await this.push(`${event.playerName} ${action} ${servername}`)
        this.userstates[event.playerName] = message;
    }
    static push(message:string) {
        console.log("event", message);
        return client.send({
            username: environment.botname,
            content: message,
            avatarURL: environment.botAvatarUrl,
        });
    }

    static shutdown = async () => {
        if (environment.deleteLastPlayerMessagesOn.close) {
            process.exit(0);
        }
        // delete all messages
        const messages = Object.entries(this.userstates);
        for (let [key, message] of messages) {
            if (message) await client.deleteMessage(message);
            delete this.userstates[key];
        }
        process.exit(0);
    }
}
