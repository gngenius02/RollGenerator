const { createHash, randomBytes } = require('crypto');

class SeedGenerator {
	constructor() {
		this.server = this.newServerSeed();
		this.client = this.newClientSeed();
	}
	sha512(message) {
		return createHash('sha512')
			.update(message)
			.digest('hex');
	}
	sha256(message) {
		return createHash('sha256')
			.update(message)
			.digest('hex');
	}
	rand(encoding = 'hex') {
		return randomBytes(32).toString(encoding);
	}
	clean(string) {
		return string.replace(/[/+=]/g, '').substr(0, 30);
	}
	newClientSeed() {
		const r = this.rand('base64');
		return this.clean(r);
	}
	newServerSeed() {
		return this.rand();
	}
}

module.exports = { SeedGenerator };
