const { RollGenerator: Roll } = require('./src/RollGenerator');

// You not need to pass this option into the Roll class if you are
// using the auto generation methods. This is needed if you want to
// get the rolls for verification on a certain seed/pair combo.
const sendoptions = {
	server: '0b5fd1d1172914b1283af7642627ab2b02199bca1a8a015591d131092c4e0010',
	client: '0b5fd1d117',
	nonce: 2701236,
	numberOfRolls: 100000
};

//call the rolls from options above easily by creating a function like so:
function generateRolls(opt) {
	if (opt) {
		return JSON.stringify(new Roll(opt));
	}
	return JSON.stringify(new Roll());
}

//or have it generate seed/client and rolls for you.
function getRandomSeedsRolls() {
	const numRounds = 2;
	const generatedArray = new Array();

	while (generatedArray.push(new Roll()) < numRounds) {
		console.log(generatedArray.concat());
	}

	return generatedArray;
}
console.time('Generated rolls and wrote to file in');
const rolls = generateRolls(sendoptions);
// console.log(rolls);

const fs = require('fs');
fs.writeFile('./output.json', rolls, () => {
	console.log('finished writing to file.');
	console.timeEnd('Generated rolls and wrote to file in');
});
