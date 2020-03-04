var inputHandler = function() {

};

inputHandler.prototype = function() {

    var handleInput = function(e, game) {
        switch (e.which) {
            case 37:
                game.paddle.paddleSpeed = -2;
                break;
            case 39:
                game.paddle.paddleSpeed = 2;
                break;
            default:
                game.paddle.paddleSpeed = 0;
                break;
        }
    }

    var handleIntersection = function(targetObject, intersectorObject, visible) {
        if (targetObject.visible) {
            var target = new THREE.Box3().setFromObject(targetObject);
            var intersector = new THREE.Box3().setFromObject(intersectorObject);
            if (target.intersectsBox(intersector)) {
                return true;
            }
        }

        return false;
    }

    return {
        handleInput: handleInput,
        handleIntersection: handleIntersection
    };
}();