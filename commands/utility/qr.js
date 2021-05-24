const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports.run = async (client, message, args, guild, member) => {
    // Variables
    let weblink = (args[0])
    let link = `http://api.qrserver.com/v1/create-qr-code/?data=${weblink}&size=200x200`

          // Input Checking
          if (!weblink) return message.channel.send('Please give me a link to turn into a QR-Code')
          if (weblink) {
            const attachment = new MessageAttachment(link, 'qrcode.png');
            const embed = new MessageEmbed()
              .setTitle(`QRCode Generated!`)
              .attachFiles(attachment)
              .setColor('BLUE')
              .setImage('attachment://qrcode.png')
              .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));
            message.channel.send(embed);
          } else { message.channel.send('Error! The input is not a valid link! Please make sure it is a valid link.\nWhen inputting the link please add `https://`!'); }
        }

        module.exports.help = {
            name: "QR",
            description: "This command is used to get a custom QR",
            usage: "-QR <Link>",
            accessableby: "Everyone",
            aliases: [],
        };