import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

// Create the auth slice with reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Thunk for login (simplified for demo purposes)
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // In a real app, you would make an API call here
    // For this demo, we're just simulating a successful login
    // with some basic validation
    
    if (credentials.username && credentials.password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (credentials.username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }
      
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Success
      dispatch(loginSuccess({
        id: 1,
        username: credentials.username,
        // Don't store passwords in state
      }));
    } else {
      throw new Error('Username and password are required');
    }
  } catch (error) {
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};