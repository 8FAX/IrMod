const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    async run(bot, message, args) {
        const config = [100, 200, 300, 500];
        const emo = config[message.guild.premiumTier];
        const se = `**${message.guild.emojis.cache.filter(e => !e.animated).size} / ${emo / 2}** (${emo / 2 - message.guild.emojis.cache.filter(e => !e.animated).size} left, ${Number((message.guild.emojis.cache.filter(e => !e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
        const ae = `**${message.guild.emojis.cache.filter(e => !e.animated).size} / ${emo / 2}** (${emo / 2 - message.guild.emojis.cache.filter(e => e.animated).size} left, ${Number((message.guild.emojis.cache.filter(e => e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
        const te = `**${message.guild.emojis.cache.size} / ${emo}** (${emo - message.guild.emojis.cache.size} left, ${Number((message.guild.emojis.cache.size / emo) * 100).toFixed(2)}% full)`;
        const server = message.guild;
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail(server.iconURL({ dynamic: true }))

            .addField(`Static Emojis:`, se)
            .addField(`Animated Emojis:`, ae)
            .addField(`Total Emojis:`, te)
            .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send(`**EMOJIS STATS**`, embed);
    }
}

module.exports.help = {
        name: "emojistats",
        description:
            "Shows some stats about the servers emojis.",
        usage: "-emojistats",
        accessableby: "Everyone",
        aliases: ["estats", "emoji-stats"],
    };

