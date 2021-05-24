const { Client, Message, MessageEmbed } = require("discord.js");




module.exports = {
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || message.author;

        if (!member) return message.reply("Please specify a member!");

        const members = message.guild.members.cache
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .array();

        const position = new Promise((ful) => {
            for (let i = 1; i < members.length + 1; i++) {
                if (members[i - 1].id === member.id) ful(i);
            }
        });

        const positione = new MessageEmbed()
            .setTitle(`Join Position Of ${member.tag}`)
            .setDescription(`${member.tag} is the \`${await position}\` member to join **${message.guild.name}**`)
            .setColor(`RANDOM`)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send(
            positione
        );
    },
};



module.exports.help = {
	name: "joinpos",
	description: "shows the position you joined the server in!",
	usage: "-joinpos",
	accessableby: "Member",
	aliases: [],
};