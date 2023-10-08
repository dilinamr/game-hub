import React, { useEffect, useState } from 'react'
import apiClient from '../servies/api-client';
export interface platform{
  id:number;
  name:string;
  slug:string;
}
export interface Game {
    id: number;
    name: string;
    background_image:string;
    parent_platforms:{platform:platform}[]
  }
  interface fetchgamesresponse {
    count: number;
    results: Game[];
  }
const useGames = () => {
    const [games, Setgames] = useState<Game[]>([]);
    const [error, Seterror] = useState("");
 
    useEffect(() => {
        const controller = new AbortController();
      apiClient
        .get<fetchgamesresponse>("/games",{signal: controller.signal})
        .then((res) => Setgames(res.data.results))
        .catch((err) => {if(err.name instanceof CanceledError) return;
        Seterror(err.message)});
        return ()=>controller.abort(); 
    }, []);
return{games,error}
}

export default useGames