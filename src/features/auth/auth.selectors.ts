import { RootState } from "app/store";


export const userIDSelector = (state: RootState) => state.auth.profile?._id;

export const userNameSelector = (state: RootState) => state.auth.profile?.name;

export const userEmailSelector = (state: RootState) => state.auth.profile?.email;
