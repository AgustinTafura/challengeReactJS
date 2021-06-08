import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import './index.scss'

const PrivateContainer = () => {

    const {bands} = useContext(DataContext)
    const [isLoading, setIsLoading] = useState(false)


    if(isLoading){
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
            {bands? bands.map(band=><li>{band.name}</li>): 'lala'}

        </>
    )
}

export default PrivateContainer
