(function () {
    let dmMethods = {
		datam: function (inputtext, inputString, number1, number2) {
			if (typeof inputtext !== "string") throw "Must provide a String";
			if (typeof inputString !== "string") throw "Must provide a String";
			if (typeof number1 !== "number") throw "Must provide a number";
			if (typeof number2 !== "number") throw "Must provide a number";
			if (isNaN(number2)) throw "Must provide a number";
						if (isNaN(number1)) throw "Must provide a number";

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
		}

    };

    var staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.

        var textElement = document.getElementById("text1");
        var secondTextElement = document.getElementById("string1");
        var numbElement = document.getElementById("numb1");
        var numbElement1 = document.getElementById("numb2");


        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");
				if (textElement.value == ' ') {
					throw "Main Text cannot be blank";
				}
                var firstTextValue = textElement.value;
                // Values come from inputs as strings, no matter what :(

				if (secondTextElement.value == "") {
					throw "String To Insert cannot be blank";
				}
				var secondTextValue = secondTextElement.value;

                var x = numbElement.value;
                var y = numbElement1.value;


				var numbvalue = parseInt(x);
				if (numbvalue < 1 || numbvalue > 25) {
					throw "Insert Frequency should be a value from 1 to 25";
				}
                var numbvalue1 = parseInt(y);
				if (numbvalue1 < 1 || numbvalue1 > 25) {
					throw "Number Of Characters should be a value from 1 to 25";
				}

                var result = dmMethods.datam(firstTextValue, secondTextValue, numbvalue, numbvalue1);
                resultTextElement.textContent = "The result is: " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();