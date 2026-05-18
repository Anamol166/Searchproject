import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchslice'
import pagesReducer from './features/page'
import collectionReducer from './features/collectionslide'
import detailsReducer from './features/detailslide'
import albumsReducer from './features/albumslice'
export const store = configureStore({
    reducer: {
        search: searchReducer,
        page: pagesReducer,
        collection: collectionReducer,
        details: detailsReducer,
        albums: albumsReducer
    }
})