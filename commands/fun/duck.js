const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
    try {
        const res = await fetch('https://random-d.uk/api/v2/random');
        const img = (await res.json()).url;
        const embed = new MessageEmbed()
            .setTitle('🦆  Quack!  🦆')
            .setImage(img)
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
            
        message.channel.send(embed);
    } catch (err) {
        message.client.logger.error(err.stack);
        this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
}
module.exports.help = {
    name: "duck",
    description: "shows a duck!",
    usage: "-fox ",
    accessableby: "Member",
    aliases: ["ducks"],
};