const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setDescription(`Level Leaderboard: \`!leaderboard levels\` || Message Leaderboard: \`!leaderboard messages\``)
    .setColor("#FFFFFF")


const db = require('quick.db');

  if(!args[0]) return message.channel.send(embed)

    if (args[0] == 'levels') {
    let level = db.fetch(`level_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < level.length ; i++) {
        let user = bot.users.get(level[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${level[i].data}\nW`
    
      }

      let embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Level Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'messages') {
    let messages = db.fetch(`messages_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < messages.length; i++) {
        let user = bot.users.get(messages[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${messages[i].data}\n`
    }

    let embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Messages Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)

  }
}

module.exports.help = {
	name: "leaderboard",
	description: "Shows the people with the hightest ranks!",
	usage: "-level",
	accessableby: "Member",
	aliases: ["lb","xptop"],
};