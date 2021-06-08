import { useContext, createContext, useEffect, useState, } from "react";
import { UserContext } from "../context/UserContext";

export const DataContext = createContext();


export const DataProvider = ({ children }) => {

    const [bands, setBands] = useState([])
    const [albums, setAlbums] = useState([])
    const [genres, setGenres] = useState([])
    
    const {user} = useContext(UserContext)

    async function fetchAPI() {
        const dataGenres =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/genre').then(genres=>genres.json()).catch(err=>console.log(err))
       
        const dataAlbums =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/albums').then(albums=>albums.json()).catch(err=>console.log(err))
       
        const dataBands =  await fetch('https://my-json-server.typicode.com/improvein/dev-challenge/bands')
                                .then(res=>res.json())
                                .then(async (resJson)=>{
                                    let bandList = await Promise.all(
                                        resJson.map(async (band)=>{
                                            const genreName = dataGenres.find(dataGenre=>(dataGenre.code === band.genreCode))
                                            const albumsList = dataAlbums.filter(dataAlbum=>(dataAlbum.bandId === band.id))

                                            const genre = genreName === undefined ? 'no data' : genreName.name
                                            const albums = albumsList.length === 0 ? 'no data' : albumsList
                                            return {...band, genre, albums}
                                        })
                                    )
                                    console.log(bandList)
                                    return bandList
                                })
                                .catch(err=>console.log(err))
    
        setAlbums(dataAlbums)                 
        setBands(dataBands)
        setGenres(dataGenres)
    }

    useEffect(() => {

        user && fetchAPI()
                                  
    }, [user])

    return (
        <DataContext.Provider value={{ bands, setBands, albums, setAlbums, genres}}>
            {children}
        </DataContext.Provider>
    )
}

