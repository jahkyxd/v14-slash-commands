import Jahky from "../Base/Jahky.Client.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import config from "../../config.js";

/**
 * @param {Jahky} client
 */

export default async (client) => {
    const rest = new REST({ version: "10" }).setToken(config.bot.token);

    try {
        rest.put(Routes.applicationCommands(client.user.id), {
            body: client.commandsData,
        });

        console.log(`A total of ${client.commands.size} (/) commands were loaded.`);
    } catch (error) {
        client.logger.error(error)
    }
};
