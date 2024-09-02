import React, { useEffect, useState } from 'react'
import "../Styles/LeaderBoard.css"
import axios from 'axios';
import { Avatar } from '@mui/material';

function Leaders({pic,medal,id}) {
    const [name , setname]=useState('');
    const [picture , setPic]=useState('');
    const [badge , setBadge]=useState('');
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
                console.log(response)
                setname(response.data.user.name)
                setPic(response.data.user.pic)
                // console.log(response)
                setBadge(response.data.reputationName);

            }
            fetchUserdetails();
        }
            catch{
                console.log("error");
            }
    },[])
  return (
    <div className="pos1">
    <div class="avatar-container">
{/* <img src={picture} alt="Avatar" class="avatar"/> */}
<Avatar alt="" src={picture} sx={{ 
     width: 80, height: 80

  }}/>
<img src={medal} alt="Medal" class="medal"/>

</div>
<h6 className='name'>{name}</h6>
<div className="rankTittle">
<p className='userBadge'>{badge}</p>
</div>
</div>
  )
}

export default Leaders