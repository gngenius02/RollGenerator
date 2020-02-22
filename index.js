const { Roll } = require('./src/SeedandRollClass');

// You not need to pass this option into the Roll class if you are
// using the auto generation methods. This is needed if you want to
// get the rolls for verification on a certain seed/pair combo.
options = {
	server: '0b5fd1d1172914b1283af7642627ab2b02199bca1a8a015591d131092c4e0010',
	client: 'easyas1234',
	nonce: 2701236,
	numberOfRolls: 1000
};

//call the rolls from options above easily by creating a function like so:
function generateRolls(o) {
	const userSelected = new Roll(o);
	return userSelected;
}

// const rolls = generateRolls(options);

// then you can either see the data, or pass it somwhere else like to a file

//or have it generate seed/client and rolls for you.
function getRandomSeedsRolls() {
	const numRounds = 10;
	const generatedArray = new Array();

	while (generatedArray.length < numRounds) {
		const { server, client, seedhash, rollArray } = new Roll();
		generatedArray.push({ server, client, seedhash, rollArray });
	}

	return generatedArray;
}

const rolls = getRandomSeedsRolls();

const fs = require('fs');
fs.writeFile('./output.json', JSON.stringify(rolls), () =>
	console.log('finished writing to file.')
);
