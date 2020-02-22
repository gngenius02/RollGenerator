const { createHash, randomBytes } = require('crypto');

class SeedGenerator {
	constructor() {
		this.init();
	}
	clean(c) {
		return String(c)
			.replace(/[/+=]/g, '')
			.slice(0, 30);
	}
	rand(str = 'hex') {
		return randomBytes(32).toString(str);
	}
	hash(message, algo = 'sha512') {
		return createHash(algo)
			.update(message)
			.digest('hex');
	}
	clientGenerate() {
		return this.clean(this.rand('base64'));
	}
	serverGenerate() {
		return this.rand('hex');
	}
	init() {
		const sseed = this.serverGenerate();
		const cseed = this.clientGenerate();
		return { sseed, cseed };
	}
}

class Roll extends SeedGenerator {
	constructor() {
		super();

		if (!arguments.length > 0) {
			const { sseed, cseed } = this.init();
			this.server = sseed;
			this.client = cseed;
			this.nonce = 0;
			this.numberOfRolls = 10000;
		} else {
			const { server, client, nonce, numberOfRolls } = arguments[0];
			this.server = server;
			this.client = client;
			this.nonce = nonce;
			this.numberOfRolls = numberOfRolls;
		}

		this.seedhash = this.hash(this.server, 'sha256');
		this.rollArray = this.loop(this.numberOfRolls);
	}
	checkUndefined(o) {
		if (typeof o === 'undefined') return true;
		return false;
	}
	str(o) {
		return JSON.stringify(o);
	}
	loop(numLoops) {
		let current = this.nonce;
		const rollArray = [];
		const target = numLoops + current;
		while (++current < target) {
			this.roll = this.getRoll(`${this.server}${this.client}${current}`);
			this.nonce = current;
			const { nonce, roll, str } = this;
			rollArray.push(str({ nonce, roll }));
		}
		return rollArray;
	}
	getRoll(message) {
		const { hash } = this;
		const sha512 = hash(message, 'sha512');
		let index = 0,
			lucky;
		do {
			lucky = parseInt(sha512.substr(index, 5), 16);
			index += 5;
		} while (lucky >= 1000000);
		return lucky % 10000;
	}
}

module.exports = { Roll };
