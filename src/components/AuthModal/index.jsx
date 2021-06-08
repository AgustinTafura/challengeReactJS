import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect} from "react";
import { withRouter, useLocation } from "react-router-dom";
import $ from 'jquery'

const AuthModal = (props) => {
    const {history} = props;
    const { logInUser, createNewUserWithEmailAndPassword, logOutUser, logInWhitGoogle, logInWhitFacebook } = useContext(UserContext)
    const [errors, setErrors] = useState({})
    const location = useLocation()



    //check empty inputs
    const checkErrors = (e) => {
        if(e.value.trim().length >0) {

            setErrors({}) 
            !e.classList.contains("notEmpty") && e.classList.add("notEmpty")
        } else {
            return e.classList.contains("notEmpty") && e.classList.remove("notEmpty")
        }  
        e.classList.add("notEmpty")
    }


        useEffect(() => {
 
        




        return () => {
            
        }
    }, [])
        
    window.addEventListener("load", ()=>{
                   //show register Form
                   const registerButton = document.querySelector(".registerModal");
                   registerButton.addEventListener('click', (e) => {
                       e.preventDefault()
                       e.stopImmediatePropagation();
                       $('#signinModal').modal("hide");
                       $('#signupModal').modal("show");
                       
                   })
                   
                   //show login Form
                   const loginButton = document.querySelector(".loginModal");
                   loginButton.addEventListener('click', (e) => {
                       e.preventDefault()
                       e.stopImmediatePropagation();
                       $('#signupModal').modal("hide");
                       $('#signinModal').modal("show");
                   })
                   
                   //manage RegisterForm submit
                   const signUpForm = document.querySelector("#signup-form");
                   signUpForm.addEventListener("submit", (e) => {
           

                       e.preventDefault();
                       e.stopImmediatePropagation();
                       const email = signUpForm["signup-email"].value.toString();

                       const password = signUpForm["signup-password"].value;
                       
                       createNewUserWithEmailAndPassword(email,password)
                       .then((userCredential) => {

           
                           // clear the form
                           $('#signupModal').modal("hide");
                           signUpForm.reset();
           
                       }).catch((err)=>{

                           setErrors({email:'Éste email ya esta en uso'})
                       });
                   })
           
               
                   //SignIn with Email and Pass
                   const signInForm = document.querySelector("#login-form");
                   
                   signInForm.addEventListener("submit",  (e) => {
           
                       e.preventDefault();
                       e.stopImmediatePropagation()
                       const email = signInForm["login-email"].value.toString();
                       const password = signInForm["login-password"].value;

           
           
                       logInUser(email,password)
                       .then((user)=>
                           {
                               let currentLocation = location.pathname
           
                               signInForm.reset()
                               $("#signinModal").modal("hide");

                               currentLocation === "/" && history.push("/")
           
                           })
                    //    .catch(error=>)
           
               
            })


            // Access with Google
            const googleButtons = document.querySelectorAll(".googleLogin");

            googleButtons.forEach((googleButton)=>{

                googleButton.addEventListener("click", (e) => {
                    
                e.stopImmediatePropagation();
        
                logInWhitGoogle()
                .then((user)=>
                    {
                        let currentLocation = location.pathname
        
                        signInForm.reset()
                        $("#signinModal").modal("hide");

                        currentLocation === "/" && history.push("/")
        
                    })
                .catch(error=>console.log('lalalalalala', error))
                });
            })
            
    
            
            // Access with Facebook
            const facebookButtons = document.querySelectorAll(".facebookLogin");
            
            facebookButtons.forEach(facebookButton=>{

                facebookButton.addEventListener("click", (e) => {
        
                    e.stopImmediatePropagation();
        
                    logInWhitFacebook()
                    .then((user)=>
                        {
                            let currentLocation = location.pathname
        
                            signInForm.reset()
                            $("#signinModal").modal("hide");
                            console.log(user)
                            currentLocation === "/" && history.push("/")
        
                        })
                    // .catch(error=>console.log(error))
                    
                });
            })
    
        
    })
    
    const logout = ()=>{
        logOutUser();
        $('#logoutModal').modal("hide");
        history.push("/")

    }


    return (
        <>
                        {/* <!-- Modal --> */}
            <div className="modal fade" id="signupModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h3>Crear una nueva cuenta</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <form id="signup-form" >

                        <div className="form-group">
                            <input onFocus={(e)=>checkErrors(e.target)} onBlur={(e)=>checkErrors(e.target)} type="email"  className={`form-control-input ${errors.email ? 'notEmpty errorData':''} `} id="signup-email" name="email" required />
                            <label className="label-control" htmlFor="email">Email
                            {errors.email? <small className="text-muted"> -  {errors.email}  </small> : null }
                            </label>
                        </div>
                        
                        <div className="form-group">
                            <input onFocus={(e)=>e.target.classList.add("notEmpty")} onBlur={(e)=>checkErrors(e.target)} type="password" className="form-control-input" id="signup-password" name="password" minLength="6" required/>
                            <label className="label-control" htmlFor="email">Password
                            {errors.password? <small className="text-muted"> - {errors.password}  </small> : null }
                            </label>
                        </div>
                        
                        <button type="submit" className="btn-solid-lg btn-block">Registrarse</button>
                        <button type="button" className="btn-solid-lg btn-block googleLogin">Ingresar con tu cuenta de Google</button>
                        <button type="button" className="btn-solid-lg btn-block facebookLogin">Ingresar con tu cuenta de Facebook</button>
 
                        <div className="nav-item logged-out justify-content-center mt-2">
                            <span >¿Tienes cuenta?</span> <a className="loginModal mx-2" href="/change" >Ingresar</a>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>

            <div className="modal fade" id="signinModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalSignin" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h3>Ingresar</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <form id="login-form">
                    <div className="form-group">
                            <input onFocus={(e)=>checkErrors(e.target)} onBlur={(e)=>checkErrors(e.target)} type="email"  className={`form-control-input ${errors.email ? 'notEmpty errorData':''} `} id="login-email" name="email" required />
                            <label className="label-control" htmlFor="email">Email
                            {errors.email? <small className="text-muted"> -  {errors.email}  </small> : null }
                            </label>
                        </div>
                        
                        <div className="form-group">
                            <input onFocus={(e)=>e.target.classList.add("notEmpty")} onBlur={(e)=>checkErrors(e.target)} type="password" className="form-control-input" id="login-password" name="password" minLength="6" required/>
                            <label className="label-control" htmlFor="email">Password
                            {errors.password? <small className="text-muted"> - {errors.password}  </small> : null }
                            </label>
                        </div>
                        <button type="submit" className="btn-solid-lg btn-block">Entrar</button>
                        <button type="button" className="btn-solid-lg btn-block googleLogin">Ingresar con tu cuenta de Google</button>
                        <button type="button" className="btn-solid-lg btn-block facebookLogin">Ingresar con tu cuenta de Facebook</button>
                        <div className="nav-item logged-out justify-content-center ml-3 mt-2">
                            <span >¿No tienes una cuenta?</span> <a className="mx-2 registerModal" href="/change" >Registrarse</a>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>

                {/* <!-- Logout Modal--> */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Estas seguro que desas salir?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {/* <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div> */}
                        <div className="modal-footer">
                            <button className="btn-solid-lg btn-light" type="button" data-dismiss="modal">Cancel</button>
                            <div onClick={()=>{logout() }} className="btn-solid-lg " id="logOutButton">Logout</div>
 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AuthModal)

