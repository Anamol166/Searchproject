import { createSlice } from "@reduxjs/toolkit";

const collection = createSlice({
    name: "collection",
    initialState: {
        items: []
    },
    reducers: {
        setCollection(state, action) {
            state.items.push(action.payload)
        },
        removeCollection(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        }
    }
})

export const { setCollection, removeCollection } = collection.actions
export default collection.reducer