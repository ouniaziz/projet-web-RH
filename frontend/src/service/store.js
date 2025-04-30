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

    // TableEns
    grades:null,
    handicaps:null,
    enseignants:null,



    getHandicaps: async()=>{
        try{
            const response = await myApi.getHandicaps()
            set({handicaps: {
                    id: response.data.id_hand,
                    handicapName: response.data.name_h,
                    handicapDesc: response.data.desc_h
                }})
        }catch(err){
            set({error:err.message})
            throw err
        }
    },


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
