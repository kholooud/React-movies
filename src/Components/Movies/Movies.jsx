import React , {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './Movies.module.css';
import {useNavigate} from 'react-router-dom';



export default function Movies() {
  let [trendingMovies,settrendingMovies] = useState([]);
  let baseImageUrl = 'https://image.tmdb.org/t/p/original/';


  async function getTrendingItems(mediaType, callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    callback(data.results);
  }


  useEffect(()=>{
  getTrendingItems('movie' ,settrendingMovies);
}
  ,[])

  let navigate = useNavigate();

  function goToDetails(id){
    navigate({
      pathname: '/Details',
      search: `?id=${id}`,
    })
  }
  return (
    <>
    <div className="row">
      <div className="col-md-4">
        <div className="welcome">
          <div className={`${styles.border} my-4 w-25`}></div>
          <h2>Trending</h2>
          <h2>Movies</h2>
          <h2>To Watch Now</h2>
          <p className='text-muted'>Most Watched Movies By Days</p>
          <div className={`${styles.border} my-4 w-75`}></div>
        </div>
      </div>
      {trendingMovies.map((movie)=>
      <div onClick={()=>goToDetails(movie.id)} key={movie.id} className="col-md-2 my-2">
        <div className="movie">
          <img className='w-100 mb-2' src={baseImageUrl+movie.poster_path} alt="" />
          <h2 className='h6'>{movie.title}</h2>
        </div>
      </div>
      )}
    </div>
  </>
  )
}
