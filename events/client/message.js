const settings = require("../../settings.json");
const { RichEmbed, Util } = require('discord.js');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const db = require("quick.db");
const Ircolor = 'ff8858'
const cooldowns = new Discord.Collection();
const Statcord = require("statcord.js");

module.exports = async (client, message, guild) => {

	let logchannel = client.channels.cache.find(c => c.name === 'ir-logs')

	if (message.channel.type === 'dm') {

   if (message.author.bot) return;

	//	const repodm = new Discord.MessageEmbed()
	//		.setDescription(`Hi ${message.author} This is a nice test? what do you thing?`)
	//	message.channel.send(repodm)
	//	const channel = client.channels.cache.get('803000745867345921')
	//	const emb = new Discord.MessageEmbed()
	//		.setTitle(`New Private Message Sent by ${message.author.tag}!`)
	//		.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
	//		.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
	//		.setDescription(`${message.content}`)
	//		.setColor("Green")
	//	channel.send(emb)
	}
	if (message.channel.type === 'dm') return;
	if (message.author.bot) return;

		const randomNumber = Math.floor(Math.random() * 10) + 15 
		db.add(`xp_${message.guild.id}_${message.author.id}`, randomNumber)
		db.add(`xptotal_${message.guild.id}_${message.author.id}`, randomNumber)
		// console.log(`Gave ${randomNumber} xp to ${message.author}`)
		var level = db.get(`level_${message.guild.id}_${message.author.id}`) || 1
		var xp = db.get(`xp_${message.guild.id}_${message.author.id}`)
		var xpNeeded = level * 500
		if (xpNeeded < xp) {
			var newLevel = db.add(`level_${message.guild.id}_${message.author.id}`, 1)
			db.subtract(`xp_${message.guild.id}_${message.author.id}`, xpNeeded)
			const levelemb = new Discord.MessageEmbed()
				.setTitle(':tada: Level Up! :tada:')
				.setDescription(`**${message.author}** has Reached Level **${newLevel}**`)
				.setFooter('\nKeep chatting for more xp!\nDo -level to check out your progress!')
				.setColor(Ircolor)


			message.reply(levelemb)
		}
	


		var msgo = message.content.toLowerCase();
		if (msgo.includes('nigga')) {
			message.delete()
			message.channel.send(`**:no_entry_sign: Shush.. Stop saying that Or you will get a chance to visit banland. :no_entry_sign:**`).then(msg => msg.delete({ timeout: 10000 }));
			message.author.send('**Stop saying that word please..**')
		}

			var msg = message.content.toLowerCase();
			if (msg.includes('discord.gg/')) {

				message.delete()
				message.reply('**:no_entry_sign:  Stop Advertising. I have reported this to a staff. :no_entry_sign: **').then(msg => msg.delete({ timeout: 10000 }))
				
				const addem = new Discord.MessageEmbed()
				.setColor('RED')
				.setAuthor('Advertising')
				.setDescription(`Well well well, **${message.author}** decided to Advertising...`)
				.addField('User', `${message.author}`)
				.addField('channel', `${message.channel}`)
				.addField('Their Message', `${Util.escapeMarkdown(message.content)}`)
				.setThumbnail(message.author.avatarURL({ dynamic: true }))
				.setTimestamp()
				logchannel.send(addem);
				message.author.send('**:no_entry_sign:  Stop Advertising. I have reported this to a staff. :no_entry_sign: **')
				message.author.send(addem)
			}

		let afk = new db.table("AFKs"),
			authorStatus = await afk.fetch(message.author.id, message.guild.id)
		let mentioned = message.mentions.members.first()

		if (mentioned) {
			let status = await afk.fetch(mentioned.id, message.guild.id)
			if (status) {
				const embed = new Discord.MessageEmbed()
					.setColor("ff8858")
					.setDescription(`<@${mentioned.user.id}> is in AFK, Reason: **${status}**`)
				message.channel.send(embed).then(i => i.delete({ timeout: 10000 }))
			}
		}

		if (authorStatus) {
			const embedo = new Discord.MessageEmbed()
				.setColor("ff8858")
				.setDescription(`**${message.author}** is no longer AFK`)
			message.channel.send(embedo).then(i => i.delete({ timeout: 10000 }))
			afk.delete(message.author.id, message.guild.id)
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
