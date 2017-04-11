
//function 1: sumOFSquares

function sumOfSquares(num1, num2, num3) {
    if ((num1) == null || (num2) == null || (num3) == null)
        throw "Insert an input";
    else if (isNaN(num1) || isNaN(num2) || isNaN(num3))
        throw "Wrong input. Input should be numerical.";
    else {
        let a = Math.pow(num1, 2);
        let b = Math.pow(num2, 2);
        let c = Math.pow(num3, 2);
        let sum = a + b + c;
        return sum;
    }
}



//function 2:sayHelloTo


function sayHelloTo(firstName, lastName, title) {
    if(firstName.constructor===String || lastName.constructor===String || title.constructor===String)
    {
    if (firstName != null || lastName != null || title != null) {
        if (lastName == undefined && title == undefined)
            console.log(`Hello, ${firstName}!`);

        else if (title == undefined)
            console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);

        else {
            console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
        }
    }
    else
        throw "Insert an input";
    }else
    throw "Input should be a string";
}


//Function 3: coffeeSong



function cupsOfCoffee(howManyCups) {

    let string = "";
    let i = howManyCups;
    if (i == null)
        throw "Insert an input";

    if (isNaN(i) || i <= 0)
        throw "Invalid input. Number should be greater than zero.";
    else {
        while (i > 0) {
            if (i > 2) {
                let string1 = `\n\n${i} cups of coffee on the desk! ${i} cups of coffee! \nPick one up, drink the cup, ${i - 1} cups of coffee on the desk!`
                i--;
                string = `${string}${string1}`;
            }
            else if (i == 2) {
                let string3 = `\n2 cups of coffee on the desk! 2 cups of coffee! \nPick one up, drink the cup, 1 cup of coffee on the desk!\n`;
                i--;
                string = `${string}\n${string3}`;
            }
                else if (i == 1) {
                let string4 = `1 cup of coffee on the desk! 1 cup of coffee! \nPick it up, drink the cup, no more coffee left on the desk!\n`
                i--;
                string = `${string}\n${string4}`;
            }
        }
        return string;

    }
}


//Function 4: numberOfOccurences

function occurencesOfSubstring(fullString, substring) {
    let count = 0;

    let length = fullString.length;
    let substringLength = substring.length;

    if(fullString.constructor!=String || substring.constructor!=String)
    throw "Insert a string";

    if (length == 0 || substringLength == 0)
        throw "Insert an input";

    else if (substringLength > 1) {

        for (i = 0; i <= length; i++) {
            let c = 0;
            let j = i + 1;
            let k = 1;
            while (j <= i + substringLength - 1 && k <= i + substringLength - 1) {
                if (fullString[i] == substring[0] && fullString[j] == substring[k])
                    c++;
                j++;
                k++;
            }
            if (c == substringLength - 1)
                count++;
        }
        return count;
    }
    else {
        for (i = 0; i <= length; i++) {
            if (fullString[i] == substring)
                count++;
        }
        return count;
    }
}

//Function 5: randomizeSentences

function randomizeSentences(paragraph) {
    var para1 = paragraph.match(/[^\.!\?]+[\.!\?]+/g);
    var paralength = para1.length;

    if (paralength == 0 || paralength == 1|| paragraph.constructor!= String)
        throw "Insert a sentence";
    else {
        for (i = 0; i < paralength / 2; i++) {

            var value1 = Math.floor(Math.random(Date.now()) * 100) % paralength;
            var value2 = Math.floor(Math.random(Date.now()) * 100) % paralength;

            var temporary = para1[value1];
            para1[value1] = para1[value2];
            para1[value2] = temporary;

        }

        var string1 = "";
        for (i = 0; i < paralength; i++)
            string1 = string1 + para1[i];
        console.log(string1);
    }
}


let sum1 = sumOfSquares(5, 3, 10);
console.log(`sumOfSquares: ${sum1}`);
console.log("------------------------------------------------------------");
sayHelloTo("Phil");
sayHelloTo("Phil", "Barresi");
sayHelloTo("Phil", "Barresi", "Mr.");
console.log("------------------------------------------------------------");
let song = cupsOfCoffee(5);
console.log(song);
console.log("------------------------------------------------------------");
let occurence = occurencesOfSubstring("helllllllo class", "ll");
console.log(`Occurences of substring: ${occurence}`);
console.log("------------------------------------------------------------");
var paragraph = " Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
randomizeSentences(paragraph);
