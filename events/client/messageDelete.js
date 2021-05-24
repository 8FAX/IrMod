
const settings = require("../../settings.json");
const { RichEmbed, Util } = require('discord.js');
const Discord = require('discord.js')

module.exports = async (client, message, member ) => {

	let test = member

	let channel = client.channels.cache.find(c => c.name === 'ir-logs')

	if (message.author.bot) return;
	if (!message.content) return;
	const regex = /<@!?(1|\d{17,19})>/;
	if (message.content.match(regex)) {
		const embed = new Discord.MessageEmbed()
			.setColor('RED')
			.setAuthor('GHOST PING')
			.setDescription(`Well well well, **${message.author}** decided to ghost-ping a user..`)
			.addField('User', `${message.author}`)
			.addField('channel', `${message.channel}`)
			.addField('Their Message', `${Util.escapeMarkdown(message.content)}`)
			.setThumbnail(message.author.avatarURL({ dynamic: true }))
			.setTimestamp()
		return channel.send( embed);
	};




	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
	});
};
