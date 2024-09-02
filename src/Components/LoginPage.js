import React, { useContext } from 'react'
import "../Styles/LoginPage.css"
import { GoogleLogin } from '@react-oauth/google';
import image from "../Assets/unnamed.png"
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
// import api from './api';

function LoginPage() {
    const { state, setLogedin ,setId,setCategory ,setUserName,setLoading,setAdmin,setPic,setTotaluser,setRank,setEmail,setExpiresAt} = useContext(GlobalStateContext);
    const notify = () => toast.error("Error login");
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');



  return (
    <div className='LoginPage'>
        <div className="login">
            <div className="logininner">
                <h1 className='loginHead'> Question Of The Day</h1>
                <p className='loginDisc'>Your platform for knowledge assessment and learning! <br /> Please log in to access the quizzes and enhance your skills.</p>
                <GoogleLogin
                    onSuccess={async Response => {  


                        const decoded = jwtDecode(Response.credential);  
                        const  credential  = Response.credential;

                        

                        // console.log(timeToShowModal);

                        if(decoded.email.endsWith("@carestack.com")){
                          
                        
                        try {
                          const res = await axios.post(`${apiBaseUrl}/api/auth/validate-token`, {
                            headers: {
                              Authorization: `Bearer ${token}`,
                          },
                            credential: credential
                            
                          });
                          // console.log(res);
                          if(res.data.isvalid){

                          //  setLoading(true);

                          // console.log(res.data.payload)
                          setId(res.data.userId);
                          
                          
                          setUserName(res.data.payload.name);
                          setTotaluser(res.data.totalUsers)
                          setRank(res.data.userRank);
                          setPic(res.data.payload.picture);
                          setEmail(res.data.payload.email)
                          
                          localStorage.setItem('token',credential);

                         setLogedin(true);
                         setCategory(res.data.category);

                        //  console.log(res.data.isAdmin)

                         if(res.data.isAdmin){
                          setAdmin(true);
                          // console.log("i am admin")
                         }
                            navigate('/');
                            // const decoded = jwtDecode(credential);  
                            const expiresIn = decoded.exp;
               
                                           const expiryDate = new Date(expiresIn * 1000);
                                           const currentTime = Date.now();
                                           const timeToShowModal = expiryDate.getTime() - (60 * 1000);
                                           setExpiresAt(timeToShowModal);
                                          //  console.log("haii"+state.expiresAt);
                            



                          }
                          else{
                          notify();

                          }
                          
                          
                        } catch (error) {
                          console.error('An error occurred:', error);
                          notify();

                        }
                      }else{
                        notify();

                      }
          
          
          
          
                      }}
                      onError={() => {
                        console.log('Login Failed');
                        notify();

          
                     
                }}/>
                {/* <a href="">Forgot Password?</a>  */}
                <p className='loginbutm'>By logging in, you agree to abide by the CareStack's usage policies.</p>
            </div>
        </div>
        <div className="hero">
            {/* <img src={image} alt="" /> */}
        </div>
        <ToastContainer />

    </div>
  )
}

export default LoginPage