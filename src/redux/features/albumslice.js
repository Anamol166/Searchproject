import { createSlice } from "@reduxjs/toolkit";
import { saveAlbumsToStorage, loadAlbumsFromStorage } from "../../utils/localStorage";

const albums = createSlice({
    name: "albums",
    initialState: {
        albums: loadAlbumsFromStorage(),
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
            saveAlbumsToStorage(state.albums)
            return state
        },
        deleteAlbum(state, action) {
            state.albums = state.albums.filter(album => album.id !== action.payload)
            saveAlbumsToStorage(state.albums)
        },
        addItemToAlbum(state, action) {
            const { albumId, item } = action.payload
            const album = state.albums.find(a => a.id === albumId)
            if (album && !album.items.find(i => i.id === item.id)) {
                album.items.push(item)
                saveAlbumsToStorage(state.albums)
            }
        },
        removeItemFromAlbum(state, action) {
            const { albumId, itemId } = action.payload
            const album = state.albums.find(a => a.id === albumId)
            if (album) {
                album.items = album.items.filter(i => i.id !== itemId)
                saveAlbumsToStorage(state.albums)
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
                saveAlbumsToStorage(state.albums)
            }
        },
        loadAlbums(state) {
            state.albums = loadAlbumsFromStorage()
        }
    }
})

export const { 
    createAlbum, 
    deleteAlbum, 
    addItemToAlbum, 
    removeItemFromAlbum, 
    setSelectedAlbum,
    renameAlbum,
    loadAlbums
} = albums.actions
export default albums.reducer
