import Jahky from "../Base/Jahky.Client.js";
import createCommands from "../Utils/createCommands.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("ready", async () => {

        client.user.setPresence({
            activities: [{ name: "Made With Jahky." }],
            status: "idle",
        });

        createCommands(client);
    });
};
