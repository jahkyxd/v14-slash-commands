import Jahky from "../Base/Jahky.Client.js";
import {
    Guild,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    InteractionType,
} from "discord.js";
import util from "util";

export default {
    name: "eval",
    permissions: "1",
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Kod denemenize yarar")
        .addStringOption((command) =>
            command
                .setName("kod")
                .setDescription("Denilenecek olan kod")
                .setRequired(true)
        ),
        enabled: true,
        help: "/eval [kod]",
    /**
     * @param {Jahky} client
     * @param {CommandInteraction} interaction
     * @param {EmbedBuilder} embed
     * @param {Guild} guild
     */

     async execute(client, interaction, embed, guild) {
        if (interaction.type !== InteractionType.ApplicationCommand) return;

        const code = interaction.options.getString("kod")

        try {
            var result = clean(await eval(code));
            if (result.includes(client.token))
                return interaction.reply({
                    content:
                        "Al sana token: ``Njk2MTY4Nz8SDIFDU4OTA1MDk4.b4nug3rc3k.bir.t0k3ns4n4cak.kadarsalagim``",
                });
            interaction.reply({
                content: `\`\`\`js
    ${result}
            \`\`\``,
            });
        } catch (err) {
            interaction.reply({
                content: `\`\`\`js
    ${err}
            \`\`\``,
            });
        }
    },
};

function clean(text) {
    if (typeof text !== "string") text = util.inspect(text, { depth: 0 });
    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
}
