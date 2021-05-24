module.exports = async (giveaway, member, reaction) => {
	console.log(
		`${message.author.username} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
	);
};
