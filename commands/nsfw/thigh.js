const discord = require("discord.js");
const superagent = require("superagent");

exports.run = (client, msg, message, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "thigh" })
			.end((err, response, body) => {
				let emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("Thigh here");

				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("This isn't NSFW channel!");
	}
};

module.exports.help = {
	name: "thigh",
	description: "This command is used for generating thigh image.",
	usage: "d!thigh",
	accessableby: "NSFW/Member",
	aliases: [],
};
