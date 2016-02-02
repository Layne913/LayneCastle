
function ProductsStore(products) {
	this.products =  products;
}

ProductsStore.prototype.createProduct = function(id, productName, imageURL, description) {
	return {
		id: id,
		productName: productName,
		imageURL: imageURL,
		description: description
	}
}

ProductsStore.prototype.addProduct = function(product) {
	this.products.push(product);
}

ProductsStore.prototype.removeProduct = function(id) {
	var removeProduct = this.products.filter(function filterByID(product) {
			return product.id === id; 
		});		 
		var index = this.products.indexOf(removeProduct[0]);
		this.products.splice(index, 1);
}

ProductsStore.prototype.getProductByName = function(name) {
	return this.products.filter(function(product) {
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
