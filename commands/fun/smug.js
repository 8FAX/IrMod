const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	const { body } = await superagent.get("https://nekos.life/api/v2/img/smug");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setImage(body.url)
		.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
	message.channel.send({ embed });
};

module.exports.help = {
	name: "smug",
	description: "This command is used for generating smug.",
	usage: "-smug",
	accessableby: "Member",
	aliases: [],
};
