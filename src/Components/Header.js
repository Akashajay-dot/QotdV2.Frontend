import React, { useContext, useState } from 'react'
import "../Styles/Header.css"
import Logo from "../Assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import image from '../Assets/image (2).png'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddTaskIcon from '@mui/icons-material/AddTask';


function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const [totalRank, setTotalrank]=useState('');
    const { state,setLogedin} = useContext(GlobalStateContext);


  const logout=()=>{
    handleClose();
    setLogedin(false);
    localStorage.removeItem('token');
    navigate('/')
    // setOpen(false);
  }


 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='Header'>
      <div className="logoSct">
        <Link to="/">
        <img className ="logo" src={Logo} alt="" />
        </Link>
      </div>
    
    <div className="headerOptions">
    {state.isLogedin && (
<button className="pos">
<img src={image} className="posImage" alt="" />
<p className='rank'>#{state.rank} of {state.totaluser}</p>
</button>)}
{state.isLogedin && (
  
<div className="AvatarSctn" >
      <button aria-describedby={id} variant="contained" onClick={handleClick} className='avtrBtn'>
      <div className="avtrInner">
<Avatar alt="" src={state.pic} sx={{ 
     width: 45, height: 45

  }}/>
{/* <p>{state.UserName}  </p> */}
  </div>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <div className="drawerInner">

       <div className="profilesctn">
        <div className="proAvtr">
  <Avatar alt="" src={state.pic} sx={{ 
     width: 45, height: 45

  }}/>
  <div className="proAvtrinner">
  <p>{state.UserName}
  </p>
  <p className='email'>{state.email}</p>
  </div>
 
  </div>
  

       </div><div className="proOpt">

       
<div className="options">
<div className="innerOpt">
<HomeIcon/>
  <Link to="/" className='navlinks'>Home</Link>
  </div>
  <div className="innerOpt">
  <LeaderboardIcon/>
  <Link to="/leaderBoard"  className='navlinks'>LeaderBoard</Link>
  </div>
  <div className="innerOpt">
  <PostAddIcon/>
    <Link to="postQuestions" className='navlinks'>Add Questions</Link>
    </div>
    <div className="innerOpt">
    <FindInPageIcon/>
    <Link to="prevQuestions" className='navlinks'> Previous Questions</Link>
    </div>
    
  { state.isAdmin && <div className="innerOpt">
  <AddTaskIcon/> <Link to="/questions"  className='navlinks'>Approve Questions</Link></div>}

  <Button onClick={logout}>Log Out</Button>
</div>
</div>

      </div>
      </Popover>
    </div>
)}
</div>

    </div>
  )
} 

export default Header