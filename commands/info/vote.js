const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	msg.delete();
	msg.channel.send(
		"Please vote here every 24 hours > http://imperialrealms.net/forums/pages/vote/"
	);
};

module.exports.help = {
	name: "vote",
	description:
		"Vote us with http://imperialrealms.net/forums/pages/vote/ every 24 hours",
	usage: "-vote",
	accessableby: "Everyone",
	aliases: [],
};
