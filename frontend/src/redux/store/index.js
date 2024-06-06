import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PAUSE, PERSIST, REGISTER, REHYDRATE, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';

const authConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PAUSE, PERSIST, REGISTER, REHYDRATE, FLUSH],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
