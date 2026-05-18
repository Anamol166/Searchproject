import { createSlice } from "@reduxjs/toolkit";

const details = createSlice({
    name: "details",
    initialState: {
        selectedItem: null,
        isOpen: false
    },
    reducers: {
        setSelectedItem(state, action) {
            state.selectedItem = action.payload
            state.isOpen = true
        },
        closeDetail(state) {
            state.selectedItem = null
            state.isOpen = false
        }
    }
})

export const { setSelectedItem, closeDetail } = details.actions
export default details.reducer
