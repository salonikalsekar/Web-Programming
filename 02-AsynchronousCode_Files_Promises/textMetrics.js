let lmn = exports = module.exports;

lmn.createMetrics = function (string) {

	if (string == undefined)
		throw "Invalid string";
	else if (string.length == 0)
		throw "insert a string";
	else if (string.constructor !== String)
		throw "insert a string";


    let totalWords = 0;
	let uniqueWords = 0;
	let longWords = 0;
	let numberOfSentences = 0;
	let wordOccurences = 0;
	let sum = 0;

	let string1 = string.match(/[a-zA-Z]/g);
    let totalLetters = string1.length;

	let string2 = string.split(" ");

	for (i = 0; i < string2.length; i++) {

		if (string3 = string2[i].match(/[a-zA-Z]/g))
			totalWords++;
	}


	for (i = 0; i < string2.length; i++) {

		if (string3 = string2[i].match(/[a-zA-Z]/g) && string2[i].match(/[a-zA-Z]/g).length > 6)
			longWords++;
	}

	for (i = 0; i < string2.length; i++) {

		if (string6 = string2[i].match(/[a-zA-Z]/g))
			sum = sum + string6.length;

	}
	let avgWordLength = sum / totalWords;

	let sentences = string.match(/[^\.!\?]+[\.!\?]+/g);
	if (sentences != null) {
		let sentenceslength = sentences.length;
	}
	else
		console.log("There are no sentences");

	let totalcomplexity = totalWords / sentences.length + longWords * 100 / totalWords;




	var mystring = string.split(" ");
	var count = mystring.length;



	for (x = 0; x < mystring.length - 1; x++) {
		string7 = mystring[x].match(/[a-zA-Z]/g);
		for (y = x + 1; y <= mystring.length - 1; y++) {
			comparestring = mystring[y].match(/[a-zA-Z]/g);

			if (string7.toString() == comparestring.toString()) {
				mystring.splice(y, 1);

			}
		}
	}

	let word = string.match(/[^_\W]+/g).join(' ');
	let word1 = word.split(" ");

	let wordOcurrences = {};

	for (let x = 0; x < word1.length; x++) {
		if (!wordOcurrences.hasOwnProperty(word1[x])) {
			wordOcurrences[word1[x]] = 1;
		}
		else {
			++wordOcurrences[word1[x]];
		}
	}



	let myObj = {
		totalLetters: totalLetters,
		totalWords: totalWords,
		uniqueWords: mystring.length,
		longWords: longWords,
		averageWordLength: avgWordLength,
		numberOfSentences: numberOfSentences,
		textComplexity: totalcomplexity,
		wordOccurences: wordOcurrences
	};



	return myObj;


}
