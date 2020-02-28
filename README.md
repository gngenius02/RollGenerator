# RollGenerator

Made to generate roll data based on hashing algo from certain sites.


- **To Install**

```
git clone https://github.com/gngenius02/RollGenerator.git && cd ./RollGenerator

npm install

npm start
```

> A note, the app as it is currently will create an output.json file with a set number
>of randomly genenrated seeds and rolls.
>must have NodeJS isntalled.

**Examples**
--

- **Generate with exisiting variables**

```
const { DuckDiceRollGenerator: Roll } = require('./src/RollGenerator');


const Options = {
	server: '0b5fd1d1172914b1283af7642627ab2b02199bca1a8a015591d131092c4e0010',
	client: '0b5fd1d117',
	nonce: 2701236,
	numberOfRolls: 10000
};

const getRolls = new Roll(Options);

console.log(getRolls);
```

- **Generate new seed pairs**


```
const { DuckDiceRollGenerator: Roll } = require('./src/RollGenerator');


const getRolls = new Roll();

console.log(getRolls);
```

- **Generating new seeds in a loop**.
  - this would generate 10 seed pairs with 10,000 rolls for each pair.

```
const { DuckDiceRollGenerator: Roll } = require('./src/RollGenerator');

const rollsArray = new Array();

while(rollsArray.push(new Roll()) < 10);

console.log(rollsArray)
```
---
    - An example of the output:
 ```
DuckDiceRollGenerator {
server: 'b4012cf2735f08ae7c760e561ee0ccf316d88c48cc875151ed986036d1ce18c6',
client: 'XBnvdleEFzaXjr8zhjYRiiCux5OtjT',
nonce: 9999,
numberOfRolls: 10000,
seedhash: '6171cbde83a019c750cbdb9b08b8cdc6be73d3e468f07bb6320f5a893a510436',
rollArray: [
'{"nonce":1,"roll":7835}','{"nonce":2,"roll":4755}',
'{"nonce":3,"roll":6905}','{"nonce":4,"roll":1864}',
'{"nonce":5,"roll":4936}','{"nonce":6,"roll":1218}',
'{"nonce":7,"roll":1539}','{"nonce":8,"roll":8831}',
'{"nonce":9,"roll":4134}','{"nonce":10,"roll":6730}' . . .

 ```
---

# Future plans

    Add the algos to create the seed pairs and rolls for more dice sites.

# **Like my work?**

    BTC: 3LHigQvHwcb5uH8NeorKyiYEqDvLumaEsV