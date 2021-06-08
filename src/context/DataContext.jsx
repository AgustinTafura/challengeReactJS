import { createContext, useEffect, useState, } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { toast } from 'react-toastify';



export const DataContext = createContext();




export const DataProvider = ({ children }) => {

    const [bands, setBands] = useState([])
    const [albums, setAlbums] = useState([])   


    useEffect(async() => {
        const dataGenres =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/genre').then(genres=>genres.json()).catch(err=>console.log(err))
        const dataBands =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/bands').then(bands=>bands.json()).catch(err=>console.log(err))
        const dataAlbums =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/albums').then(albums=>albums.json()).catch(err=>console.log(err))

        console.log(dataBands)

    }, [])

    return (
        <DataContext.Provider value={{ bands, setBands, albums, setAlbums}}>
            {children}
        </DataContext.Provider>
    )
}

