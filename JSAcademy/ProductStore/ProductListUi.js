function ProductListUi(parentEl) {
	this._el = parentEl;
	this._selectedItem = -1;

	this._productIdsToRows = {
	};
}

var _p = ProductListUi.prototype;

_p.addProduct = function(product) {
	var row = this._createRow(product);
	this._rowsToProductIds[product.getId()] = row;

	var self = this;
	row.addEventListener('click', function() {
		self._selectedItem = product.getId();
	});
	this._el.appendChild(row);
}

_p._createRow = function(product) {
	var el = document.createElement('tr');
	// ...
	return el;
}


_p.removeProduct = function(id) {
	var el = this._productIdsToRows[id];
	el.getParent().removeChild(el);
}