const { SeedGenerator } = require('./SeedGenerator');

class DuckDiceRollGenerator extends SeedGenerator {
	constructor() {
		super();
		this.nonce = 0;
		this.numberOfRolls = 10000;
		if (arguments.length > 0 && 'object' === typeof arguments[0]) {
			let keys = Object.entries(arguments[0]);
			for (let key of keys) {
				if (key[0].match(/server|client|nonce|numberOfRolls/))
					this[key[0]] = key[1];
			}
		}
		this.seedhash = this.sha256(this.server);
		this.rollArray = this.genRolls(this.numberOfRolls);
	}
	tostr(o) {
		return JSON.stringify(o);
	}
	genRolls(numLoops) {
		let current = this.nonce;
		const arr = [];
		const target = numLoops + current;
		while (++current < target) {
			this.nonce = current;
			const { nonce } = this;
			const roll = this.getRoll(`${this.server}${this.client}${current}`);
			arr.push(this.tostr({ nonce, roll }));
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
const RollGenerator = DuckDiceRollGenerator;
module.exports = { RollGenerator };
