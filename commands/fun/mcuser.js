const Discord = require('discord.js');
const mcapi = require('mcapi');


module.exports.run = async (client, message, args) => {

    let embed1 = new Discord.MessageEmbed()
    .setTitle('Error')
    .setDescription(`:no_entry_sign: **Required Arguments** \n \`\`\`-mcuser <username> \`\`\``)
    .setColor('RED')

    if(!args[0]) return message.channel.send(embed1)

    try{
        let uuid = await mcapi.usernameToUUID(`${args.join(" ")}`)
        let embed = new Discord.MessageEmbed()
        .setTitle(`User: ${args.join(" ")}`)
        .addField("Name:", `${args.join(" ")}`)
        .addField("UUID:", uuid)
        .addField("Download:", `[Download](https://minotar.net/download/${args.join(" ")})`)
        .addField("NameMC:", `[Click Here](https://mine.ly/${args.join(" ")})`)
        .setImage(`https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${args.join(" ")}/700`)
        .setColor('RANDOM')
        .setThumbnail(`https://minotar.net/cube/${args.join(" ")}/100.png)`)
        .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send(embed);
    } catch(e) {
        let embed2 = new Discord.MessageEmbed()
        .setDescription(':no_entry_sign: The specified user was not found!')
        .setTitle('Error')
        .setColor('RED')
        message.channel.send(embed2)
    }
}


module.exports.help = {
	name: "mcuser",
	description: "shows the skin of a minecraft account!",
	usage: "-mcuser <username>",
	accessableby: "Member",
	aliases: [],
};