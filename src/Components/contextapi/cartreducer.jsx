
const updateCartData = (data) => {
  fetch('https://chezuba-task-render-server.onrender.com/cart', {
      method:"POST",
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
  }).then((res)=>{
      console.log(res)
  }).catch((err)=>{
      console.log(err)
  })
}

const deleteCartData = (id) => {
  fetch(`https://chezuba-task-render-server.onrender.com/cart/${id}`, {
      method:"DELETE"
  }).then((response)=>{
    return response.json();
  }).then((res)=>{
    console.log(res)
}).catch((err)=>{
      console.log(err)
  })
}

export const cartreducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount =
          state.totalCartAmount + action.payload.price * action.payload.qnty;
    
        const existingCartItemIndex = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        const existingCartItem = state.cart[existingCartItemIndex];
        let updatedItems;
    
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            qnty: existingCartItem.qnty + action.payload.qnty,
            price: existingCartItem.price + action.payload.price
          };
          updatedItems = [...state.cart];
          updatedItems[existingCartItemIndex] = updatedItem;
          updateCartData(updatedItem);
        } else {
          updatedItems = state.cart.concat(action.payload);
          updateCartData(action.payload);
        }
    
        return {
          ...state,
          cart: updatedItems,
          totalCartAmount: updatedTotalAmount,
        };
      }
            
      if (action.type === 'REMOVE') {
          const existingCartItemIndex = state.cart.findIndex(
            (item) => item.id === action.payload);

          const existingItem = state.cart[existingCartItemIndex];
          const updatedTotalAmount = state.totalCartAmount - existingItem.price;
          let updatedItems;
          if (existingItem.qnty === 1) {
            updatedItems = state.cart.filter(item => item.id !== action.payload);
          } else {
            const updatedItem = { ...existingItem, qnty: existingItem.qnty - 1 };
            updatedItems = [...state.cart];
            updatedItems[existingCartItemIndex] = updatedItem;
            deleteCartData(action.payload);
          }
      
          return {
            ...state,  
            cart: updatedItems,
            totalCartAmount: updatedTotalAmount
          };
        }
}