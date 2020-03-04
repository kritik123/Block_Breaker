var playerNotifications = function() {

};

playerNotifications.prototype = function() {

    var showText = function(game, text, position, size) {
        var element = game.document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = size.width + 'px';
        element.style.height = size.height + 'px';
        element.style.color = game.config.playerNotificationColor;
        element.innerHTML = text;
        element.style.top = position.y + 'px';
        element.style.left = position.x + 'px';
        game.document.body.appendChild(element);
        return element;
    }

    return {
        showText: showText
    };
}();