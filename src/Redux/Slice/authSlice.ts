import { User } from "@/model/UserModel";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthState {
    user: User | null;
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    users: [],
    loading: false,
    error: null,
};

// Thunk: Get Profile
export const getProfile = createAsyncThunk<{ user: User }, void, { rejectValue: string }>(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const responsePromise = axios.get<{ user: User }>("/api/get-user-profile");

           

            const res = await responsePromise;
            return res.data; // { user: User }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "auth/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ users: User[] }>("/api/get-all-users");
            return response.data.users;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getProfile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // ✅ matches type
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load profile";
            })

            // getAllUsers
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load users";
            });
    },
});

export default authSlice.reducer;
