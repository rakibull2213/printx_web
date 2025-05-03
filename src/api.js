import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "https://seashell-app-m5qg5.ondigitalocean.app/api/customer",
    headers: {
        "Content-Type": "application/json",
        //token is stored in cookies
        "Authorization": `Bearer ${Cookies.get("token")}`,
    },
});

// admin API
const AdminAPI = axios.create({
    baseURL: "https://seashell-app-m5qg5.ondigitalocean.app/api/admin",
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



//products 

export const getProducts = () => API.get("/products");

//logout

export const logout = () => API.post("/logout");

export const getSettings = () => AdminAPI.get("/settings");

export const getSystemConfig = async () => {
    try {
        const response = await getSettings();
        const settings = response.data.settings;
        const systemConfig = settings.find(setting => setting.key === 'system_config');
    
        if (systemConfig && systemConfig.value) {
            return JSON.parse(systemConfig.value);
        }
        return { maintenance_mode: false, allow_guest_orders: false };
    } catch (error) {
        console.error('Failed to fetch system configuration:', error);
        return { maintenance_mode: false, allow_guest_orders: false };
    }
};

// get Print Settings

export const getPrintConfig = async () => {
    try {
        const response = await getSettings();
        const settings = response.data.settings;
        const printConfig = settings.find(setting => setting.key === 'print_settings');
        
        
        if (printConfig && printConfig.value) {
            return JSON.parse(printConfig.value);
        }
      
    } catch (error) {
        console.error('Failed to fetch system configuration:', error);
        return { maintenance_mode: true, allow_guest_orders: false };
    }
};


// single product order
//place/order 

export const placeSingleOrder = (formData) => {
    return API.post("/place/order", formData, {
        headers: {
            'Content-Type':'multipart/form-data',
        },
    });
};

export default API;
