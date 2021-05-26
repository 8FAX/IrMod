
    const Discord = require("discord.js");

exports.run = async (client, message, args, Discord) => {

    const { MessageEmbed } = require('discord.js');

    message.channel.send("Application started! Check your DM!")
    const questions = [
        "What's your name?",
        "How old are you?",
        "Where are you from?",
        "What's your gender?"
    ];

    let collectedCounter = 0;
    let endCounter = 0;

    const filter = (m) => m.author.id === message.author.id;

    const appStart = await message.author.send(questions[collectedCounter++])
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);
    collector.on("collect", () => {
        if (collectedCounter < questions.length) {
            channel.send(questions[collectedCounter++]);
        } else {
            channel.send("Your application has been sent!")
            collector.stop("fulfilled");
        }
    });

    const appsChannel = client.channels.cache.get("803000745867345921");
    collector.on('end', (collected, reason) => {

        if (reason === 'fulfilled') {
            let index = 1;
            const mappedResponses = collected.map((msg) => {
                return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
            }).join("\n\n")

            const levelemb = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle("New application!")
                .setDescription(mappedResponses)
                .setColor("GREEN")
                .setTimestamp()
            appsChannel.send(levelemb)
        }
    })
}
module.exports.help = {
    name: "apply",
    description: "Use the command to apply for staff",
    usage: "-apply",
    accessableby: "Member",
    aliases: [],
};