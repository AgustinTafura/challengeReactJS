import {  Switch } from "react-router"
import HomeContainer from '../containers/HomeContainer';
import PrivateContainer from '../containers/PrivateContainer';
import {PublicRoute} from './helperRoutes';
import {PrivateRoute} from './helperRoutes';
import { UserContext } from "../context/UserContext";
import { useContext } from "react";


const Routes = () => {

    const {isAuthenticated} = useContext(UserContext)

    return (
        <Switch>
            
            <PublicRoute exact path="/" component={HomeContainer}/>   

            {isAuthenticated && 

                <PrivateRoute exact path="/bands/:id?">
                        <PrivateContainer/>
                </PrivateRoute>
            }
            
            {/* <Route path="/**" >ERROR 404</Route> */}

        </Switch>
    )
}

export default Routes 