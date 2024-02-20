import { Client, GatewayIntentBits } from "discord.js";
import { REST, Routes } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];

    //TODO write logic here for generating short url

    return message.reply({
      content: `Generating short url` + url,
    });
  }
  message.reply({
    content: "I am BOT",
  });
});
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("pong");
});

client.login(process.env.TOKEN);
// ------------------------------------------------------------------------
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
