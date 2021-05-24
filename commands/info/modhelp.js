const Discord = require("discord.js");

module.exports = {
	async run (client, message, args) { 
		const memeEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`store.imperialrealms.net`)
		.addField("Info", "Once you have bought something that is account specific you may not transfer it to another account. Your package can take up to 15 minutes to be delivered if it takes any longer contact staff immediately!" )
		.addField("Terms of Service", "By purchasing intangible items from Imperial Realms you agree to a no refund policy.  Imperial Realms is not required to give a refund after the items are purchased. Purchases are purchases. Ranks and other items are just perks for purchasing. All virtual items purchased have no real-world value. We reserve the right to transform or change any rank or any other item. The ranks benefits can change at any time without prior notice. By accepting this document you agree to waive your right to take any action against the server, staff, members, or website. These terms and conditions take effect indefinitely and immediately after the agreement is accepted by using any of our provided services, which can include but is not limited to, the Imperial Realms Minecraft server, any of the Imperial Realms websites/forums or the Imperial Realms discord." )
		.addField("Hacking/Rule Breaking", "Hacking or breaking the rules will still result in a ban and we are not required to give you a refund. We reserve the right to make you leave the server permanently or otherwise without a refund." )
		.setURL(`https://store.imperialrealms.net/`)
		.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
		message.channel.send(memeEmbed);
	}
  }


module.exports.help = {
	name: "modhelp",
	description:
		"lists mod commands",
	usage: "-modhelp",
	accessableby: "Everyone",
	aliases: ["mhelp"],
};
