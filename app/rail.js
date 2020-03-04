var rail = function(width, height, origin) {
    this.origin = origin
    this.width = width;
    this.height = height;
};

rail.prototype = function() {
    var init = function(game) {
        var geometry = new THREE.BoxGeometry(this.width, this.height, 0);
        var material = new THREE.MeshBasicMaterial({ color: game.config.railColor });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(this.origin.x, this.origin.y, this.origin.z);
        this.cube = cube;
        game.scene.add(cube);
    }
    return {
        init: init
    };
}();