import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import userSlice from './userSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const reducers = combineReducers({
    user_rd : userSlice.reducer
});

const persistConfig = {
    key: "root" , //localstorage key
    storage,  //localstorage 
    whitelist : ['user_rd'] // reducer name (target)
};

const persistedReducer = persistReducer(persistConfig, reducers )


export default configureStore({
    reducer: { persistedReducer }
  }) 

/*
export default configureStore({
  reducer: {
    user_rd : userSlice.reducer,
    작명 : isLogin2.reducer
   }
}) 
*/