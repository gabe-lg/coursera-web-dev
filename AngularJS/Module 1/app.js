(function () {
    "use strict";

    angular.module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController);

    LunchCheckController.$inject = ["$scope"];

    function LunchCheckController(s) {
        s.userInput = "";
        s.onClick = function () {
            var inputs = s.userInput.split(",");
            if (s.userInput == "") {
                s.msg = "Please enter data first";
            } else {
                s.msg = inputs.length > 3 ? "Too much!" : "Enjoy!";
            }
        };
    }
})();