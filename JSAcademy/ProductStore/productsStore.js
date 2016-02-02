
function ProductsStore(products) {
	this._maxId = 0;
	this._products = [];

	this.addProduct = this.addProduct.bind(this);
	products.forEach(this.addProduct);
}

/**
 * product should not have ID, it will be generated by store
 */
ProductsStore.prototype.addProduct = function(product) {
	product.setId(this._nextId());
	this.products.push(product);
	return product;
}

ProductsStore.prototype._nextId = function() {
	return ++this._nextId;
}

/**
 * What if ID does not exist?
 */
ProductsStore.prototype.removeProduct = function(id) {
	var removeProduct = this.products.filter(function filterByID(product) {
			return product.id === id; 
		});

	var index = this.products.indexOf(removeProduct[0]);
	this.products.splice(index, 1);
}

ProductsStore.prototype.getProductByName = function(name) {
	return this.products.filter(function(product) {
		// case-insensitive
		// partial match
		return product.name === name; 
	});
}

ProductsStore.prototype.getProductById = function(id) {
	return this.products.filter(function(product) {
		return product.id === id; 
	})[0];
}

ProductsStore.prototype.getProducts = function() {
	return this.products;
}

ProductsStore.prototype.updateProduct = function(id, productInfo) {
	var product = this.getProductById(id);
	product.productNamee = productInfo.productName;
	product.imageURL = productInfo.imageURL;
	product.description = productInfo.description;
}

ProductsStore.prototype.searchProduct = function(searchContent) {
	var pattern = new RegExp(searchContent);
	return this.products.filter(function(product) {
			return pattern.test(product.productName);
	});
}
