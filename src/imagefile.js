Molecule.module('Molecule.ImageFile', function (require, p) {

    var Sprite = require('Molecule.Sprite');

	function ImageFile(_game) {
		this.game = _game;
		this.name = [];
		this.data = [];
		this.counter = 0;
	};

	ImageFile.prototype.preload = function(_imageSrc) {
		var _name = _imageSrc.substring(0, _imageSrc.length - 4);
		if(!this.getImageDataByName(_name)) {
			var self = this;
			var _image = new Image();
			_image.addEventListener('load', function(){self.counter++});
			_image.src = _imageSrc;
			this.name.push(_name);
			this.data.push(_image);
		}

		return this.getImageDataByName(_name);
	};

    // Load up a new sprite
    // TODO: Make it just load up the new image, the sprites are created later
	ImageFile.prototype.load = function(_id, _imageSrc, _width, _height) {
		var s = new Sprite(_id, _imageSrc, _width, _height);
		s.game = this.game;
        s._MoleculeType = _id;
		s.image = this.preload(_imageSrc);
		if(this.isLoaded())
			s.getAnimation();
        this.game.sprites[_id] = s;
		return s;
	};

	ImageFile.prototype.reset = function() {
		this.game.scene.sprites = [];
	};
	
	ImageFile.prototype.isLoaded = function() {
		if(this.counter === this.data.length) {
			return true;
		}
		return false;
	};

	ImageFile.prototype.getImageDataByName = function(_imageName) {
		return this.data[this.name.indexOf(_imageName)];
	};

	return ImageFile;

});