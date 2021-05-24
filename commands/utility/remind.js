const ms = require('ms');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const discord = require('discord.js')

module.exports.run = async (client, message, args, guild, member) => {
    let timeuser = args[0]
    let reason = args.slice(1).join(" ")
    
    if(!timeuser){let errorembed1 = new Discord.MessageEmbed()
        .setDescription(':no_entry_sign: You should enter a timer! `10s, 10m, 10h, 10d` ')
        .setColor('RED')
        .setTitle('Error')
        message.channel.send(errorembed1)
        return
        } //return message.channel.send('You should enter a timer! `10s, 10m, 10h, 10d`')
    if(!reason){let errorembed1 = new Discord.MessageEmbed()
        .setDescription(':no_entry_sign: You should enter a reason or reminder text!')
        .setColor('RED')
        .setTitle('Error')
        message.channel.send(errorembed1)
        return
        } //return message.channel.send('You should enter a reason or reminder text!')
    
    db.set(`remind.${message.author.id}`, Date.now() + ms(timeuser))
    const embed2 = new discord.MessageEmbed()
    .setDescription(`Nice! I will remind you in \`${timeuser}\` for **__${reason}__**`)
    .setColor('BLACK')
    .setTimestamp()
    message.channel.send(embed2)
    const interval = setInterval(function() {
        
      if(Date.now() > db.fetch(`remind.${message.author.id}`)) {
        db.delete(`remind.${message.author.id}`)
        const embed = new discord.MessageEmbed()
        .setTitle('Reminder')
        .setDescription(`Hey! i remind you for **${reason}**`)
        .setColor('BLACK')
        message.channel.send(`<@${message.author.id}>`,embed)
        .catch(e => console.log(e))
        clearInterval(interval)
        
      }
      
      }, 1000)
    
  }
  module.exports.help = {
    name: "remind",
    description: "Reminds you of anything!",
    usage: "-remind <time> <desc>",
    accessableby: "Everyone",
    aliases: ["reminder"],
};