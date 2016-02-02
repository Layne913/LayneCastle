
function Product(name, imageURL, description) {
	this._id = -1;
	this._name = name;
	this._imageURL = imageURL;
	this._description = description;
}

Product.prototype.getId = function() {
	return this._id;
}

Product.prototype.setId = function(id) {
	this._id = id;
}

Product.prototype.getName = function() {
	return this._name;
}

Product.prototype.setName = function(newValue) {
	if (typeof newValue !== 'string' || newValue.length < 1) {
		throw Error('name should be a non-empty string');
	}

	this._name = newValue;
};

/* Rest of the methods */

Product.prototype.setImageUrl = function(newValue) {
	if (isNonEmptyString(newValue)) {
		this._name = newValue;	
	} else {
		throw Erorr('Image URL should be non empty string');
	}
};

function isNonEmptyString(str) {
	return typeof str === 'string' && str.length > 0;
}
