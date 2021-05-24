const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, guild, member) => {
    let shoutinfo = args.slice(1).join(" ");
    let shouttitle = args[0];
    const suggestionChannel = message.guild.channels.cache.find(c => c.name === 'change-log')

    const noPerms = new Discord.MessageEmbed()
        .setDescription(
            `:no_entry_sign: ${message.author.username}, Missing Permission!`
        )
        .setColor(0xff0000);

    const noPerms123 = new Discord.MessageEmbed()
        .setDescription(
            `:no_entry_sign: ${message.author.username}, cant be just 1 word, add more info!`
        )
        .setColor(0xff0000);

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
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

            .setColor('GREEN')
            .setTitle(`${shouttitle}`)
            .setDescription(`${shoutinfo}`)
            .setFooter(`Imperial Realms | Update by ${message.author.username}#${message.author.discriminator}`)
    ).then(message => {
        message.react('✅');
    })
        message.channel.send(
            new MessageEmbed()

                .setColor('BLUE')
                .setTitle(`${message.author.username} I posted a changelog for you!`)
                .setDescription(`I posted this for you: \n ${shouttitle}\n ${shoutinfo}`)

                ).then(message => {
                    message.react('✅');
                })
},

    module.exports.help = {
        name: "changelog",
        description: "This command is used for posting to the change-log.",
        usage: "-changelog <title> <desc>",
        accessableby: "Manage Message",
        aliases: ["change-log","clog","changelogs","change-logs"],
    };
