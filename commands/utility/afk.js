
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
		const status = new db.table("AFKs")
		let afk = await status.fetch(message.author.id, message.guild.id)
		const emb = new Discord.MessageEmbed()
		.setColor("GOLD")

		if(!afk){
			emb.setDescription(`**${message.author}** is now AFK, Reason: ${args.join(" ") ? args.join(" "): "No Reason"}`).setFooter('AFK test')
			status.set(message.author.id, message.guild.id, args.join(" ") || `No Reason`)
		} else {
			emb.setDescription(`You are no longer AFK`)
			status.delete(message.author.id, message.guild.id)
		}
		message.channel.send(emb)
    }

    module.exports.help = {
        name: "afk",
        description: "Use the command to show other members you are afk and why!",
        usage: "-afk <reason>",
        accessableby: "Member",
        aliases: [],
    };