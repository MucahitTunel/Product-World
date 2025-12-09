import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const saveAuthToStorage = async (state: AuthState) => {
    try {
        const { user, refreshToken } = state;
        await AsyncStorage.setItem("authState", JSON.stringify({ user, refreshToken }));
    } catch (error) {
        console.error("Error saving auth state to storage:", error);
    }
}

const loadAuthFromStorage = async (): Promise<Partial<AuthState>> => {
    try {
        const storedState = await AsyncStorage.getItem("authState");
        if (storedState) {
            return JSON.parse(storedState);
        }
    } catch (error) {
        console.error("Error loading auth state from storage:", error);
    }

    return {};
}

const clearAuthFromStorage = async () => {
    try {
        await AsyncStorage.removeItem("authState");
    } catch (error) {
        console.error("Error clearing auth state from storage:", error);
    }
}

const initialState: AuthState = {
    isLoading: false,
    isLoggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    error: null,
    ...loadAuthFromStorage(),
}

const handleAuthSuccess = (state: AuthState, payload: Partial<AuthState>) => {
    state.isLoggedIn = true;
    state.user = payload.user || state.user;
    state.accessToken = payload.accessToken || state.accessToken;
    state.refreshToken = payload.refreshToken || state.refreshToken;
    state.error = null;
    localStorage.setItem("authState", JSON.stringify(state));
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            clearAuthFromStorage();
        },
        setAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action) => {
            handleAuthSuccess(state, action.payload);
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
            saveAuthToStorage(state);
        }
    }
})

export const {
    logout,
    setAuthLoading,
    setAuthError,
    clearError,
    setCredentials,
    updateAccessToken
} = authSlice.actions;

export default authSlice.reducer;