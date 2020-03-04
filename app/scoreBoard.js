var scoreBoard = function(origin, numberOfLives) {
    this.origin = origin;
    this.numberOfLives = numberOfLives;
    this.score = 0;
    this.lives3d = [];
};

scoreBoard.prototype = function() {
    var logHit = function() {
        this.score += 100;
        this.scoreText.innerHTML = this.score.toString();
    }

    var logLoss = function(game) {
        this.numberOfLives -= 1;
        if (this.numberOfLives < 0) {
            game.moveToGameOver();
        } else {
            this.lives3d[this.numberOfLives].visible = false;
        }
    }

    var initLives = function(i, game) {
        var outerGeometry = new THREE.BoxGeometry(game.config.breakerWidth + 1, game.config.breakerHeight + 1, 0);
        var outerMaterial = new THREE.MeshBasicMaterial({ color: game.config.breakerColorOuter });
        var outerCube = new THREE.Mesh(outerGeometry, outerMaterial);

        var geometry = new THREE.BoxGeometry(game.config.breakerWidth, game.config.breakerHeight, 0);
        var material = new THREE.MeshBasicMaterial({ color: game.config.breakerColorInner });
        var cube = new THREE.Mesh(geometry, material);

        outerCube.add(cube);

        outerCube.position.set((game.config.railSpaceWidth - 20) - (game.config.breakerWidth + (10 * i)), game.config.railSpaceHeight - 5, 0);
        game.scene.add(outerCube);

        return outerCube
    }

    var init = function(game) {
        this.scoreText = game.document.createElement('div');
        this.scoreText.style.position = 'absolute';
        this.scoreText.style.width = 100;
        this.scoreText.style.height = 100;
        this.scoreText.style.color = '#FFFFFF';
        this.scoreText.innerHTML = this.score.toString();
        this.scoreText.style.top = 60 + 'px';
        this.scoreText.style.left = 250 + 'px';
        game.document.body.appendChild(this.scoreText);

        for (var i = 0; i < this.numberOfLives; i++) {
            this.lives3d.push(initLives(i, game));
        }
    }



    return {
        init: init,
        logHit: logHit,
        logLoss: logLoss
    };
}();