import { createProductCard } from "./createProductCard.js";
import { createHorizantalProductCard } from "./createHorizantalProductCard.js";
import { findProductInCart } from "./utils/findProductInCart.js";

let cartContainer = document.getElementById("cart");

let cart = JSON.parse(localStorage.getItem("cart"))  || [];
console.log(cart);

cartContainer.addEventListener("click",(event) =>{
    cart = cart.filter(({_id}) => _id !== event.target.dataset.id);
    cartContainer.innerHTML = ""
    createHorizantalProductCard(cart,cartContainer,findProductInCart,"cart");
    localStorage.setItem("cart",JSON.stringify(cart));
})

// createProductCard(cart,cartContainer,findProductInCart,"cart");
const cartLength =  document.querySelector(".item-count");
cartLength.innerText = JSON.parse(localStorage.getItem("cart")).length;

const productPrice = document.querySelector(".product-price");
const priceAfterDiscount = JSON.parse(localStorage.getItem("cart")).reduce((acc,cur)=>acc+cur.newPrice, 0);
productPrice.innerText = priceAfterDiscount; 

const discount = document.querySelectorAll(".discounted-amount");

const priceBeforeDiscount =JSON.parse(localStorage.getItem("cart")).reduce((acc,cur)=> acc + cur.oldPrice, 0);

const discountedAmount = priceBeforeDiscount - priceAfterDiscount;

for(let element of discount)
{
    element.innerText = discountedAmount;
}

const totalAmount = document.querySelector(".total-amount");
totalAmount.innerText = priceAfterDiscount -    discountedAmount + 100;

createHorizantalProductCard(cart,cartContainer,findProductInCart,"cart");

