import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './theme/themeSlice';
import tokenReducer, { TokenState } from './auth/tokenSlice';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the state shape
interface RootState {
  theme: ThemeState;
  tokenReducer: TokenState;
}

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  tokenReducer: tokenReducer,
});

// Persist config with RootState
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);

// Type for RootState
export type { RootState };
