// imports
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// populate the collection of comands with key value pairs - the key is the command name, the value is the exported module
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


// when the client is ready, run this code
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	// if there is no prefix or the bot is sending the message, return early
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// remove the prefix from the start of the sentence, remove excess whitespace, and seperate based on spaces (regex)
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// if the command doesn't exist, return early
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	// try catch to execute the command
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

// bot token is in plaintext here, ONLY FOR TESTING BEFORE COMMITTING TO GIT
client.login(token);