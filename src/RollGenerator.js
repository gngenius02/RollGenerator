const { SeedGenerator } = require('./SeedGenerator');

class DuckDiceRollGenerator extends SeedGenerator {
	constructor(server, client, nonce, numberOfRolls) {
		super(server, client);
		this.nonce = nonce || 0;
		this.numberOfRolls = numberOfRolls || 10000;
		this.seedhash = this.sha256(this.server);
		this.rollArray = this.genRolls(this.numberOfRolls);
	}
	genRolls(numLoops) {
		let current = this.nonce;
		const arr = [];
		const target = numLoops + current;
		while (++current < target) {
			this.nonce = current;
			const { nonce } = this;
			const roll = this.getRoll(`${this.server}${this.client}${current}`);
			arr.push(JSON.stringify({ nonce, roll }));
		}
		return arr;
	}
	getRoll(message) {
		const hash = this.sha512(message);
		let index = 0,
			lucky = 0;
		do {
			lucky = parseInt(hash.substr(index, 5), 16);
			index += 5;
		} while (lucky >= 1000000);
		return lucky % 10000;
	}
}

module.exports = { DuckDiceRollGenerator };
