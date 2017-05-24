var CoinKey = require('coinkey');
var fs = require('fs');

require('fs').readFileSync('./all_possible_bitwise.json').toString().split('\n').forEach(function (number) {
	if (!number) { return; }

	var i = 0;
	var hex = '';
	while (i*32 < 256) {
		hex += ("00000000" + parseInt(number.slice(i*32, (i+1)*32), 2).toString(16)).slice(-8);
		i++;
	}

	var key = new CoinKey(new Buffer(hex, 'hex'), {private: 0xB0, public: 0x30})
	key.compressed = false

	if (key.publicAddress == "LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS")
	{
		console.log("Found LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS");
		key.compressed = false
		console.log("Private WIF: " + key.privateWif);
		key.compressed = true
		console.log("Private WIF (Compressed): " + key.privateWif);
		process.exit();
	}

	key.compressed = true

	if (key.publicAddress == "LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS")
	{
		console.log("Found LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS");
		key.compressed = false
		console.log("Private WIF: " + key.privateWif);
		key.compressed = true
		console.log("Private WIF (Compressed): " + key.privateWif);
		process.exit();
	}

	// Try the reverse
	number = number.split("").reverse().join("");

	// Calculate sha256 of string version of hex
	var i = 0;
	var hex = '';
	while (i*32 < 256) {
		hex += ("00000000" + parseInt(number.slice(i*32, (i+1)*32), 2).toString(16)).slice(-8);
		i++;
	}

	var key = new CoinKey(new Buffer(hex, 'hex'), {private: 0xB0, public: 0x30})
	key.compressed = false

	if (key.publicAddress == "LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS")
	{
		console.log("Found LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS");
		key.compressed = false
		console.log("Private WIF: " + key.privateWif);
		key.compressed = true
		console.log("Private WIF (Compressed): " + key.privateWif);
		process.exit();
	}

	key.compressed = true

	if (key.publicAddress == "LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS")
	{
		console.log("Found LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS");
		key.compressed = false
		console.log("Private WIF: " + key.privateWif);
		key.compressed = true
		console.log("Private WIF (Compressed): " + key.privateWif);
		process.exit();
	}
});
