import React , {useState,useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';


export default function Details() {

  let [searchParams , setsearchParams] = useSearchParams();
  let currentSearchId = searchParams.get('id');

  let [Details , setDetails] = useState({});
  let Genres = [Details.genres];

  
  let baseImageUrl = 'https://image.tmdb.org/t/p/original/';


  async function getItemDetails(mediaType){
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${currentSearchId}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`);
    setDetails(data);
  }

  useEffect(()=>{
    getItemDetails('movie')
  }
    ,[])

  return (
    <>
    <div className="row py-5">
      <div className="col-md-4">
        <img className='w-100 py-5' src={baseImageUrl+Details.poster_path} alt="" />
      </div>
      <div className="col-md-8">
        <div className="content py-5">
          <h2 className='py-3 px-2'>{Details.title}</h2>
          <h2 className='h4 text-muted'>{Details.tagline}</h2>
          {/* {Genres.map((genre,index)=> 
            <div key={index} className='alert alert-info'>{genre}</div>
          )} */}
          <h5 className="py-5">Vote: {Details.vote_average}</h5>
          <h5 className="py-3">Vote Count: {Details.vote_count}</h5>
          <h5 className="py-3">Popularity: {Details.popularity}</h5>
          <h5 className="py-3">Release Date: {Details.release_date}</h5>
          <h2 className='h4 py-5 text-muted'>{Details.overview}</h2>
        </div>
      </div>
    </div>
    </>
  )
}
