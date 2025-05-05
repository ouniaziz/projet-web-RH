import { create } from 'zustand';
import {myApi} from "./myApi";


export const useStore= create((set)=>({
    //general
    isLoading: false,

    // Auth
    role: null,
    cin: null,
    isAuthenticated: false,
    error: null,
    username: null,

    fillUserInfo: (cin, username, role)=> set({
        isAuthenticated: true,
        cin:cin,
        role:role,
        username:username
    }),

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
