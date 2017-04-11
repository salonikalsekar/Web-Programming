// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function ($, localStorage) {

    var localStorageTableBody = $("#localstorage-data tbody");
    var clearStorage = $("#clear-storage");

    var keyNameInput = "Latest input";
    var keyValueInput = $("#localstorage-value");
    var kvpForm = $("#localstorage-form");
    var formAlert = $("#form-alert");

    var count = 0;
    var nameOfTheCounter = "Counter";
    var hashinput = "Hash";

    function resetTable() {
        localStorageTableBody.empty();

        // We use the localStorage.key(number) property to get the key name at index number
        for (var i = 0; i < localStorage.length; i++) {
            var currentKey = localStorage.key(i);
            var currentValue = localStorage[currentKey];

            var newHtmlString = "<tr><td>" + currentKey + "</td><td>" + currentValue + "</td></tr>"
            localStorageTableBody.append(newHtmlString);
        }
    }

    clearStorage.click(function () {
        localStorage.clear();
        resetTable();
    });

    window.onload = function (e) {

        var currentIterations = 0;
        var intervalResult = "Interval";

        var intervalId = window.setInterval(function () {
            var iteration = ++currentIterations;
        
            localStorage[intervalResult] = iteration;
            resetTable();

        }, 1500);
    }

 $(window).on('hashchange', function() {
    localStorage[hashinput] = window.location.hash.replace("#","");
            resetTable();


 });

    kvpForm.submit(function (event) {
        event.preventDefault();


        // reset the form
        formAlert.addClass('hidden');
        formAlert.text('');

        var keyStr = keyNameInput;
        var valStr = keyValueInput.val();
        // check if it's in the format of an object
        var jsonString = valStr;

        try {
            // this will throw when given a non JSON string
            JSON.parse(valStr);
            // if this succeeded, the user passed us something we could parse, and we don't have to encode it further
        } catch (e) {
            // this did not succeed, which means that the user passed us some sort of string
            jsonString = JSON.stringify(valStr);
        }
        location.hash ='some-hash';
        
        localStorage[keyStr] = jsonString;

        keyValueInput.val('');

        count++;

        localStorage[nameOfTheCounter] = count;
  
    });
  

    // Now we setup our table
    resetTable();

})(jQuery, window.localStorage);
// jQuery is exported as $ and jQuery
// the location API is accessed via the window.location variable
