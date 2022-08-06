import { readdir, readdirSync } from "fs";
import Jahky from "./Jahky.Client.js";

class Load {
    /**
     *
     * @param {Jahky} client
     */

    static async LoadCommands(client) {
        readdirSync("./src/commands", { encoding: "utf8" })
            .filter((file) => file.endsWith(".js"))
            .forEach(async (files) => {
                const prop = await import(`../commands/${files}`).then(
                    (modules) => modules.default
                );

                client.logger.cmd(`[COMMAND] ${prop.name} loaded!`)

                client.commands.set(prop.name, prop);

                client.commandsData.push(prop.data);
            });
    }

    /**
     *
     * @param {Jahky} client
     */

    static async LoadEvents(client) {
        readdir("./src/events", (err, files) => {
            if (err) console.log(err);
            files.forEach(async (file) => {
                const event = await import(`../events/${file}`).then(
                    (modules) => modules.default
                );
                event(client);
            });
        });
    }
}

export default Load;
