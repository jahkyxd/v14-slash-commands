import Jahky from "../Base/Jahky.Client.js";
import { CommandInteraction, InteractionType } from "discord.js";

/**
 * @param {Jahky} client
 * @param {CommandInteraction} interaction
 */

export default async (client, interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommandAutocomplete)
        return;
    if (interaction.commandName === "help") {
        const value = interaction.options.getFocused();

        const choices = Array.from(client.commands.keys());

        const filtered = choices.filter((choice) => choice.startsWith(value));

        const result = filtered.map((choice) => ({
            name: choice,
            value: choice,
        }));

        interaction.respond(result);
    }

};
