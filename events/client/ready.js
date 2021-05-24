module.exports = async client => {
	console.log("Bot is fully Ready!");
	const activities = [
		`Over the HoloNet`,
		`Over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		`By 8FA`,
		`IP: Play.imperialrealms.net`,
		'-help',
		'For Commands',
		'Over you...',
		'For StarWars Memes',
		'Need help? -help!',
		'8FA Break the server :)',
		'Over GiveAways... Hold up Wrong bot!',
		'Players Open Keys!',
		`Shop: Store.imperialrealms.net`,
		'For Cheaters',
		'Over Events!',
		'For -help',
		'By Cecily',
	];

	let i = 0;
	setInterval(
		() =>
			client.user.setActivity(
				`${activities[i++ % activities.length]}`,
				{ type: "WATCHING" }
			),
		15000
	);
};
