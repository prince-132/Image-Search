import { useRef, useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const API_URL = 'https://api.unsplash.com/search/photos';

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [margin, setMargin] = useState(0); 

  const IMAGES_PER_PAGE = 15;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${pages}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_IMAGE_ACCESS_KEY}`);
        setImages(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.log('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [pages]);

  const refreshSearch = () => {
    setPages(1);
    fetchPhotos()
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${pages}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`);
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
      setMargin(96); 
    } catch (error) {
      console.log('Error fetching photos:', error);
    }
    refreshSearch();
  }

  const selectionValue = (selection) => {
    searchInput.current.value = selection;
    refreshSearch();
  }

  return (
    <div id="container" className="w-auto h-full" style={{margin: margin}}>
    <div>
      <h1 className='text-3xl p-3 flex justify-center m-2'>Image Search</h1>
      <form onSubmit={handleSearch}>
        <div className='flex justify-center'>
          <input id="input-box" className='outline-none w-80 text-lg text-black p-2' type="search" placeholder='Type here to search.......'
          ref={searchInput} />
        </div>
        <div className="flex justify-center m-2">
          <button type="submit" className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Search</button>
          <button onClick={() => selectionValue('nature')} className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Nature</button>
          <button onClick={() => selectionValue('birds')} className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Birds</button>
          <button onClick={() => selectionValue('cats')} className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Cats</button>
          <button onClick={() => selectionValue('shoes')} className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Shoes</button>
        </div>
      </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map(photo => (
          <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} className='w-60 h-48 rounded-md m-3 outline ' />
        ))}
      </div>

      <div className='flex justify-center'>
        {pages>1 && (
          <button onClick={()=> setPages(pages-1)} className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Previous</button>
        )}
        {pages<totalPages && (
          <button onClick={()=> setPages(pages+1)} className='bg-blue-500 text-white rounded-md px-2 py-1 m-2'>Next</button>
        )}
      </div>
    </div>
  )
}

export default App;
