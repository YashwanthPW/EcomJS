import { products } from "./db/product.js";
import { createProductCard } from "./createProductCard.js";
import { findProductInCart } from "./utils/findProductInCart.js";

const productContainer = document.getElementById("products");
const filterContainer = document.querySelector(".side-bar");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

productContainer.addEventListener("click",(event)=>{
 const isProductInCart = findProductInCart(cart,event.target.dataset.id);
  if(!isProductInCart){
    const productToAddTOCart = products.filter(({_id})=> _id === event.target.dataset.id);
    cart = [...cart,...productToAddTOCart];
    localStorage.setItem("cart",JSON.stringify(cart));
    const cartButton = event.target;
    cartButton.innerHTML = "GO To Cart <span class='material-icons-outlined'>shopping_cart</span"
  }else{
    location.href ="cart.html";
  }
});

filterContainer.addEventListener("click",(event) =>{
  const updatedProducts = products.filter(({rating}) => rating >= Number(event.target.dataset.rating));
  productContainer.innerHTML = "";
  createProductCard(
    updatedProducts,
    productContainer,
    findProductInCart,
    "products"
  );
})

function sortProductsByPrice(order) {
  if (order === "highToLow") {
      products.sort((a, b) => b.newPrice - a.newPrice);
  } else if (order === "lowToHigh") {
      products.sort((a, b) => a.newPrice - b.newPrice);
  }

  createProductCard(products, productContainer, findProductInCart, "products");
}

filterContainer.addEventListener("click", (event) => {
  if (event.target.type === "radio") {
      const sortType = event.target.value;
      sortProductsByPrice(sortType);
  }
});

// Initialize the product listing with the default order (High to Low)
sortProductsByPrice("highToLow");
createProductCard(products,productContainer,findProductInCart,"products");

