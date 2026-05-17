import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PIXEL_KEY = import.meta.env.VITE_PIXEL_KEY
const GIF_KEY = import.meta.env.VITE_GIF_KEY

export async function Photo_sender(query, page = 1, per_page = 20) {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
            query,
            page,
            per_page
        },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    return response.data;
}

export async function default_photo(page = 1, per_page = 20) {
    const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
            page,
            per_page
        },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    return response.data
}

export async function Video_sender(query, page = 1, per_page = 20) {
    const response = await axios.get('https://api.pexels.com/v1/videos/search', {
        params: {
            query,
            page,
            per_page
        },
        headers: { Authorization: `${PIXEL_KEY}` }
    })
    return response.data;
}

export async function default_video(page = 1, per_page = 20) {
    const response = await axios.get('https://api.pexels.com/v1/videos/popular', {
        params: {
            page,
            per_page
        },
        headers: { Authorization: `${PIXEL_KEY}` }
    })
    return response.data;
}

export async function GIF_sender(q, page = 1, limit = 20) {
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
        params: {
            api_key: GIF_KEY,
            q,
            page,
            limit
        }
    })
    return response.data;
}

export async function default_GIF(page = 1, limit = 20) {
    const response = await axios.get('http://api.giphy.com/v1/gifs/trending', {
        params: {
            api_key: GIF_KEY,
            page,
            limit
        }
    })
    return response.data
}