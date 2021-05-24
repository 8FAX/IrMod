require("dotenv").config();

const Enmap = require("enmap");
const Discord = require("discord.js");

const client = new Discord.Client({
	disableMentions: "everyone",
});
const DisTube = require("distube");
const config = require("./config.json");
client.config = config;
client.login(process.env.TOKEN);
const db = require("quick.db");
const { GiveawaysManager } = require("discord-giveaways");
const nz_date_string = new Date().toLocaleString("en-US", {
	timeZone: "Asia/Hong_Kong",
	//cus i wanted ppl to not know where i was from...
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;
client.colors = client.config.colors;
client.snipes = new Map();
client.mapss = new Map();
client.mapss.set("uptimedate", nz_date_string);

["command", "event", "giveaway", "music"].forEach(x =>
	require(`./handlers/${x}.js`)(client)
);
["alwaysOn", "http"].forEach(x => require(`./server/${x}`)());

client.settings = new Enmap({
	name: "settings",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: "deep",
});

client.distube = new DisTube(client, {
	leaveOnFinish: true,
	leaveOnEmpty: true,
	leaveOnStop: true,
	youtubeDL: true,
	updateYouTubeDL: true,
	youtubeCookie:
		"GPS=1; YSC=w5dGoHzqQRI; VISITOR_INFO1_LIVE=B4ElBqxSDv4; PREF=tz=Asia.Hong_Kong",
});

if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	async getAllGiveaways() {
		return db.get("giveaways");
	}

	async saveGiveaway(messageID, giveawayData) {
		db.push("giveaways", giveawayData);
		return true;
	}

	async editGiveaway(messageID, giveawayData) {
		const giveaways = db.get("giveaways");
		const newGiveawaysArray = giveaways.filter(
			giveaway => giveaway.messageID !== messageID
		);
		newGiveawaysArray.push(giveawayData);
		db.set("giveaways", newGiveawaysArray);
		return true;
	}

	async deleteGiveaway(messageID) {
		const newGiveawaysArray = db
			.get("giveaways")
			.filter(giveaway => giveaway.messageID !== messageID);
		db.set("giveaways", newGiveawaysArray);
		return true;
	}
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
	storage: false,
	updateCountdownEvery: 10000,
	endedGiveawaysLifetime: 30000,
	hasGuildMembersIntent: false,
	default: {
		botsCanWin: false,
		exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
		embedColor: "#ff6969",
		embedColorEnd: "#505050",
		reaction: "🎉",
	},
});
client.giveawaysManager = manager;

client.status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${
		queue.filter || "Off"
	}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode == 2
				? "All Queue"
				: "This Song"
			: "Off"
	}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
