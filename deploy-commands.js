const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId,guildId2, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('도움말').setDescription('도움말 알려줌'),

	new SlashCommandBuilder().setName('노래').setDescription('유튜브에서 노래를 찾고 재생하는 기능을 실행시키는 명령어')
	.addStringOption(option => option.setName("옵션").setDescription("서브 명령어").setRequired(true))]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	rest.put(Routes.applicationGuildCommands(clientId, guildId2), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	rest.put(Routes.applicationCommands(clientId),{ body: commands },)
		.then(() => console.log('Successfully registered Global application commands.'))
		.catch(console.error);
