var blockModel = function(color, row, column) {
    this.enabled = true;
    this.hexColor = color;
    this.column = column
    this.row = row;
};

blockModel.prototype = function() {

    var init = function(game) {
        var outerGeometry = new THREE.BoxGeometry(game.config.blockWidth, game.config.blockHeight, 0);
        var outerMaterial = new THREE.MeshBasicMaterial({ color: game.config.blockHightlight });
        var outerCube = new THREE.Mesh(outerGeometry, outerMaterial);

        var geometry = new THREE.BoxGeometry(game.config.blockWidth - 1, game.config.blockHeight - 1, 0);
        var material = new THREE.MeshBasicMaterial({ color: this.hexColor });
        var cube = new THREE.Mesh(geometry, material);

        outerCube.add(cube);

        outerCube.position.set((this.column * game.config.blockWidth) + (this.column * game.config.blockBuffer), (this.row * game.config.blockHeight) + (this.row * game.config.blockBuffer), 0);
        this.cube = outerCube;
        game.scene.add(outerCube);
    }

    return {
        init: init
    };
}();