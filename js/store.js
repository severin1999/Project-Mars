//get data(food) from external file and put it in DOM
const allProducts = JSON.parse(JSON.stringify(clothes));
let productsDOM = document.getElementById('products');

const fillingDOMwithData = products => {
    for( let product of products ) {
        
        let cardProduct = document.createElement('div');
        let photoProduct = document.createElement('div');
        let nameProduct = document.createElement('h3');
        let sizesAvailable = document.createElement('div');
        let coloursAvailable = document.createElement('div');
        let priceProduct = document.createElement('h3');
        let element = document.createElement('div');
        let infoProduct = document.createElement('div');
        let priceAddProduct = document.createElement('div');
        let currency = document.createElement('div');
        let dragDropImage = document.createElement('div');

        cardProduct.className = 'card_product';
        photoProduct.innerHTML = `<img src="${product.photo}" />`;
        photoProduct.className = 'product_image';
        element.innerHTML = '<i class="fa fa-cart-plus"></i>';
        element.className = 'element';
        nameProduct.textContent = `${product.type} ${product.name}`;
        nameProduct.className = 'product_name';

        let sizes = product.sizes;
        sizes = sizes.map(size => {
            let element = document.createElement('span');
            element.textContent = size;
            sizesAvailable.appendChild(element)
        });
        sizesAvailable.className = 'product_sizes';
        let colors = product.colours;
        colors = colors.map(colour => {
            let element = document.createElement('div');
            element.style.background = colour;
            coloursAvailable.appendChild(element)
        });
        coloursAvailable.className = 'product_colours'
        currency.textContent = '$';
        currency.className = 'currency';
        priceProduct.textContent = product.price;
        priceProduct.className = 'product_price';
        infoProduct.className = 'info_product';
        priceAddProduct.className = 'price_add';
        dragDropImage.className = 'dragDropImage';

        cardProduct.appendChild(dragDropImage);
        cardProduct.appendChild(infoProduct);
        cardProduct.appendChild(priceAddProduct);

        infoProduct.appendChild(nameProduct);
        infoProduct.appendChild(sizesAvailable);
        infoProduct.appendChild(coloursAvailable);
        
        dragDropImage.appendChild(photoProduct);
        dragDropImage.appendChild(element);

        priceAddProduct.appendChild(priceProduct);
        priceAddProduct.appendChild(currency);
        productsDOM.appendChild(cardProduct);
    };
}; 

const fillingDOMwithSpecificType = () => {
    let typeofCategoriesClicked = allProducts.filter(i => i.type === event.target.id);
    fillingDOMwithData(typeofCategoriesClicked);
    selectingProductType();
    addProductToCart();
};

const sortByTypes = () => {
    removingDataFromDOM();
    fillingDOMwithSpecificType();
    selectingProductType();
    addProductToCart();
};

const removingDataFromDOM = () => {
    let first = productsDOM.firstElementChild;
    while(first) {
        first.remove();
        first = productsDOM.firstElementChild;
    };
};

const allTypes = () => {
    removingDataFromDOM();
    fillingDOMwithData(allProducts);
    selectingProductType();
    addProductToCart();
};

let toggleSwitch = true;
const sortByCharacteristic = () => {
    if(toggleSwitch === false) {
        removingDataFromDOM();
        fillingDOMwithData(allProducts);
        selectingProductType();
        addProductToCart();
        return toggleSwitch = true;
    };
    let newCollectionProducts = allProducts.filter(product => product['new_collection'] === true)
    .map(product => `${product.type} ${product.name}`);
    for(let product of [...productsDOM.children]) {
        let productName = product.querySelector('.product_name').innerHTML;
        if(newCollectionProducts.includes(productName) === false) product.remove() ;
    };
    return toggleSwitch = false;
};

const sortByPrice = () => {
    let domProducts = document.getElementsByClassName('card_product');
    domProducts = Array.prototype.slice.call(domProducts);
    event.target.value === "cheapest" ? 
        domProducts.sort((a, b) => a.querySelector('.product_price').textContent.localeCompare(b.querySelector('.product_price').textContent)) :
        domProducts.sort((a, b) => b.querySelector('.product_price').textContent.localeCompare(a.querySelector('.product_price').textContent));
    
    for(let product of domProducts) {
        let parent = product.parentNode;
        let removeProduct = parent.removeChild(product);
        parent.appendChild(removeProduct);
    }
}

const selectOneColourAndSize = (classNameElements, classNameToAddOrRemove) => {
    [...document.getElementsByClassName(`${classNameElements}`)].forEach(productElements => {
        [...productElements.children].forEach(element => {
            element.addEventListener('click', () => {
                [...productElements.children].forEach(otherElement => otherElement.classList.remove(`${classNameToAddOrRemove}`));
                element.classList.add(`${classNameToAddOrRemove}`);
            });
        });
    });
};

