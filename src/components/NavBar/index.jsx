import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useLocation } from "react-router-dom";
import React, { useEffect,useContext } from "react";
import { UserContext } from "../../context/UserContext";
const NavBar = () => {

    const { user } = useContext(UserContext)
    const actualLocation = useLocation()

    


    return (
        <>
        <nav className={`navbar navbar-expand-md navbar-dark navbar-custom bg-warning`}>
            <div className='container'>
            
                <Link className="navbar-brand logo-image" to='/'>
                    Challenge
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>


                    <ul className="navbar-nav ml-auto">
                        {!user?
                            (
                                <>
                                    <li className="">
                                        <button onClick={()=>{$('#signinModal').modal('show')}} className="btn btn-dark m-1" data-toggle="modal" data-target="#signinModal">LOGIN</button>
                                    </li>
                                    <li className="">
                                        <button className="btn btn-dark m-1" data-toggle="modal" data-target="#signinModal">REGISTER</button>
                                    </li>
                                </>
                            )
                            :
                            (
                                <>
                                    <li>
                                        <button className="btn btn-dark m-1" data-toggle="modal" data-target="#logoutModal">LOGOUT</button>
                                    </li>
                                </>
                            )
                        }
                    </ul>
            </div>

        </nav>

        </>
    )
}

export default NavBar
