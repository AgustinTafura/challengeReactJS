import { useState, useEffect, useContext } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import './index.scss'

const PrivateContainer = () => {

    let history = useHistory();
    const {id} = useParams()
    const {bands, genres } = useContext(DataContext)
    const [dataToShow, setDataToShow] = useState([]) 

    const filter = (e)=>{
        const selectedValue = e.target.value
        var newDataToShow = bands.filter(band => band.genreCode === selectedValue)
        selectedValue ? setDataToShow(newDataToShow) : setDataToShow(bands)
    }

    const sort = (e)=>{
        const selectedValue = e.target.value
        if(selectedValue) {
            var asc =()=> Object.values(bands).sort((a,b) => (a.namie > b.namie) ? 1 : ((b.name > a.name) ? -1 : 0))
            var des =()=> Object.values(bands).sort((a,b) => (a.namie < b.namie) ? 1 : ((b.name < a.name) ? -1 : 0))
            selectedValue === 'asc'? setDataToShow(asc()) : setDataToShow(des())
        }
    }



    useEffect(() => {
        console.log(bands)
        console.log(Object.keys(bands))
        console.log(Object.values(bands))
        id ? setDataToShow(bands.filter(band=>band.id === id)):setDataToShow(bands)
    }, [bands,id])

    if(dataToShow.length === 0){
        return (
            <div className='loadingComponent'>
                <p > Loading </p>    
                <div className="spinner-grow bounce1" role="status">
                    <span className="sr-only"></span>
                </div>
                <div className="spinner-grow bounce2" role="status">
                    <span className="sr-only"></span>
                </div>
                <div className="spinner-grow bounce3" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }


    return (
        <>
            <main>
                <div>

                    {id ?
                        <button onClick={()=>history.goBack()} className='btn btn-dark m-2'>back</button>
                    :   
                        <>  <div>
                                <label className='ml-5' htmlFor="">Filter</label>
                                <select className='m-1 mt-4' onChange={(e)=>filter(e)}>
                                    <option value="">all</option>
                                    {genres.map((genre,i)=>{
                                        return (
                                            <option key={i} value={genre.code}>{genre.name}</option>
                                            )
                                        })}
                                </select>     
                                </div>
                            <div>
                                <label className='ml-5' htmlFor="">Sort by Names</label>
                                <select className='m-1 mb-5' onChange={(e)=>sort(e)}>
                                    <option value=""></option>
                                    <option value="asc">Asc</option>
                                    <option value="des">Des</option>

                                </select>                    
                            </div>           
                        </>
                    }
                </div>
                <div className='container'>
                    {
                        dataToShow.map((band, index)=>{
                            
                            return(
                                <div key={index}>
                                    <span> <Link to={`/bands/${band.id}`}><b>{band.name}</b></Link>  </span> - <span>{band.genre}</span>
                                        {id &&
                                        <ul>
                                            <li>Country: {band.country}</li>
                                            <li>Members:
                                                <ul>
                                                    {band.members.map((member,index)=><li key={index} >{member.name}</li>)}
                                                </ul>
                                            </li>
                                        </ul>
                                        }
                                </div>
                            )
                            
                        })

                    }

                </div>
            </main>

        </>
    )
}

export default PrivateContainer
