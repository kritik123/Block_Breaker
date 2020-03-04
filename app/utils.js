var utils = function() {

};

utils.prototype = function() {
    var random = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    return {
        random: random
    };
}();