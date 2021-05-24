const settings = require("../../settings.json");
const fs = require("fs");
const Discord = require('discord.js');
const { timeStamp, timeLog } = require("console");
const canvas = require('discord-canvas'),
	welcomeCanvas = new canvas.Welcome(),
	leaveCanvas = new canvas.Goodbye()
const universalColor = '8015EA'
const imageLink = 'https://media.discordapp.net/attachments/796996582406881280/842208339571900476/cave_warrior_hd_minecraft.jpg?width=1202&height=676'
module.exports = async (client, member, roles) => {
	client.settings.ensure(member.guild.id, settings);

	const guild = member

	let channel = member.guild.channels.cache.find(c => c.name === 'log')
	let WELCOME = new Discord.MessageEmbed()
		.setTitle('New User Has Joined!')
		.setDescription(`Welcome To Our Server ${member.user} we are happy to have you! you are member number ${member.guild.memberCount}!`)
		.setColor('BLUE')
		.setThumbnail(client.user.avatarURL)
		.setTimestamp()
		.setFooter('Thanks For Joining!')
	channel.send(WELCOME)
	channel.send(`Welcome ${member}.`)
	console.log(
		'Someone joined!- ${member}. '
	);
};

module.exports = async (client, member, roles) => {
	let image = await welcomeCanvas
		.setUsername(member.user.username)
		.setDiscriminator(member.user.discriminator)
		.setMemberCount(member.guild.memberCount)
		.setGuildName(member.guild.name)
		.setAvatar(member.user.displayAvatarURL({
			format: 'png'
		}))
		.setColor("border", universalColor)
		.setColor("username-box", universalColor)
		.setColor("discriminator-box", universalColor)
		.setColor("message-box", universalColor)
		.setColor("title", universalColor)
		.setColor("avatar", universalColor)
		.setBackground(imageLink)
		.toAttachment()


	let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

	member.guild.channels.cache.find(c => c.name === 'welcome').send(attachment)
	client.settings.ensure(member.guild.id, settings);

	const guild = member

	const memberRoleadd1 = member.guild.roles.cache.find(role => role.name == 'Member')
	member.roles.add(memberRoleadd1)

	const memberRoleadd2 = member.guild.roles.cache.find(role => role.name == 'I HAVE NOT READ THE RULES YET')
	member.roles.add(memberRoleadd2)

	let channel = member.guild.channels.cache.find(c => c.name === 'welcome')
	channel.send(`${member}`)

	let WELCOME = new Discord.MessageEmbed()
		.setTitle('Imperial Realms')
		.setDescription(`**Welcome To Imperial Realms ${member.user}!**
	you are member number **${member.guild.memberCount}**!\n \n
	Be sure to read the <#778625641826353192> and react to become a Member.
	<#772535584513851422>:skull: will give you 100k and a Gravestone that will protect your items upon death.
	Also check out <#821838125193101354> to see what you can do to get free stuff!\n \n
	`)
		.setColor('RANDOM')
		.setThumbnail(member.user.avatarURL)
		.setTimestamp()
		.setFooter('If you have any questions, feel free to ask! Our staff and players are always helpful.')
	channel.send(WELCOME),
		console.log(
			`Someone joined! ${member.user} is the ${member.guild.memberCount} member to join te guild!`

	);
};