import { Route, Switch } from "react-router"
import HomeContainer from '../containers/HomeContainer';
import AccessContainer from '../containers/AccessContainer';
// import NotFound from '../components/NotFound';
import {PublicRoute} from './helperRoutes';
import {PrivateRoute} from './helperRoutes';
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Routes = () => {

    const {isAuthenticated,user} = useContext(UserContext)

    return (
        <Switch>
            
            <PublicRoute exact path="/" component={HomeContainer}/>   

            {isAuthenticated && <PrivateRoute exact path="/private" component={AccessContainer}/>}
            
            <Route path="/**" >ERROR 404</Route>

            {/* <Route exact path={"*"} to="/booking"/> */}
        </Switch>
    )
}

export default Routes 