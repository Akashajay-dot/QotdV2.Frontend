import React, { useContext, useEffect } from 'react'
import "../Styles/Popover.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../Context/GlobalStateContext';

function Popover2({popover}) {
  const { state  ,setLoading,setToggle} = useContext(GlobalStateContext);
  const navigate = useNavigate();

    const handleRefresh = () => {
        // navigate(0); // Refresh the current route
setToggle(!state.toggle);

      };
      const handleClick = ()=>{
        navigate('/prevQuestions');
      }
  return (

    <div className="popover">
        <h3>Question Submitted 🌟 <br/>Want to add More 🏆</h3> 
        <div className="popBtns">
        <button className='addQstnBtn' onClick={handleRefresh}>Add   Questions</button>
            {/* <button className='prvQstnBtn'>Prev Question</button> */}
            <button className='prvQstnBtn' onClick={handleClick}>Prev Questions</button>            
        </div>
   
    </div>
  )
}

export default Popover2