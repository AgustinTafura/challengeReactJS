import { Route, Switch } from "react-router"
import HomeContainer from '../containers/HomeContainer';
import PrivateContainer from '../containers/PrivateContainer';
import {PublicRoute} from './helperRoutes';
import {PrivateRoute} from './helperRoutes';
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { DataProvider } from "../context/DataContext";

const Routes = () => {

    const {isAuthenticated,user} = useContext(UserContext)

    return (
        <Switch>
            
            <PublicRoute exact path="/" component={HomeContainer}/>   

            {isAuthenticated && 

                <PrivateRoute exact path="/private">
                        <PrivateContainer/>
                </PrivateRoute>
            }
            
            <Route path="/**" >ERROR 404</Route>

        </Switch>
    )
}

export default Routes 