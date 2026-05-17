import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
    name: 'search',
    initialState: {
        query: '',
        actionTab: 'Photos',
        results: [],
        loading: false,
        error: null
    },
    reducers: {
        setLoader(state, action) {
            state.loading = true
            state.error = null
        },
        setQuery(state, action) {
            state.query = action.payload
        },
        setActiveTabs(state, action) {
            state.actionTab = action.payload
        },
        setResults(state, action) {
            state.results = action.payload
            state.loading = false
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false
        },
        clearResults(state) {
            state.results = []
        }
    }
})

export const {
    setLoader,
    setQuery,
    setActiveTabs,
    setResults, setError,
    clearResults 
} = search.actions
export default search.reducer;