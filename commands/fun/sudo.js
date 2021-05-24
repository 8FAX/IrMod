const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
        if (!args[0]){ 
        let errorembed1 = new Discord.MessageEmbed()
        .setDescription(':no_entry_sign: Missing argument. Argument: Mention someone in this server. ')
        .setColor('RED')
        .setTitle('Error')
        message.channel.send(errorembed1)
        return
        }


        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member){let errorembed2 = new Discord.MessageEmbed()
            .setDescription(':no_entry_sign: Could not find that member! ')
            .setColor('RED')
            .setTitle('Error')
            message.channel.send(errorembed2)
            return
            }


        if (args.length < 2) {let errorembed3 = new Discord.MessageEmbed()
            .setDescription(':no_entry_sign: Missing argument. Argument: Need a message! ')
            .setColor('RED')
            .setTitle('Error')
            message.channel.send(errorembed3)
            return
            } 

        message.channel.createWebhook(member.user.username, {
            avatar: member.user.displayAvatarURL({ dynamic: true })
        }).then(webhook => {
            webhook.send(args.slice(1).join(' '))
            setTimeout(() => {
                webhook.delete()
            }, 3000)
        })
    }

    module.exports.help = {
        name: "sudo",
        description:
            "make anyone say anything!",
        usage: "-sudo <user> <message>",
        accessableby: "Member",
        aliases: [],
    };