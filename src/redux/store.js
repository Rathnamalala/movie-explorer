import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Import reducers
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import uiReducer from './slices/uiSlice';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'], // Only persist auth and ui state
};

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types (required for redux-persist)
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(thunk),
  devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);