const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let helpArray = message.content.split(" ");
	let helpArgs = helpArray.slice(1);

	if (!helpArgs[0]) {
		const embed = new Discord.MessageEmbed()
			.setTitle("Help & Commands list")
			.setColor("RANDOM")
			.setDescription(
				"**prefix** `-`\nMore Info please visit: [Here](not setup yet) and invite me to your server."
			)
			.addField("**📱Basic**", "`help`, `ping`, `vote`, `uptime`, `buycraft`, `rules'")
			.addField(
				"**⚙utility**",
				"`aes256`, `avatar`, `channel`, `roleinfo`, `reverse`, `setafk`, `snipe`, `stats`, `timer`, `translate`, `whois`, `weather`, `youtube`"
			)
			.addField(
				"**🎃Fun**",
				"`8ball`, `cat`, `deaes256`, `meme`, `pat`, `poke`, `smug`, `tickle`, `rickroll`"
			)
			.addField(
				"**:frame_photo:Image**",
				"`circle`, `delete`, `changemymind`, `trigger`, `clyde`"
			)
			.setFooter(
				`Developed by 8FA for Imperial Realms | This command requested by ${message.author.username}#${message.author.discriminator}`
			);
		message.channel.send({ embed });
	}

	if (helpArgs[0]) {
		let command = helpArgs[0];

		if (bot.commands.has(command)) {
			command = bot.commands.get(command);
			let alia = command.help.aliases;
			if (command.help.aliases < 1) alia = "No aliases";

			var embed = new Discord.MessageEmbed()
				.setTitle(`**Command: ${command.help.name}**`)
				.setDescription(
					`
            **Description:**\n\`\`\`${
							command.help.description ||
							"There is no Description for this command."
						}\`\`\`\n**Usage:**\n\`\`\`${
						command.help.usage || "No Usage"
					}\`\`\`\n**Permissions:**\n\`\`\`${
						command.help.accessableby || "Members"
					}\`\`\`\n**Aliases:**\n\`\`\`${alia}\`\`\``
				)
				.setColor("#4a4b4d")
				.setFooter(`Developed by 8FA for Imperial Realms \nThis command requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ dynamic: true }));

			message.channel.send(embed);
		} else {
			var embeds = new Discord.MessageEmbed()
				.setTitle(`**Command: ${helpArgs[0]}**`)
				.setDescription(
					`
            **Response:**
						\`\`\`Error: 404 Not Found\`\`\``
				)
				.setColor("#ff0000");

			return message.channel.send(embeds);
		}
	}
};

module.exports.help = {
	name: "help",
	description: "This command is used for displaying all commands.",
	usage: "-help",
	accessableby: "Members",
	aliases: ["h","How", "HowTo"],
};
