import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const HomeContainer = () => {
    const {user} = useContext(UserContext)
    return (
        <>
            {user?
                <Link to='/private'>
                    GET BANDS
                </Link>
            : 
                ('HOMECONTAINER')
            }


        </>
    )
}

export default HomeContainer
