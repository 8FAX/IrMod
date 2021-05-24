const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = (client, msg, message, bot, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "anal" })
			.end((err, response, body) => {
				let emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("Anal here");
				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("This isn't NSFW channel!");
	}
};

module.exports.help = {
	name: "anal",
	description:
		"This command is used for calling NSFW images API to send them, but NSFW channel needed.",
	usage: "d!anal",
	accessablechannel: "NSFW Channel",
	accessableby: "NSFW/Member",
	aliases: [],
};
