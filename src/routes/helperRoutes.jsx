import { useContext } from "react"
import { Route, Redirect } from "react-router"
import { UserContext } from "../context/UserContext"


export const PublicRoute = ({component, ...options})=>{
    
    return <Route {...options} component={component}/>
}

export const PrivateRoute = ({component, ...options})=>{
    const {isAuthenticated} = useContext(UserContext)
    
    
    if(isAuthenticated) {

        return (<Route {...options} component={component}/> )
        
    }   
    return <Redirect to={{pathname: "/"}} />
}