let totalPrice;
const putProductInCart = product => {
    let cartProduct = document.createElement('div');
    
    let image = document.createElement('div');
    let details = document.createElement('div');

    image.innerHTML = product.photo;
    let deleteProduct = document.createElement('div');
    deleteProduct.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    image.appendChild(deleteProduct);
    cartProduct.appendChild(image);
    let name = document.createElement('h3');
    name.innerHTML = product.name;
    let size = document.createElement('div');
    size.innerHTML = `Size selected : ${product.size.innerHTML}`;
    let colour = document.createElement('div');
    colour.setAttribute('style', 'display: flex; justify-content: space-around')
console.log(product.colour)

    // colour.innerHTML = product.colour;
    let price = document.createElement('div');
    price.innerHTML = `Price : ${product.price}`;
    price.classList.add('cart_product_price');
    
    product.colour.classList.add('cart_product_colour')

    let text = document.createElement('span');
    text.textContent = 'Color selected :';
    details.appendChild(name);
    details.appendChild(size);
    colour.appendChild(text);
    colour.appendChild(product.colour)
    details.appendChild(colour);
    details.appendChild(price);

    image.classList.add('cart_product_image');
    cartProduct.classList.add('cart_product');
    cartProduct.appendChild(details);
    document.getElementById('products_selected').appendChild(cartProduct);
    
    let allPrices = document.getElementsByClassName('cart_product_price');
    allPrices = [...allPrices].map(price => {
        price = price.innerHTML;
        return parseFloat(price.replace('Price : ', ''));
    });

    totalPrice = allPrices.reduce((sum, current) => sum = sum + current);
    totalPrice = Math.floor(totalPrice * 100) / 100;

    let priceToPay = document.createElement('span');
    priceToPay.innerHTML = totalPrice;

    pricePayment = document.getElementById('total_cost');
    if(pricePayment.children.length > 1) pricePayment.removeChild(pricePayment.lastElementChild);
    
    pricePayment.appendChild(priceToPay);
    eventListenerForDeleteProduct();
};

const deleteProductfromCart = () => {
    let totalPriceFromDom = document.getElementById('total_cost');

    let price = document.createElement('span');

    let productToDelete = event.path[3];
    let productPrice = productToDelete.querySelector('.cart_product_price').innerHTML;

    productPrice = parseFloat(productPrice.replace('Price : ', ''));
    let actualPrice = totalPriceFromDom.lastChild.innerHTML - productPrice;

    actualPrice = Math.floor(actualPrice * 100) / 100;
    
    document.getElementById('products_selected').removeChild(productToDelete);
    totalPriceFromDom.removeChild(totalPriceFromDom.lastChild);

    if(actualPrice < 0) actualPrice = 0;    
    price.innerHTML = actualPrice;
    totalPriceFromDom.appendChild(price);
};

const eventListenerForDeleteProduct = () => {
    [...document.getElementsByClassName('fa-trash')].forEach(icon => icon.addEventListener('click', deleteProductfromCart));
};

const selectProduct = () => {
    function productSelectedConstructor(photo, name, price, size, colour) {
        this.photo = photo,
        this.name = name,
        this.price = price,
        this.size = size,
        this.colour = colour
    };
    const getDetails = className => event.path[3].getElementsByClassName(`${className}`)[0].innerHTML;

    let photoProduct = getDetails('product_image');
    let nameProduct = getDetails('product_name');
    let priceProduct = getDetails('product_price');
    let sizeSelected = [...event.path[3].getElementsByClassName('product_sizes')[0].children].find(element => element.className === 'size_background');
    let colourSelected = [...event.path[3].getElementsByClassName('product_colours')[0].children].find(element => element.className === 'colour_border');

    if(sizeSelected === undefined || colourSelected === undefined) return alert('Please select your size and color before...');
    
    let productSelected = new productSelectedConstructor(photoProduct, nameProduct, priceProduct, sizeSelected, colourSelected);
    putProductInCart(productSelected);

};

const selectingProductType = () => {
    selectOneColourAndSize('product_sizes', 'size_background');
    selectOneColourAndSize('product_colours', 'colour_border');
};

const addProductToCart = () => {
    [...document.getElementsByClassName('fa-cart-plus')].forEach(shoppingIcon => shoppingIcon.addEventListener('click', selectProduct));
};

fillingDOMwithData(allProducts);
selectingProductType();
addProductToCart();

for( let i = 1; i < document.getElementById('store_buttons').children.length - 1; i++ ) {
    document.getElementById('store_buttons').children[i].addEventListener('click', sortByTypes);
};

document.getElementById('all_clothes').addEventListener('click', allTypes);
document.querySelector('.checkbox_input').addEventListener('click', sortByCharacteristic);
document.querySelector('.sort_price').addEventListener('change', sortByPrice);