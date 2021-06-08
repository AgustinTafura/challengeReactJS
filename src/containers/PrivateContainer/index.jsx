import { useState, useEffect } from 'react'
import './index.scss'

const PrivateContainer = () => {

    const [isLoading, setIsLoading] = useState(false)
    var data = [];
    useEffect(async () => {
  

    }, [])

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
            {data? 'zzzzzzzzz': 'lala'}

        </>
    )
}

export default PrivateContainer
