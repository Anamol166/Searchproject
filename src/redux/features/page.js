import { createSlice } from "@reduxjs/toolkit";

const pages = createSlice({
    name: "page",
    initialState: {
        page: 1
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        }
    }
})

export const { setPage } = pages.actions
export default pages.reducer