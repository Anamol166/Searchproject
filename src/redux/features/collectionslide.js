import { createSlice } from "@reduxjs/toolkit";
import { saveCollectionToStorage, loadCollectionFromStorage } from "../../utils/localStorage";

const collection = createSlice({
    name: "collection",
    initialState: {
        items: loadCollectionFromStorage()
    },
    reducers: {
        setCollection(state, action) {
            if (!state.items.find(item => item.id === action.payload.id)) {
                state.items.push(action.payload)
                saveCollectionToStorage(state.items)
            }
        },
        removeCollection(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
            saveCollectionToStorage(state.items)
        },
        loadCollection(state) {
            state.items = loadCollectionFromStorage()
        }
    }
})

export const { setCollection, removeCollection, loadCollection } = collection.actions
export default collection.reducer