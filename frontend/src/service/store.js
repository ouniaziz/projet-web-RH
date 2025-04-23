import {create} from "zustand/react";
import {myApi} from "./myApi";

export const useStore= create((set)=>({
    role: null,
    cin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    username: null,

    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try{
            const response = await myApi.login(username, password)
            set({
                role: response.data.role,
                username: response.data.nom,
                cin: response.data.cin,
                isAuthenticated: true,
                isLoading: false,
            });
            console.log(username)
        }
        catch(error){
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    // Logout action
    logout: async () => {
        // Clear the store state
        await myApi.logout();
        set({
            role: null,
            username: null,
            cin: null,
            isAuthenticated: false,
        });

        // You might want to add an API call to invalidate tokens on the server
        // myApi.logout();

        // Redirect to login page
        window.location.href = '/';
    },

    // Check auth status (could be used on app startup)
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            // You might need an endpoint like '/api/users/me' to verify the session
            // const response = await myApi.getCurrentUser();
            // set({ ...response.data, isAuthenticated: true });
            set({ isLoading: false });
        } catch (error) {
            set({ isAuthenticated: false, isLoading: false });
        }
    },
}))
