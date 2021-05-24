const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	fetch(`http://ip-api.com/json/?fields=countryCode,regionName,timezone`)
		.then(response => response.json())
		.then(data => {
			let serverlocation = data.regionName.toLocaleString();
			let servercountry = data.countryCode.toLocaleString();

			const bbb = new Discord.MessageEmbed().setDescription(
				`:desktop: Server Location: **${servercountry}-${serverlocation}**\n\nMessage Latency: **${
					Date.now() - message.createdTimestamp
				}ms**.\nAPI Latency: **${Math.round(
					client.ws.ping
				)}ms**\n\nCheck bot status [here](Not set up yet!)`
			);
			message.channel.send(bbb);
		});
};

module.exports.help = {
	name: "ping",
	description: "This command is used for pinging the bot.",
	usage: "-ping",
	accessableby: "Members",
	aliases: [],
};
