const Discord = require('discord.js');
module.exports.run = async (message, args, client) => {
    if (args.length < 1) {
        message.channel.send('You must provide some text to emojify!');
    }

    const mapping = {
        ' ': '   ',
        '0': ':zero:',
        '1': ':one:',
        '2': ':two:',
        '3': ':three:',
        '4': ':four:',
        '5': ':five:',
        '6': ':six:',
        '7': ':seven:',
        '8': ':eight:',
        '9': ':nine:',
        '!': ':grey_exclamation:',
        '?': ':grey_question:',
        '#': ':hash:',
        '*': ':asterisk:'
    };
    
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
        mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
    });

    message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(''));

}

module.exports.help = {
    name: "emojify",
    description: "Returns provided text in emojify (emotes) form.",
    usage: "-emojify <Message> ",
    accessableby: "Member",
    aliases: [],
};

