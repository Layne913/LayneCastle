

var initialBookCollection = [
	productName: 'Go Pro',
	imageURL: './res/rsz_goproBlack.jpg',
	description: 'Action Camera'
},
{
	productName: 'quadicopter',
	imageURL: './res/rsz_quadicopter.jpg',
	description: 'flight'
}];

function getAddForm() {
	return document.querySelectorAll('form.add-form');
}

function init(){

	productsTable = document.querySelector(' .productsTable');

	// fix the indexes
	addForm = forms[0];
	searchForm = forms[1];
	tableModel = {};
	addForm.addEventListener('submit', onAddProduct);
	searchForm.addEventListener('submit', onSearchProduct);

 	productsStore = new ProductsStore(initialBookCollection);
}

function onAddProduct(e) {
	e.preventDefault();
	var productInfo = getProductsInputs(addForm);

	if () {
		var product = productsStore.createProduct(productsStore.getProducts().length + 1, productInfo.productName, 
				productInfo.imageURL, productInfo.description);
		addProductToStore(product);
		addProductToPage(product);
		clearAddInputs();
	} else {
		alert('Please check product Name, imageURL, description');
	}
}

function validateProduct(product) {

	var errors = [];

	if (!isValidString(product.productName)) {
		errors.push('Product Name is not valid');
	}

	checkInputsEmpty(productInfo.productName, productInfo.imageURL, productInfo.description)
}

// Generic method
function isValidString(str) {
	return typeof str === 'string' && str.length > 0; 
}

function getImageURL(element) {
	return element.value.replace(/^C:\\fakepath\\/i, 'res/');
}

// // Generic method
// replace with DOM reset() method
function clearAddInputs() {
	Array.from(addForm.elements).forEach(function(element) {
		element.value = '';
	});
}


function getProductsInputs(form) {
	return {
		productName: getInputValueFromForm(form, 'productName'),
		imageURL: getInputValueFromForm(form, 'imageURL'),
		description: getInputValueFromForm(form, 'description')
	}
}

// Generic method
function getInputValueFromForm(form, name) {
	var element = form.elements[name];
	return (name === 'imageURL') ? getImageURL(element) : element.value;
}

function addProductToStore(productInfo) {
	productsStore.addProduct(productInfo); 
}

function addProductToPage(productInfo) {
	productsTable.appendChild(createRow(getDisplayCells, productInfo));
}

function createRow(cellsFunction, productInfo) {
	var row = document.createElement('tr');
	setRow(cellsFunction, productInfo, row);
	tableModel[productInfo.id] = row;
	return row;
}

function setRow(cellsFunction, productInfo, row) {
	cellsFunction(productInfo, row).forEach(function(cell) {
		row.appendChild(cell);
	});
}


function getDisplayCells(productInfo, row) {
	var productInfoArray = [];
	productInfoArray.push(createTextCell(productInfo.productName));
	productInfoArray.push(createImageCell(productInfo.imageURL));
	productInfoArray.push(createTextCell(productInfo.description));
	productInfoArray.push(createButtonCell('Edit', row, productInfo.id, onEdit));
	productInfoArray.push(createButtonCell('Remove',row, productInfo.id, onRemove));
	return productInfoArray;
}


function createTextCell(content) {
 	var cellElement = document.createElement('td');
	var content = document.createTextNode(content); 
	cellElement.appendChild(content);	
	return cellElement;
}

function createImageCell(url) {
	var cellElement = document.createElement('td');
	var  imgElement = document.createElement('img');
	imgElement.src = url;
	cellElement.appendChild(imgElement);
	return cellElement;
}

function createButtonCell(buttonName, row, id, onClick) {
	var cellElement = document.createElement('td');
	var button = document.createElement('button');
	button.innerHTML = buttonName;
	button.onclick = function() {
		onClick(row, id);
	}
	cellElement.appendChild(button);
	return cellElement;
}

function onEdit(row, id) {
	$(row).children().hide();
	product = productsStore.getProductById(id);
	setRow(getEditCells, product, row);
}

function getEditCells(productInfo, row) {
	var productInfoArray = [];
	productInfoArray.push(createInputCell(productInfo.productName, 'input', 'text'));
	productInfoArray.push(createInputCell(productInfo.imageURL, 'input', 'file'));
	productInfoArray.push(createInputCell(productInfo.description, 'textarea', 'text'));
	productInfoArray.push(createButtonCell('Update', row, productInfo.id, onUpdate));
	productInfoArray.push(createButtonCell('Cancel', row, productInfo.id, onCancel));
	return productInfoArray;
}

function createInputCell(value, type, inputType) {
	var cellElement = document.createElement('td');
	var  element = document.createElement(type);
	element.type = 'text';
	element.value = value;
	cellElement.appendChild(element);
	if(inputType === 'file') {
		element.readOnly = true;
		cellElement.appendChild(createFileInput(element));
	}
	return cellElement;
}

function createFileInput(element) {
	var trElement = document.createElement('tr');
	var inputElement = document.createElement('input');
	inputElement.type = 'file';
	inputElement.accept = "image/x-png, image/gif, image/jpeg, image/jpg";
	function updateImageURLInput() {
		element.value = getImageURL(this);  
	}
	inputElement.onchange = function (e) {
		updateImageURLInput.call(this);
	};
	trElement.appendChild(inputElement);
	return trElement;
}

function onUpdate(row, id) {
	updateInStore(row, id);
	updateInPage(row, id);
}

function updateInPage(row, id) {
	$(row).children().hide();
	var product = productsStore.getProductById(id);
	setRow(getDisplayCells, product, row);
}

function updateInStore(row, id) {
	productsStore.updateProduct(id, getUpdateInputs(row));
}

function getUpdateInputs(row) {
	var  updateInputs = row.querySelectorAll('input[type = "text"], textarea');
	return {
		productName: updateInputs[0].value,
		imageURL: updateInputs[1].value,
		description: updateInputs[2].value
	}
}

function onCancel(row, id) {
	updateInPage(row, id);
}

function onRemove(row, id)  {
	removeFromStore(id);
	removeFromPage(row, id);
}

function removeFromStore(id) {
	productsStore.removeProduct(id);
}

function removeFromPage(row, id) {
	row.parentNode.removeChild(row);
	delete tableModel[id];
}


function onSearchProduct(e) {
	var searchContent = getInputValueFromForm(searchForm, 'searchContent')
	var result = productsStore.searchProduct(searchContent);
	updateSearchProductsInPage(result);
	e.preventDefault();
}

function updateSearchProductsInPage(result) {
	productsStore.products.forEach( function(product) {
		var rowDisplay = tableModel[product.id].style.display;
		if (result.indexOf(product) == -1) {
			tableModel[product.id].style.display = 'none';
		}else {
			tableModel[product.id].style.display = '';
		}	
	});
}

init();
