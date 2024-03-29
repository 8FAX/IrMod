const Discord = require('discord.js');
const db = require('quick.db');
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");


module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author
    
    var level = db.get(`level_${message.guild.id}_${user.id}`) || 0
    level = level.toString()

    let xp = db.get(`xp_${message.guild.id}_${user.id}`) || 0
    var xpNeeded = level * 500 + 500
    let every = db
    .all()
    .filter(i => i.ID.startsWith(`xptotal_${message.guild.id}`))
    .sort((a, b) => b.data - a.data)

    var rank = every.map(x => x.ID).indexOf(`xptotal_${message.guild.id}_${message.author.id}`) + 1
    rank = rank.toString()


    var image = new canvacord.Rank()
.setAvatar(user.displayAvatarURL({format: "png"}))
.setCurrentXP(xp)
.setRequiredXP(xpNeeded)
    .setRank(Number(rank))
.setStatus(user.presence.status)
    .setLevel(Number(level),"LEVEL")
    .setCustomStatusColor("#ff8858")
.setProgressBar("#ff8858", "COLOR")
    .setProgressBarTrack("#FFFFFF", "COLOR")
    .setUsername(user.username)
.setDiscriminator(user.discriminator);

    image.build()
.then(buffer => {
            const attachment = new Discord.MessageAttachment(buffer, "rank.png");
    message.channel.send(attachment);
});

},


module.exports.help = {
    name: "level",
    description: "Shows your level!",
    usage: "-level",
    accessableby: "Member",
    aliases: ["lv", "levels"],
};