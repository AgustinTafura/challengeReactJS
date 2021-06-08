import { createContext, useEffect, useState, } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { toast } from 'react-toastify';



export const UserContext = createContext();




export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false) 

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {

            if (user) {
                setUser( user)
                setIsAuthenticated(true)

            } else {
                // No user is signed in.
                setUser(false)  
                setIsAuthenticated(false)

            }
    
        });
        //auth listener (keep the user alive)
    }, [])
      
    const createNewUserWithEmailAndPassword = (email,pass) => {

        const newUser =  auth
            .createUserWithEmailAndPassword(email,pass)
            .then(
                (userCredentials)=>{

                    const user =  userCredentials.user
                    return user
                }
            ).catch(
                (errors)=> {

                    if(errors.code === "auth/email-already-in-use") {
                        auth.fetchSignInMethodsForEmail(email).then(function(providers) {
        
                            var msg = providers.length > 0 && providers === "password" ? `Try login with emila and password`: `This email already exist in our database, try access with your ${providers} account`
                            toast.error(msg, {
                                // autoClose: false,
                                position: "top-right",
                            });
                        });
                    } else {
                                toast.error(errors.message, {
                            // autoClose: false,
                            position: "top-right",
                        });
                    }
                    throw errors
                }
            )
            
        return newUser
    }

    const logInUser = (email,pass) => {
        const user = auth.signInWithEmailAndPassword(email,pass)
        .then((user)=>{setIsAuthenticated(true)})
        .catch((errors)=>{

            
            switch (errors.code) {
                case "auth/user-not-found": toast('No existen cuentas con éste email', {position: "top-right"});
                    break;   
                case "auth/wrong-password": 
                    auth.fetchSignInMethodsForEmail(email).then(function(providers) {

                            var msg = providers.length > 0 && providers === "password" ? ` Wrong password`: `This email already exist in our database, try access with your ${providers} account`
                            toast(msg, {
                                // autoClose: false,
                                position: "top-right",
                            });
                    });
                    break;
                case "auth/too-many-requests": toast(errors.message, {position: "top-right"});  
                    break;
            
                default: toast(errors.message, {position: "top-right"}); 
                    break;
            }

            throw errors
        })
        return user
    }

    const logInWhitGoogle = ()=> {

        const provider = new firebase.auth.GoogleAuthProvider();

       return auth.signInWithPopup(provider)
        .then((user)=>{setIsAuthenticated(true)})
        .catch((errors)=>{
            
            if(errors.code === "auth/account-exists-with-different-credential") {
                auth.fetchSignInMethodsForEmail(errors.email).then(function(providers) {

                    var msg = providers.length > 0 && providers === "password" ? `Try login with emila and password`: `This email already exist in our database, try access with your ${providers} account`
                    toast.error(msg, {
                        // autoClose: false,
                        position: "top-right",
                    });
                });
            } else {
                console.log('lolololo', errors)
                toast.error(errors.message, {
                    // autoClose: false,
                    position: "top-right",
                });
            }
            throw errors
        })

    }

    const logInWhitFacebook = async ()=> {
        const provider = new firebase.auth.FacebookAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            setIsAuthenticated(true); 
        } catch (errors) {

            if (errors.code === "auth/account-exists-with-different-credential") {
                auth.fetchSignInMethodsForEmail(errors.email).then(function (providers) {

                    var msg = providers.length > 0 && providers === "password" ? `Try login with emila and password`: `This email already exist in our database, try access with your ${providers} account`
                    toast.error(msg, {
                        // autoClose: false,
                        position: "top-right",
                    });
                });
            } else {

                toast.error(errors.message, {
                    // autoClose: false,
                    position: "top-right",
                });
            }
            throw errors;
        }
    }

    const logOutUser = () => {
        const notify = () => toast.success("Logout successful!", {
            // autoClose: false,
            position: "top-right",
        });

        auth.signOut().then( 
            setTimeout(() => {
                notify()
            }, 1500) 
        )

        setIsAuthenticated(false)

    }
    


    return (
        <UserContext.Provider value={{ logInUser, logInWhitGoogle, logInWhitFacebook, createNewUserWithEmailAndPassword , user, logOutUser, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

