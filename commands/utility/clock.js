const Discord = require('discord.js')
module.exports.run = async (client, message, args, guild, member) => {

          var gmt = new Date().toLocaleString("en-US", { timeZone: "Europe/London" })
          var est = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
          var pst = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
          var cst = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
          var cet = new Date().toLocaleString("en-US", { timeZone: "CET" })
          var mst = new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" })
          var aest = new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" })
          var awst = new Date().toLocaleString("en-US", { timeZone: "Australia/Perth" })
          var kst = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
          var ist = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" })

          const worldClock = new Discord.MessageEmbed()
            .setAuthor('World Clock - Timezones')
            .addField(':flag_eu: London (GMT)', `${gmt}\n(GMT+0/GMT+1)`, true)
            .addField(':flag_eu: Central (CET)', `${cet}\n(GMT+1)`, true)
            .addField('\u200B', '\u200B', true)
            .addField(':flag_us: New York (EST)', `${est}\n(GMT-5)`, true)
            .addField(':flag_us: Los Angles (PST)', `${pst}\n(GMT-8)`, true)
            .addField(':flag_us: Mexico City (CST)', `${cst}\n(GMT-7)`, true)
            .addField(':flag_au: Sydney (AEST)', `${aest}\n(GMT+11)`, true)
            .addField(':flag_au: Perth (AWST)', `${awst}\n(GMT+8)`, true)
            .addField('\u200B', '\u200B', true)
            .addField(':flag_kr: Korean (KST)', `${kst}\n(GMT+9)`, true)
            .addField(':flag_in: India (IST)', `${ist}\n(GMT+05:30)`, true)
            .addField('\u200B', '\u200B', true)
            .setColor('BLUE')
            .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))

          message.channel.send(worldClock)
  }
  module.exports.help = {
	name: "clock",
	description:
		"Gives you times around the world!",
	usage: "-clock",
	accessableby: "Member",
	aliases: ["world-clock","wc","wclock","worldclock","worldtime"],
};