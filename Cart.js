let carts = document.querySelectorAll('.add-cart');
let products = [
	{
		name: 'Lasagne Sheets',
		tag: 'lasagnesheets',
		price: 500,
		inCart: 0,	
	},
	{
		name: 'Papperoni Pizza',
		tag: 'papperonipizza',
		price: 100,
		inCart: 0,	
	},
	
	{
		name: 'Ribbon Sandwich',
		tag: 'ribbonsandwich',
		price: 250,
		inCart: 0,	
	},
	
	{
		name: 'Sphagetti Pasta',
		tag: 'sphagettipasta',
		price: 400,
		inCart: 0,	
	},
	
	{
		name: 'Cheese Bites Bruchetta',
		restaurant: 'cheesebitesbruchetta',
		price: 150,
		inCart: 0,	
	},
	
	{
		name: 'Berry Pancakes',
		restaurant: 'berrypancakes',
		price: 200,
		inCart: 0,	
	},
]

for( let i=0; i< carts.length; i++){
		carts[i].addEventListener('click',() =>{
		cartNumbers(products[i]);
		totalCost(products[i])
		})
}

function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	
	if(productNumbers){
		document.querySelector(' .cart1 span').textContent =  productNumbers;
	}
	
}

function cartNumbers(product){
	
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);

	if( productNumbers ){
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector(' .cart1 span').textContent = productNumbers  + 1;
	}else{
		localStorage.setItem('cartNumbers', 1);
		document.querySelector(' .cart1 span').textContent =  1;
	}
	setItems(product);
}

function setItems(product){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	console.log("My cart items are:",cartItems);
	
	if(cartItems != null){
		if(cartItems[product.tag] == undefined){
			cartItems = {
					...cartItems,
					[product.tag]: product
			}
		}
		
		
		cartItems[product.tag].inCart += 1;
	}else{
		product.inCart = 1;
		cartItems = {
				[product.tag]: product
		}
	}
	
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
	//	console.log("The Product price is:",product.price);
	
		let cartCost = localStorage.getItem('totalCost');
		console.log("My cartCost is:",cartCost);

		if(cartCost != null){
			cartCost = parseInt(cartCost);
			localStorage.setItem("totalCost",cartCost + product.price );
		}else{
			localStorage.setItem("totalCost",product.price);
		}
		
}

function displayCart(){
	
	let cartCost = localStorage.getItem('totalCost');
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	
	console.log(cartItems);
	if(cartItems && productContainer){
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item =>{
			productContainer.innerHTML +=`
			<div class="product">
			<font size="5">Food Item: </font>&emsp;<span><font size="5">${item.name}</font></span>
			<div class="price"><font size="5">Price: </font>&emsp;<font size="4">Rs.${item.price}</font></div>
			<div class="quantity"><font size="5">Quantity: </font><span><font size="4">${item.inCart}</font></span></div>
			<div class="total">
				<font size="5">Total: </font>&emsp;<font size="4">Rs.${item.inCart * item.price}</font>
			</div>
			</div>

			
			`;
		});
		
		productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<div class="basketTotalTitle"><font size="5">
				Basket Total  <br>Dilevery Charges</font>
				</div>
				<div class="basketTotal">
				<font size="5">Rs.${cartCost} + &nbsp;${60}</font></div>
				</div>
				
			
		`
	}
}
onLoadCartNumbers();
displayCart();

