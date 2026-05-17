import { useDispatch, useSelector } from 'react-redux'
import { default_GIF, default_photo, default_video, GIF_sender, Photo_sender, Video_sender } from '../api/media'
import { useEffect } from 'react'
import { setError, setLoader, setResults } from '../redux/features/searchslice'
import ResultCard from './ResultCard'

const ResultGrid = () => {
  const { query, actionTab, results, loading, error } = useSelector((store) => (store.search))
  const dispatch = useDispatch()

  const result = async () => {
    let Data = [];
    try {
      dispatch(setLoader(true))
      if (actionTab == 'Photos') {
        if (!query?.trim()) {
          const response = await default_photo()
          Data = response.map((item) => ({
            id: item.id,
            type: 'image',
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full
          }))
        }
        else {
          const response = await Photo_sender(query)
          Data = response.results.map((item) => ({
            id: item.id,
            type: 'image',
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full
          }))
        }
      }
      else if (actionTab == 'Videos') {
        if (!query?.trim()) {
          const response = await default_video()
          Data = response.videos.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.user.name || 'video',
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url
          }))
        }
        else {
          const response = await Video_sender(query)
          Data = response.videos.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.user.name || 'video',
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url
          }))
        }
      }
      else if (actionTab == 'GIF') {
        if (!query?.trim()) {
          const response = await default_GIF()
          Data = response.data.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            thumbnail: item.images.fixed_width.url,
            src: item.images.original.url
          }))
        }
        else {
          const response = await GIF_sender(query)
          Data = response.data.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            thumbnail: item.images.fixed_width.url,
            src: item.images.original.url
          }))
        }
      }
    } catch (error) {
      dispatch(setError(error))
    }
    dispatch(setLoader(false))
    dispatch(setResults(Data))
  }

  useEffect(function () {
    result()
  }, [query, actionTab])

  if (error) return <h1>error</h1>

  if (loading) return <div className="loader-container">
    <div className="loader"></div>
  </div>

  return (
    <div className='flex flex-row gap-6 flex-wrap justify-center items-center overflow-auto p-5'>
      {results.map((item, index) => {
        return (
          <div key={index}>
            <ResultCard item={item} />
          </div>
        )
      })}
    </div>
  )
}

export default ResultGrid
