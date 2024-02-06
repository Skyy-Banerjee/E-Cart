import { useContext, useReducer, useEffect, createContext } from "react";
import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from "./actions";
import { getTotal } from "./utils";
import cartItems from "./data";
import reducer from "./reducer";

const url = 'https://www.course-api.com/react-useReducer-cart-project';



const AppContext = createContext();

const initialSTate = {
    loading: false,
    cart: new Map()
}

export const AppProvider = ({ children }) => {
    // greeting = 'hello';

    const [state, dispatch] = useReducer(reducer, initialSTate);

    const { totalAmt, totalCost } = getTotal(state.cart);

    function clearCart() {
        dispatch({ type: CLEAR_CART })
    }

    function remove(id) {
        dispatch({ type: REMOVE, payload: { id } });
    }

    function increase(id) {
        dispatch({ type: INCREASE, payload: { id } });
    }

    function decrease(id) {
        dispatch({ type: DECREASE, payload: { id } });
    }

    const fetchData = async () => {
        dispatch({ type: LOADING });
        const resp = await fetch(url);
        const cart = await resp.json();
        dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <AppContext.Provider value={{ ...state, clearCart, remove, increase, decrease, totalAmt, totalCost }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}