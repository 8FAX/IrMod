const { MessageEmbed } = require('discord.js');

module.exports = async( client, message, messages) => {

	const { guild, author, member } = message;

	// getting our wanted suggestion channel by id
	const suggestionChannel = guild.channels.cache.get('740999315572523068');

	// fetching all the channels messages
	suggestionChannel.messages.fetch().then(suggestion => {

		// if the newest message is not by the bot
		if (suggestion.first().author.id !== client.user.id && author.id !== client.user.id) {

			// delete our message
			message.delete();

			suggestionChannel.send(
				new MessageEmbed()

					.setColor('BLUE')
					.setTitle(`New Suggestion By: ${member.displayName}`, author.displayAvatarURL({ dynamic: true, format: 'png' }))
					.setDescription(`${suggestion.first().content} \n \n \n`)
					.setFooter('Want to suggest something? \nSimply type it in this channel!')
			).then(message => {
				message.react('👍');
				message.react('👎');
			})
			return
			// else we return nothing for the bot to spam
		} else {
			return
		}
	});
}

