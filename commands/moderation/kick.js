const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
	
	let logchannel = client.channels.cache.find(c => c.name === 'ir-logs')

	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			":no_entry_sign: **I don't have permission to kick people!**"
		)
		.setColor("RED");
	if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
		return msg.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	const kickTaged = msg.mentions.users.first();
	let reason = args.slice(1).join(" ");
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`:no_entry_sign: ${msg.author.username}, Missing Permission`
		)
		.setColor("RED");
	if (!msg.member.hasPermission("KICK_MEMBERS"))
		return msg.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	const mmqembed = new Discord.MessageEmbed()
		.setTitle("Command: -kick")
		.setDescription("Usage: -kick @user reason")
		.setColor("RED");
	if (!kickTaged) {
		msg.delete();
		return msg.channel.send(mmqembed).then(m => m.delete({ timeout: 5000 }));
	}

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			":no_entry_sign: Access Denied, **that member has roles higher or equal to you!**"
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			":no_entry_sign: Access Denied, **that member has roles higher or equal to me!**"
		)
		.setColor("RED");
	const botRolePossition = msg.guild.member(client.user).roles.highest.position;
	const rolePosition = msg.guild.member(kickTaged).roles.highest.position;
	const userRolePossition = msg.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

	const notice2 = new Discord.MessageEmbed()
		.setDescription(
			":no_entry_sign: **You cannot kick yourself!**"
		)
		.setColor("RED");
	if (msg.mentions.users.first().id === msg.author.id)
		return msg.channel.send(notice2);

	const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
		.setDescription(
			":no_entry_sign: **An error occurred with banned that member!**"
		)
		.setColor("RED");

	if (!msg.guild.member(kickTaged).kickable) {
		return msg.channel.send(sdfdfsdfsdfdfs);
	}

	if (reason.length < 1) reason = "No reason given.";

	let kickEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setTitle("Action Kick")
		.addField("Target", `**<@${kickTaged.id}> **`)
		.addField("User", `<@${msg.author.id}>`)
		.addField("Reason", `\`\`\`${reason}\`\`\``)
		.setTimestamp();
		logchannel.send(kickEmbed);
		
	const suembed = new Discord.MessageEmbed()
		.setDescription(
			`:white_check_mark: **Kicked ${kickTaged.username}#${kickTaged.discriminator}** | **${reason}**`
		)
		.setColor("GREEN");
	msg.delete();
	msg.channel.send(suembed);
	msg.guild.member(kickTaged).kick(reason);

	kickTaged.send(`You had been kicked in **${msg.guild.name}**, For: ${reason}`);
};

module.exports.help = {
	name: "kick",
	description:
		"This command is used for kicking people u hates or againsting your server rules.",
	usage: "-kick <mentions> <reason>",
	accessableby: "Kick Members",
	aliases: [],
};
