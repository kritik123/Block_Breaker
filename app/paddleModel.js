var paddleModel = function(origin) {
    this.origin = origin;
    this.paddleSpeed = 0;
};

paddleModel.prototype = function() {

    var init = function(game) {
        var outerGeometry = new THREE.BoxGeometry(game.config.paddleWidth + 1, game.config.paddleHeight + 1, 0);
        var outerMaterial = new THREE.MeshBasicMaterial({ color: game.config.paddleColorOuter });
        var outerCube = new THREE.Mesh(outerGeometry, outerMaterial);

        var geometry = new THREE.BoxGeometry(game.config.paddleWidth, game.config.paddleHeight, 0);
        var material = new THREE.MeshBasicMaterial({ color: game.config.paddleColorInner });
        var cube = new THREE.Mesh(geometry, material);

        outerCube.add(cube);

        outerCube.position.set(this.origin.x, this.origin.y, this.origin.z);

        this.cube = outerCube;
        game.scene.add(outerCube);
    }

    var move = function(game) {
        this.cube.position.x += this.paddleSpeed;

        if (this.cube.position.x - (game.config.paddleWidth / 2) < game.config.leftBound) {
            this.cube.position.x = game.config.leftBound + (game.config.paddleWidth / 2);
        }

        if (this.cube.position.x + (game.config.paddleWidth / 2) > game.config.rightBound) {
            this.cube.position.x = game.config.rightBound - (game.config.paddleWidth / 2);
        }
    }
    return {
        move: move,
        init: init
    };
}();