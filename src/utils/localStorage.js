const STORAGE_KEYS = {
    COLLECTION: 'mediaVault_collection',
    ALBUMS: 'mediaVault_albums',
    SEARCH_QUERY: 'mediaVault_searchQuery'
}

export const saveCollectionToStorage = (items) => {
    try {
        localStorage.setItem(STORAGE_KEYS.COLLECTION, JSON.stringify(items))
    } catch (error) {
        console.error('Error saving collection to localStorage:', error)
    }
}

export const loadCollectionFromStorage = () => {
    try {
        const items = localStorage.getItem(STORAGE_KEYS.COLLECTION)
        return items ? JSON.parse(items) : []
    } catch (error) {
        console.error('Error loading collection from localStorage:', error)
        return []
    }
}

export const saveAlbumsToStorage = (albums) => {
    try {
        localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums))
    } catch (error) {
        console.error('Error saving albums to localStorage:', error)
    }
}

export const loadAlbumsFromStorage = () => {
    try {
        const albums = localStorage.getItem(STORAGE_KEYS.ALBUMS)
        return albums ? JSON.parse(albums) : []
    } catch (error) {
        console.error('Error loading albums from localStorage:', error)
        return []
    }
}

export const saveSearchQueryToStorage = (query) => {
    try {
        localStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, query)
    } catch (error) {
        console.error('Error saving search query to localStorage:', error)
    }
}

export const loadSearchQueryFromStorage = () => {
    try {
        return localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || ''
    } catch (error) {
        console.error('Error loading search query from localStorage:', error)
        return ''
    }
}

export const clearAllStorage = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
    } catch (error) {
        console.error('Error clearing localStorage:', error)
    }
}