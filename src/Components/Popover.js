import React, { useContext, useEffect } from 'react'
import "../Styles/Popover.css"
import { Link, useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../Context/GlobalStateContext';
function Popover({popover,iscorrect,point}) {
  const { state ,setToggle } = useContext(GlobalStateContext);
  const navigate = useNavigate();
const handleClick = ()=>{
navigate('/prevQuestions');
// navigate(0);

setToggle(!state.toggle);

  

}
  return (

    <div className={popover ?'popover' :'PopOver'}>
        {iscorrect && <h3>Correct Answer! 🌟 <br/>You've earned {point} points! 🏆</h3> }
        {!iscorrect && <h3>No worries! Wrong answer this time. <br />Better luck next round! 🤞 🏆</h3>}
        <div className="popBtns">
        <Link to={"/postQuestions"}> <button className='addQstnBtn'>Add   Questions</button></Link>
        {/* <Link  to={"/prevQuestion"}> <button className='prvQstnBtn'  >Prev   Questions</button></Link> */}
        <button className='prvQstnBtn' onClick={handleClick}>Prev Questions</button>
            
        </div>
   
    </div>
  )
}

export default Popover