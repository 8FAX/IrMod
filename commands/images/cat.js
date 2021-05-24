const request = require("request");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	request("http://edgecats.net/random", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let emb = new Discord.MessageEmbed()
				.setImage(body)
				.setColor("#00ff00")
				.setTitle("🐱 Meow! 🐱")
				.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));

			message.channel.send(emb);
		}
	});
};

module.exports.help = {
	name: "cat",
	description: "This command is used for posting cat's images randomly.",
	usage: "-cat",
	accessableby: "Members",
	aliases: [],
};
