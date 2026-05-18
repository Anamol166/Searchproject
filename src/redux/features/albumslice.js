import { createSlice } from "@reduxjs/toolkit";

const albums = createSlice({
    name: "albums",
    initialState: {
        albums: [],
        selectedAlbum: null
    },
    reducers: {
        createAlbum(state, action) {
            const newAlbum = {
                id: Date.now(),
                name: action.payload,
                items: [],
                createdAt: new Date().toISOString()
            }
            state.albums.push(newAlbum)
            return state
        },
        deleteAlbum(state, action) {
            state.albums = state.albums.filter(album => album.id !== action.payload)
        },
        addItemToAlbum(state, action) {
            const { albumId, item } = action.payload
            const album = state.albums.find(a => a.id === albumId)
            if (album && !album.items.find(i => i.id === item.id)) {
                album.items.push(item)
            }
        },
        removeItemFromAlbum(state, action) {
            const { albumId, itemId } = action.payload
            const album = state.albums.find(a => a.id === albumId)
            if (album) {
                album.items = album.items.filter(i => i.id !== itemId)
            }
        },
        setSelectedAlbum(state, action) {
            state.selectedAlbum = action.payload
        },
        renameAlbum(state, action) {
            const { albumId, name } = action.payload
            const album = state.albums.find(a => a.id === albumId)
            if (album) {
                album.name = name
            }
        }
    }
})

export const { 
    createAlbum, 
    deleteAlbum, 
    addItemToAlbum, 
    removeItemFromAlbum, 
    setSelectedAlbum,
    renameAlbum
} = albums.actions
export default albums.reducer
