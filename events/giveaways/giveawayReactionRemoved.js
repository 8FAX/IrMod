module.exports = async (giveaway, member, reaction) => {
	console.log(
		`${message.author.username} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
	);
};
