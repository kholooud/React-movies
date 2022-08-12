import React , { createContext,useState,useEffect } from "react";
import axios from 'axios';

export let trendingContext = createContext(0);

export default function TrendingContextProvider (props){
    let [trendingMovies,settrendingMovies] = useState([]);
    let [trendingTvShows,settrendingTvShows] = useState([]);
    let [trendingPeople,settrendingPeople] = useState([]);
    let baseImageUrl = 'https://image.tmdb.org/t/p/original/';
  
  
    async function getTrendingItems(mediaType, callback){
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
      callback(data.results);
    }
  
  
    useEffect(()=>{
    getTrendingItems('movie' ,settrendingMovies);
    getTrendingItems('tv' ,settrendingTvShows);
    getTrendingItems('person' ,settrendingPeople);
  }
    ,[])

    return <trendingContext.Provider value={{trendingMovies,trendingTvShows,trendingPeople , baseImageUrl}}>
        {props.children}
    </trendingContext.Provider>
  
}