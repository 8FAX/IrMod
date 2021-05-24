const Discord = require('discord.js');


exports.run = async (client, message, args) => {

const user = message.mentions.users.first() || message.member.user

let avatarembed = new Discord.MessageEmbed()
.setTitle(`${user.tag} Avatar`)
.setColor("#11bed3")
.setDescription(`
Link as:
- [png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
- [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
- [webp](${user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })})
`)

.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
message.channel.send(avatarembed)

}


module.exports.help = {
	name: "avatar",
	description: "This command is used for showing your/other member's avatar.",
	usage: "-avatar <mentions>",
	accessableby: "Member",
	aliases: ["pfp"],
};
