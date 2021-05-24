const fetch = require("node-fetch");
function alwaysOn() {
	setInterval(async () => {
		await fetch("https://8fa.dev/").then(console.log("Pinged!"));
	}, 240000);
}

module.exports = alwaysOn;
