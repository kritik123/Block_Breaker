var utils = new utils();

var gameModel = function() {
    this.config = new config();
    this.blocks = [];
    this.document = undefined;
    this.playerReady = false;
    this.gameReady = false;
    this.gameOver = false;
    this.gameEnd = false;

    this.playerNotifications = new playerNotifications();

    this.beginGame = function() {

        this.inputHandler = new inputHandler();

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.scene.background = new THREE.Color(0x333333);
        this.renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
        this.document.body.appendChild(this.renderer.domElement)

        this.document.addEventListener('keydown', (event) => {
            this.onKeyDown(event);
        }, false);
        this.camera.position.set(this.config.blockSpaceWidth / 2, -20, 175);
        this.camera.up = new THREE.Vector3(0, 1, 0);

        for (var c = 0; c < this.config.columnCount; c++) {
            for (var r = 0; r < this.config.rowCount; r++) {
                this.blocks.push(new blockModel(this.config.colors[utils.random(5)], r, c));
            }
        }
        _.forEach(this.blocks, b => {
            b.init(this);
        });

        this.breaker = new breakerModel(new THREE.Vector3(this.config.blockSpaceWidth / 2, this.config.breakerStart, 0), new THREE.Vector3(0, -this.config.velocity, 0));
        this.breaker.init(this);

        this.paddle = new paddleModel(new THREE.Vector3(this.config.blockSpaceWidth / 2, this.config.paddleStart, 0), new THREE.Vector3(0, 1, 0));
        this.paddle.init(this);

        this.scoreBoard = new scoreBoard({ x: this.config.leftBound, y: ((this.config.paddleStart + this.config.railSpaceHeight)), z: 0 }, this.config.numberOfLives);
        this.scoreBoard.init(this);

        this.leftRail = new rail(this.config.railWidth, (-this.config.paddleStart) + this.config.railSpaceHeight, { x: this.config.leftBound, y: ((this.config.paddleStart + this.config.railSpaceHeight) / 2), z: 0 });
        this.rightRail = new rail(this.config.railWidth, (-this.config.paddleStart) + this.config.railSpaceHeight, { x: this.config.rightBound, y: ((this.config.paddleStart + this.config.railSpaceHeight) / 2), z: 0 });
        this.topRail = new rail(this.config.railSpaceWidth + this.config.railWidth, this.config.railWidth, { x: (this.config.railSpaceWidth - this.config.railBuffer * 2 - this.config.railWidth) / 2, y: this.config.railSpaceHeight - this.config.railBuffer, z: 0 });

        this.leftRail.init(this);
        this.rightRail.init(this);
        this.topRail.init(this);

        this.gameReady = true;
    }


};

gameModel.prototype = function() {
    var init = function(document) {
        this.document = document;
        this.beginGame()
        this.startText = this.playerNotifications.showText(this, "Click to Ready UP!", { x: window.innerWidth / 2, y: 50 }, { width: 200, height: 200 })

        this.document.body.addEventListener('mousedown', (event) => {
            if (!this.playerReady) {
                this.startText.innerHTML = "Starting...";
                setTimeout(() => {
                        this.playerReady = true;
                        this.startText.innerHTML = "";
                    },
                    1500);
            }
        }, false);


        this.renderer.setAnimationLoop(() => {
            update(this);
            render(this);
        });
    }

    var update = function(game) {
        if (game.gameOver && !game.gameEnd) {
            game.gameEnd = true;
            game.playerNotifications.showText(game, "Game Over", { x: window.innerWidth / 2, y: 50 }, { width: 200, height: 200 })
        }

        if (game.gameReady && game.playerReady && !game.gameOver) {
            game.breaker.move(game);
            game.paddle.move(game);
        }
    }

    var render = function(game) {
        if (game.gameReady) {
            game.renderer.render(game.scene, game.camera);
        }
    }

    var onKeyDown = function(event) {
        this.inputHandler.handleInput(event, this);
    }

    var moveToGameOver = function() {
        this.gameOver = true;
    }

    return {
        init: init,
        onKeyDown: onKeyDown,
        moveToGameOver: moveToGameOver
    };
}();