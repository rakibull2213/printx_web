import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "https://printx.geniieshop.com/api/customer",
    headers: {
        "Content-Type": "application/json",
        //token is stored in cookies
        "Authorization": `Bearer ${Cookies.get("token")}`,
    },
});


// Add this with your other exports
export const register = (userData) => API.post("/register", userData);
export const login = (login, password) => API.post("/login", { login, password });

export const getUsers = () => API.get("/profile");

export  const  getOrders = () => API.get("/orders");

export const PlaceOrders = (formData) => {
    return API.post("/place/order", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
//orders/9/cancel

export const cancelOrder = (id) => API.post(`/orders/${id}/cancel`);



//coupons 

export const getCoupons = () => API.get("/coupons");

//logout

export const logout = () => API.post("/logout");

export default API;
