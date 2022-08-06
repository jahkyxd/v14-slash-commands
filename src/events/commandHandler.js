import Jahky from "../Base/Jahky.Client.js";
import { EmbedBuilder, InteractionType } from "discord.js";
import AutoComplete from "../Utils/autoComplete.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.type === InteractionType.ApplicationCommandAutocomplete)
            AutoComplete(client, interaction);
        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            if (
                command.permissions === 1 &&
                client.config.bot.owners.some(
                    (users) => users !== interaction.user.id
                )
            )
                return client.error(client.errorsCodes.noYT, interaction);
            if (
                command.permissions === 2 &&
                !interaction.memberPermissions.has("Administrator")
            )
                return client.error(client.errorsCodes.noYT, interaction);

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: interaction.member.displayName,
                    iconURL: interaction.member.displayAvatarURL(),
                })
                .setColor(interaction.member.displayHexColor)
                .setFooter({
                    text: client.user.username,
                    iconURL: client.user.avatarURL({ size: 2048 }),
                });

            try {
                command.execute(client, interaction, embed, interaction.guild);
            } catch (err) {
                client.error("Beklenmeyen bir hata oluştu!", interaction);
                console.log(err);
            }
        }
    });
};
