import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const HomeContainer = () => {
    const {user} = useContext(UserContext)
    return (
        <>
            {user?
                <Link to='/bands'>
                    GET BANDS
                </Link>
            : 
                <h4>Loggin to Access</h4>
            }


        </>
    )
}

export default HomeContainer
