const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	try {
		let member = message.mentions.members.first();

		require("request")(
			{ url: "https://nekos.life/api/pat", json: true },
			(req, res, json) => {
				if (member) {
					let embed = new Discord.MessageEmbed()
						.setTitle(message.author.username + " pats " + member.user.username)
						.setColor("#363942")
						.setDescription(
							message.author.username + " patted " + member.user.username + "!"
						)
						.setImage(json.url)
						.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));

					message.channel.send(embed);
				} else message.reply("You need to mention the user to pat!");
			}
		);
	} catch (err) {
		message.channel.send("There was an error!\n" + err).catch();
	}
};

module.exports.help = {
	name: "pat",
	description: "This command is used for generating pat.",
	usage: "-pat <mentions>",
	accessableby: "Members",
	aliases: [],
};
