export const findProductInCart = (cart,proId)=>{
    const isProductInCart =  cart && cart.length > 0 && cart.some(({_id})=>_id === proId);
    return isProductInCart;
};
