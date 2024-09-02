import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalStateContext } from '../Context/GlobalStateContext';
import "../Styles/LeaderBoard.css";
import numberone from "../Assets/1st.png"
import numbertwo from "../Assets/2nd.png"
import numberthree from "../Assets/3rd.png"
import axios from 'axios';
import Leaders from './Leaders';
import UserList from './UserList';
function LeaderBoard() {
    const { state,setLogedin,setLoading} = useContext(GlobalStateContext);
    const [ ranked , setRanked] = useState([]);
    const [ pics , setPics] = useState([]);
    const token = localStorage.getItem('token');
    const userRefs = useRef({});
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

   
    useEffect(() => {
        if (ranked.length > 0 && userRefs.current[state.id]) {
            // console.log(userRefs.current[state.id]);
            userRefs.current[state.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [ranked]);

useEffect(()=>{
    setLoading(false);
const fetchusers=async ()=>{
    try{
        const response = await axios.get(`${apiBaseUrl}/api/users/orderedbyPoints`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
        // setRanked
        // console.log(response.data);
        setRanked(response.data);
        // setRanked([17,18,19]);

    }
    catch{
console.log("error");
    }

}
fetchusers();
},[])

// const fetchUserdetails =async (id)=>{
//     // http://localhost:57101/api/user/5
//     const response = await axios.get(`http://localhost:57101/api/user/${id}`);
//     return(response);

// }
// useEffect(()=>{
//     const userpics=[];
//     // for(i=0;i<4;i++){
//     const fetchuserProfiles =()=>{
//     try{
//         const response1 =  axios.get(`http://localhost:57101/api/user/${ranked[0]}`);
//         // console.log(response1.data.Pic);
//         userpics.push(response1.data.Pic);
        

//         // userpics.push(response.)
//     }
// catch{
//     console.log("eroor");
// }
// // }
//     }
//     if(ranked.length !=0){
//     fetchuserProfiles();
//     setPics(userpics);

//     }

//     // setPics(userpics);

// },[])

  return (
    <div className="LeaderBoard">
        {!(ranked.length === 0) &&(
        <div className="Lbody">
            <h4>Leaderboard</h4>
            <div className="top3">
            {(ranked.length >1) &&(
              <Leaders pic={state.pic} medal={numbertwo} id={ranked[1]}/>
            )}
              <Leaders pic={state.pic} medal={numberone} id={ranked[0]}/>


            {(ranked.length >2) &&(

              <Leaders pic={state.pic} medal={numberthree} id={ranked[2]}/>
                
            )}
            </div>

                {/* <input type="text" className='userSearch' placeholder='search a user'/> */}
                <div className="userlist">
{
    ranked.map((i,index)=>(
        
        <UserList key={i} id={i} index={index} ref={(el) => (userRefs.current[i] = el)}/>
    ))
}
            </div>
        </div>
            
            )}
    </div>
  )
}

export default LeaderBoard