import { createSlice } from "@reduxjs/toolkit";

const collection = createSlice({
    name: "collection",
    initialState: {
        items: []
    },
    reducers: {
        setCollection(state, action) {
            state.items = action.payload
        }
    }
})

export const { setCollection } = collection.actions
export default collection.reducer