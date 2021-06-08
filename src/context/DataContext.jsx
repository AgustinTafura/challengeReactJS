import { useContext, createContext, useEffect, useState, } from "react";
import { UserContext } from "../context/UserContext";

export const DataContext = createContext();


export const DataProvider = ({ children }) => {

    const [bands, setBands] = useState([])
    const [albums, setAlbums] = useState([])
    
    const {user, isAuthenticated} = useContext(UserContext)

    async function fetchAPI() {
        const dataGenres =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/genre').then(genres=>genres.json()).catch(err=>console.log(err))
        const dataBands =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/bands')
                                .then(res=>res.json())
                                .then(async (resJson)=>{
                                    let bandList = await Promise.all(
                                        resJson.map(async (band)=>{
                                            console.log(dataGenres)
                                            const genreName = dataGenres.find(dataGenre=>(dataGenre.code == band.genreCode))
    
                                            if(genreName) {
                                                return {...band,genre:genreName.name}
                                            } 
                                            return {...band, genre:band.genreCode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        })
                                    )
                                    return bandList
                                })
                                .catch(err=>console.log(err))
        const dataAlbums =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/albums').then(albums=>albums.json()).catch(err=>console.log(err))
    
        setBands(dataBands)
        setAlbums(dataAlbums)                 
    }

    useEffect(() => {

        user && fetchAPI()
                                  
    }, [user])

    return (
        <DataContext.Provider value={{ bands, setBands, albums, setAlbums}}>
            {children}
        </DataContext.Provider>
    )
}

