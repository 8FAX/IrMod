const Discord = require("discord.js");
const request = require("request");

module.exports = {
	async run (client, message, args) { 
		message.delete();
		const memeEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`100$ store Credit for /BUY!`)
		.setURL(`https://youtu.be/dQw4w9WgXcQ?t=1`)
  
		message.channel.send(memeEmbed);
	}
  }


module.exports.help = {
	name: "rickroll",
	description:
		"Gives a link to the store!",
	usage: "-rickroll",
	accessableby: "Everyone",
	aliases: ["rick", "troll"],
};
