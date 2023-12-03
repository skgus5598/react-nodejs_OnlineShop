import { createSlice } from "@reduxjs/toolkit";

let user_rd = createSlice({ // same as state
    name :  'user_rd',
    initialState : {
        loginCheck : false, 
        userId : null,
        userNo : '',
        userRegion : '',
        userArea : '',
    },
    reducers : {
        setUser : (state, action) => {
            state.loginCheck = true;
            state.userId = action.payload.userId;
            state.userNo = action.payload.userNo;
            state.userRegion = action.payload.userRegion;
            state.userArea = action.payload.userArea;
        },
        clearUser : (state) => {
            state.loginCheck = false;
            state.userId = '';
            state.userNo = '';
            state.userRegion = '';
            state.userArea = '';
        }

    }

});

/*
let isLogin2 = createSlice({ // test
    name :  'test',
    initialState : [11,12,13]
})
*/

//함수 쓰려면
export let { setUser, clearUser } = user_rd.actions;

export default user_rd;