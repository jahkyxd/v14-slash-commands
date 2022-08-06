import Jahky from "../Base/Jahky.Client.js";
import pkg from "discord.js";
const {
    Guild,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    InteractionType,
} = pkg;

export default {
    name: "help",
    permissions: 0,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("yardım komutu")
        .addStringOption((command) =>
            command
                .setName("komut_ismi")
                .setDescription("Yardım menüsünü görüntileyeciğiniz komut ismi")
                .setRequired(true)
                .setAutocomplete(true)
        ),
    enabled: true,
    help: "/help [komut ismi]",
    /**
     * @param {Jahky} client
     * @param {CommandInteraction} interaction
     * @param {EmbedBuilder} embed
     * @param {Guild} guild
     */

    async execute(client, interaction, embed, guild) {
        if (interaction.type !== InteractionType.ApplicationCommand) return;

        const commandName = interaction.options.getString("komut_ismi");

        const command = client.commands.get(commandName);

        if (!command)
            return client.error("Böyle bir komut bulunmuyor!", interaction);

        let perm;

        if (command.permisions === 0) perm = "Global";
        if (command.permissions === 1) perm = "Yönetici";
        if (command.permissions === 2) perm = "Üyeleri Yasakla";

        interaction.reply({
            content: `**${command.name}** isimli komutun yardım bilgisi;
**Komut ismi:** \`${command.data.name}\`,
**Komut açıklaması:** \`${command.data.description}\`,
**Komut kullanımı:** \`${
                command.help
                    ? command.help
                    : "Bu komutun kullanımı hakkında bilgi verilmemiş"
            }\`,
**komut kullanmaya hazır mı?:** \`${command.enabled ? "Evet" : "Hayır"}\``,
        });
    },
};
