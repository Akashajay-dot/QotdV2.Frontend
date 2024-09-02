import React, { forwardRef, useContext, useEffect, useState } from 'react'
import "../Styles/LeaderBoard.css";
import axios from 'axios';
import { GlobalStateContext } from '../Context/GlobalStateContext';

const UserList = forwardRef(({ id ,index}, ref) => {
    const [name , setname]=useState('');
    const [points , setPoints]=useState('');
    const [badge , setBadge]=useState('');
    const [isUser ,setIsuser]=useState(false);
    const { state} = useContext(GlobalStateContext);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const token = localStorage.getItem('token');
    useEffect(()=>{

        try{
        const fetchUserdetails =async ()=>{
                // http://localhost:57101/api/user/5
                const response = await axios.get(`${apiBaseUrl}/api/user/${id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
                // return(response);
                setname(response.data.user.name)
                setPoints(response.data.user.points)
                setBadge(response.data.reputationName);

                // console.log(response)

            }
            fetchUserdetails();
        if(id==state.id){
          setIsuser(true);
        }
        }
            catch{
                console.log("error");
            }
    },[])

    return (
      <div className={isUser ? 'active-class  UserList' : 'UserList'}id={id} ref={ref}><div className="userListleft ">
        <p className='userRank'>{index+1}</p>
        <h6>{name}</h6>
        <div className="rankTittle">
<p className='userBadge'>{badge}</p>
        

</div>
</div>

<h5>{points}</h5>



      </div>
    );
  });

export default UserList 