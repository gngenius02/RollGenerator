const { DuckDiceRollGenerator: Roll } = require('./src/RollGenerator');

// You not need to pass this option into the Roll class if you are
// using the auto generation methods. This is needed if you want to
// get the rolls for verification on a certain seed/pair combo.
const sendoptions = {
	server: '0b5fd1d1172914b1283af7642627ab2b02199bca1a8a015591d131092c4e0010',
	client: '0b5fd1d117',
	nonce: 2701236,
	numberOfRolls: 10000
};

function generateRolls(opt) {
	if (opt) {
		const { server, client, nonce, numberOfRolls } = opt;
		return JSON.stringify(new Roll(server, client, nonce, numberOfRolls));
	} else {
		return new Roll();
	}
}

function getRandomSeedsRolls(numSeeds) {
	const numRounds = numSeeds;
	const generatedArray = new Array();

	while (generatedArray.push(new Roll()) < numRounds);
	return generatedArray;
}

console.time('Generated rolls and wrote to file in');
const rolls = getRandomSeedsRolls(10);
console.log(rolls);

const fs = require('fs');
fs.writeFile('./output.json', JSON.stringify(rolls), () => {
	console.log('finished writing to file.');
	console.timeEnd('Generated rolls and wrote to file in');
});
