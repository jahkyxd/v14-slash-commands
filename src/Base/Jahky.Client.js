import {
    Client,
    GatewayIntentBits,
    Collection,
    CommandInteraction,
    WebhookClient,
} from "discord.js";
import logger from "./logger.js";
import config from "../../config.js";
import db from "./Database/index.js";
import errors from "../Utils/Error.Codes.js";

class Jahky extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMembers,
            ],
        });
        this.commands = new Collection();
        this.config = global.config = config;
        global.system = this;
        this.logger = logger;
        this.db = global.db = db;
        this.commandsData = [];
        this.errorsCodes = errors;
    }

    /**
     *
     * @param {String} content
     * @param {CommandInteraction} interaction
     */

    async error(content, interaction) {
        interaction.reply({ content: content, ephemeral: true });
    }

    async WebhookSend(token, id, content) {
        const webhook = new WebhookClient({ token, id });

        webhook.send({ content });
    }
}

export default Jahky;
