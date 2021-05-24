const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
    try {
      const res = await fetch('http://shibe.online/api/birds');
      const img = (await res.json())[0];
      const embed = new MessageEmbed()
        .setTitle('🐦  Chirp!  🐦')
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
    name: "bird",
    description: "shows a bird!",
    usage: "-bird",
    accessableby: "Member",
    aliases: ["bird"],
};