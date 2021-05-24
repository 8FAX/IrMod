
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const pagination = require('discord.js-pagination')

exports.run = async (client, message, args, msg) => {


          // Permissions Checking
          const permsError = new MessageEmbed()
            .setDescription(`:no_entry_sign: You are missing Permission`)
            .setTitle('Error')
            .setColor('RED')

          if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(permsError)

          const permsErrorSelf = new MessageEmbed()
            .setDescription(':no_entry_sign: I am missing the **VIEW_AUDIT_LOG** permission!')
            .setTitle('Error')
            .setColor('RED')

          if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(permsErrorSelf)

          // Exeucting
          message.guild.fetchAuditLogs()
            .then(audit => {

              // Convertion (Page 2)
              const then = moment(audit.entries.first().createdAt);
              const time = then.from(moment());
              const ca = then.format("MMM Do, YYYY")

              // Covertion (Page 3)
              const then2 = moment(audit.entries.first().executor.createdAt)
              const time2 = then2.from(moment())
              const ca2 = then2.format("MMM Do, YYYY")

              // Convertion (Page 4)
              const then3 = moment(audit.entries.first().target.createdAt)
              const time3 = then3.from(moment())
              const ca3 = then3.format("MMM Do, YYYY")

              // Executing 2
              const first = new MessageEmbed()
                .setAuthor(`Audit Log - Requested By ${message.author.tag}`, message.guild.iconURL({ dynamic: true }))
                .setDescription(`Below is some information about the most recent log from the server Audit Log`)
                .addField('Executor Username', audit.entries.first().executor.username, true)
                .addField('Execute Reason', audit.entries.first().reason || 'No Reason', true)
                .addField('Exeuctor Bot?', audit.entries.first().executor.bot, true)
                .addField('Target Username', audit.entries.first().target.username || 'Type Can Not Have Target', true)
                .addField('Target Bot?', audit.entries.first().target.bot, true)
                .addField('Action Information', audit.entries.first().action)
                .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('BLUE')

              const minorInfo = new MessageEmbed()
                .setAuthor(`Minor Info - Requested By ${message.author.tag}`, message.guild.iconURL({ dynamic: true }))
                .setDescription('Below is some minor information about the most recent log from the server Audit Log')
                .addField('Action Type', audit.entries.first().action, true)
                .addField('Action Executed Timestamp', `${ca} (${time})`, true)
                .addField('Action ID', audit.entries.first().id)
                .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('BLUE')

              const executorInfo = new MessageEmbed()
                .setAuthor(`Executor Info - Requested By ${message.author.tag}`, message.guild.iconURL({ dynamic: true }))
                .setDescription('Below is some executor information about the most recent log from the server Audit Log')
                .addField('Executor Username', audit.entries.first().executor.username, true)
                .addField('Executor ID', audit.entries.first().executor.id, true)
                .addField('\u200B', '\u200B', true)
                .addField('Account Creation Date', `${ca2} (${time2})`, true)
                .addField('Action Taken', audit.entries.first().action, true)                
                .addField('Executor Bot?', audit.entries.first().executor.bot, true)
                .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('BLUE')

              const targetInfo = new MessageEmbed()
                .setAuthor(`Target Info - Requested By ${message.author.tag}`, message.guild.iconURL({ dynamic: true }))
                .setDescription('Below is some target information about the most recent log from the server Audit Log')
                .addField('Target Username', audit.entries.first().target.username, true)
                .addField('Target ID', audit.entries.first().target.id, true)
                .addField('\u200B', '\u200B', true)
                .addField('Account Creation Date', `${ca3} (${time3})`, true)
                .addField('Action Received', audit.entries.first().action, true)
                .addField('Target Bot?', audit.entries.first().target.bot, true)
                .setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('BLUE')

              const page = [
                first,
                minorInfo,
                executorInfo,
                targetInfo
              ]

              const emojiList = ['◀', '▶'];

              const timeout = '240000';

              pagination(message, page, emojiList, timeout)
            })

        }
        module.exports.help = {
            name: "audit",
            description: "This command is used to show the audit logs for the server.",
            usage: "-audit",
            accessableby: "Staff",
            aliases: ["logs"],
        };
