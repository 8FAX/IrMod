const Discord = require("discord.js");

module.exports = {
	async run (client, message, args) { 
		const memeEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`Rules for Discord, Ingame, and the Forums`)
		.addField("Discord", "Click [HERE](https://discord.com/channels/724373701897879555/778625641826353192/782813102868529182) for a link to the Discord rules." )
		.addField("Ingame", "Click [HERE](https://discord.com/channels/724373701897879555/773761463717855252/804767689213083718) for a link to the Ingame rules." )
        .addField("Allowed Mods", "Click [HERE](http://imperialrealms.net/forums/wiki/mods/) for a link to the Allowed Mods." )
        .addField("Forums", "Click [HERE](http://imperialrealms.net/forums/threads/forum-rules.3/) for a link to the Forums rules." )
		.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
		message.channel.send(memeEmbed);
	}
  }


module.exports.help = {
	name: "rules",
	description:
		"Gives a link to the ingame, forums and discord rules!",
	usage: "-rules",
	accessableby: "Everyone",
	aliases: ["ingamerules", "guidelines", "discordrules"],
};
