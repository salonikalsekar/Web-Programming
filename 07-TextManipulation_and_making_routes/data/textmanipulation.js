
let exportedMethods = {
	datamanipulation(inputtext, inputString, number1, number2) {
		//console.log(inputString);
		//		console.log(inputtext);

		if (typeof inputtext !== "string") throw "String must be provided";
		if (inputtext = null) throw "Enter an input";
		if (typeof inputString !== "string") throw "String must be provided";
		if (inputString === "") throw "Enter an input";
		if (typeof number1 !== "number") throw "Number must be provided";
        if (isNaN(number1)) throw "Number must be provided";
		if (typeof number2 !== "number") throw "Number must be provided";
        if (isNaN(number2)) throw "Number must be provided";
		if (number1 < 1 || number1 > 25) throw "Number must range between 1 and 25";
		if (number2 < 1 || number2 > 25) throw "Number must range between 1 and 25";

		var count1 = 0;
		var slength = 0;
		var value = false;
	
		for (i = 0; i <= number1; i++) {

			var value1 = 0;
			var value2 = 0;

			if (count1 < number1) {

				value = true;
				if (count1 == 0) {
					slength = number2;
				} else {

					
					slength = slength + number2;
					value2 = number2 + inputString.length + 2;
					value1 = number2 * count1 + inputString.length + 2 * count1;
				}
			} else {
				break;
			}
			count1++

			if (value) {
				var data1 = inputtext.substr(0, slength).concat(inputString);
				var data2 = inputtext.slice(slength);
				slength = data1.length;
				inputtext = data1.concat(data2);
			}
		}
        return inputtext;
	},
}

module.exports = exportedMethods;