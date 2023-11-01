import React from "react";
import { cartreducer } from "./cartreducer";

export const Context = React.createContext();

function CartContext(props){
    // eslint-disable-next-line react/prop-types
    const {children} = props;
    const [fetchData, setFetchData] = React.useState([]);
    const [cart, setCart] = React.useState([]);

    console.log(fetchData);

    const handleAddToCart = (item) => {
    return dispatch({type:"ADD", payload:item});
    }
       
    const handleRemoveFromCart = (id) => {
        return  dispatch({type:"REMOVE", payload:id})
    }

    console.log(cart.concat(fetchData))

    const [state, dispatch] = React.useReducer(cartreducer, {
        cart:cart.concat(fetchData),
        addItem:handleAddToCart,
        removeItem:handleRemoveFromCart,
        totalCartAmount:0
    });


    React.useEffect(()=>{
        const getCartItems = () => {
            fetch('https://chezuba-task-render-server.onrender.com/cart').then((res)=>{
                if(res.ok){
                    return res.json();
                }
            }).then((response)=>{
                setFetchData(()=>[...response])
            }).catch((err)=>{
                console.log(err)
            })
        }
        getCartItems();
    },[]);

    return(
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export default CartContext