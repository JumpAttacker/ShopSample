import {createSlice, Draft} from "@reduxjs/toolkit";

export interface IUserData {
    profile: {
        name: string;
    }
    access_token: string;
}

export const userDataSlice = createSlice({
    name: "userData",
    initialState: {} as IUserData | undefined,
    reducers: {
        saveUser: (state: IUserData | any, action) => {
            console.log('saveUser',action.payload)
            state = action.payload;
            return state;
        },
        clearUser: (state: any) => {
            console.log('clearUser')
            state = undefined;
            return state;
        },

    },
});

export const {saveUser, clearUser} = userDataSlice.actions;

export const userData = (state: Draft<any>) => state.userData;

export default userDataSlice.reducer;