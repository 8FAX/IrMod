const settings = require("../../settings.json");
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const db = require("quick.db");

const cooldowns = new Discord.Collection();
const Statcord = require("statcord.js");

module.exports = async( client, message ) => {

	if(message.channel.type === 'dm') {
		const channel = client.channels.cache.get('803000745867345921')
		const emb = new Discord.MessageEmbed()
		.setTitle(`New Private Message Sent by ${message.author.tag}!`)
		.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
		.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true})}`)
		.setDescription(`${message.content}`)
		.setColor(`#131313`)
		channel.send(emb)
	  }
	
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	let prefix = '-';
  
	db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
	let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)
  
	let messages;
	if (messagefetch == 25) messages = 25; //Level 1
	else if (messagefetch == 65) messages = 65; // Level 2
	else if (messagefetch == 115) messages = 115; // Level 3
	else if (messagefetch == 200) messages = 200; // Level 4
	else if (messagefetch == 300) messages = 300; // Level 5
	else if (messagefetch == 400) messages = 400; // Level 6
	else if (messagefetch == 600) messages = 600; // Level 7
	else if (messagefetch == 700) messages = 700; // Level 8
	else if (messagefetch == 900) messages = 900; // Level 9
	else if (messagefetch == 1000) messages = 1000; // Level 10
	else if (messagefetch == 1100) messages = 1100; // Level 11
	else if (messagefetch == 1200) messages = 1200; // Level 12
	else if (messagefetch == 1400) messages = 1400; // Level 13
  
	if (!isNaN(messages)) {
	  db.add(`level_${message.guild.id}_${message.author.id}`, 1)
	  let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
	  
	  let levelembed = new Discord.MessageEmbed()
	.setDescription(`${message.author}, You have leveled up to level ${levelfetch}`)
	 message.channel.send(levelembed)
	}



	//const { guild, author, member } = message;

	// getting our wanted suggestion channel by id
	//const suggestionChannel = guild.channels.cache.get('740999315572523068');

	// fetching all the channels messages
//	suggestionChannel.messages.fetch().then(suggestion => {

		// if the newest message is not by the bot
//		if (suggestion.first().author.id !== client.user.id && author.id !== client.user.id) {

			// delete our message
//			message.delete();

//			suggestionChannel.send(
//				new MessageEmbed()

//					.setColor('BLUE')
//					.setTitle(`New Suggestion By: ${member.displayName}`, author.displayAvatarURL({ dynamic: true, format: 'png' }))
//					.setDescription(`${suggestion.first().content} \n \n \n`)
//					.setFooter('Want to suggest something? \nSimply type it in this channel!')
//			).then(message => {
//				message.react('👍');
//				message.react('👎');
//			})
//			return
			// else we return nothing for the bot to spam
//		} else {
//			return
//		}
//	});



	if (message.author.bot) return;
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	if (!client.settings.get(message.guild.id, "prefix")) {
		client.settings.set(message.guild.id, {
			prefix: settings.prefix,
		});
	}

	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		message.channel.send(`Hi, my prefix: \`${prefixesdatabase.prefix}\``);
	}

	if (!message.content.startsWith(prefixesdatabase.prefix)) return;
	const command = message.content
		.split(" ")[0]
		.slice(prefixesdatabase.prefix.length);
	const args = message.content.split(" ").slice(1);
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 2000;
			return message.reply(
				`Before using **${prefixesdatabase.prefix
				}${command}**, please wait for **${timeLeft.toFixed(
					1
				)} second for cooldowns!**`
			);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	}
	try {
		cmd.run(client, message, args);
	} catch (e) {
		return console.log(`Invalid command: ${command}`);
	} finally {
		console.log(
			`${message.author.username} using command ${prefixesdatabase.prefix}${command}`
		);
	}
}