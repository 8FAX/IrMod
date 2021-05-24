const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, guild, member) => {
    let shoutinfo = args.slice(1).join(" ");
    let shouttitle = args[0];
    const suggestionChannel = message.guild.channels.cache.find(c => c.name === 'suggestion')

    const noPerms = new Discord.MessageEmbed()
        .setDescription(
            `:no_entry_sign: ${message.author.username}, Read the rules befor you use the command!`
        )
        .setColor(0xff0000);

    const noPerms123 = new Discord.MessageEmbed()
        .setDescription(
            `:no_entry_sign: ${message.author.username}, cant be just 1 word, add more info!`
        )
        .setColor(0xff0000);

    if (!message.member.hasPermission("SEND_MESSAGES"))
        return message.channel.send(noPerms).then(msg => msg.delete(5000));

    if (!shoutinfo) {
        message.delete();
        return message.channel.send(noPerms123);
    }

    if (!shouttitle) {
        message.delete();
        return message.channel.send(noPerms123);
    }

    suggestionChannel.send(
        new MessageEmbed()

            .setColor('BLUE')
            .setTitle(`Suggestion By: ${message.author.username}#${message.author.discriminator}`)
            .setDescription(`${shouttitle} ${shoutinfo}\n \n \n`)
            .setFooter('Want to suggest something? \nGo #bot-commands-🤖 and type -Suggest <desc>')
    ).then(message => {
        message.react('👍');
        message.react('👎');
    })
        message.channel.send(
            new MessageEmbed()

                .setColor('BLUE')
                .setTitle(`${message.author.username} Thank you for your Suggestion!`)
                .setDescription(`Check out <#740999315572523068> to see other cool suggestions`)
                .setFooter('Do not abuse the Suggestion command, a suggestion can be removed for any reason at any time.')

                ).then(message => {
                    message.react('✅');
                })
},

    module.exports.help = {
        name: "suggest",
        description: "This command is used for suggesting things! ",
        usage: "-suggest <desc>",
        accessableby: "Everyone",
        aliases: [],
    };
