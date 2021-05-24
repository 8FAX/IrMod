

const token = 'Nzk1NzYzMzQ4NjEyMTg2MTcz.X_OGXg.DiaIR1NpY2VsPVz09nSU2vO6V6U'
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./index.js", {
	totalShards: 1,
});

manager.on("launch", shard => {
	console.log(
		`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id
		}`
	);
});

manager.on("message", (shard, msg) => {
	console.log(
		`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval
		} | ${msg._result}`
	);
});

manager.spawn();

