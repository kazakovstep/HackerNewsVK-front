import {createSlice} from "@reduxjs/toolkit";

interface KidsState {
    deleted: boolean[];
}

const initialState: KidsState = {
    deleted: []
}

export const kidsSlice = createSlice({
    name: 'kids',
    initialState,
    reducers: {
        isDeleted: (state: KidsState, {payload: deleted}) => {
            state.deleted.push(deleted);
        },
        clearDeleted: (state: KidsState) =>  {
            state.deleted = []
        }
    },
})

export const {actions, reducer} = kidsSlice