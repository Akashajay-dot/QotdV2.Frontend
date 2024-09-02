import React, { useContext, useEffect, useState } from "react";

import "../Styles/QuestionBank.css";
import { GlobalStateContext } from "../Context/GlobalStateContext";
import QBblock1 from "./QBblock1";
import axios from "axios";
import DropDown from "./DropDown";
import SearchIcon from '@mui/icons-material/Search';
function Prev() {

  const { state, setLoading} = useContext(GlobalStateContext);
  const [selection , setSelection ]= useState(null);
  const [answered , setanswered ]= useState();
  const [previous , setPrevious ]= useState(false);

  const [cat , setcat ]= useState("Category");
  const [catid , setcatid ]= useState(null);
  const [filter , setFilter]= useState('all');


  const [unanswered , setunanswered]= useState(true);


  const [QIds , setQids] = useState([]);
  const [answeredQIds , setAnsweredQIds] = useState([]);
  const [unansweredQIds , setunAnsweredQIds] = useState([]);


 const [searchtxt ,setSearchtext ]= useState('');
 const [searchtxt2 ,setSearchtext2 ]= useState(null);
const [toggle , setToggle ] = useState(true);
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem('token');

  useEffect(()=>{
  setLoading(false);
Qid();
 

  },[filter,catid,toggle])
  const Qid = async ()=>{
    try{
    
        const Qids = await axios.get(`${apiBaseUrl}/api/Count/${state.id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }

        );
        console.log(Qids)
        setQids(Qids.data.approvedQuestionIds);
        setAnsweredQIds(Qids.data.answeredQuestionIds)
        // /${searchtxt}
    
    
        
    
    
      }
      catch (error){
        console.log(error);
      }
    
    }
  useEffect(()=>{
    const difference = QIds.filter(x => !answeredQIds.includes(x));
    setunAnsweredQIds(difference);
  },[answeredQIds,QIds])
  const handleanswered=()=>{
    setanswered(true);
    setunanswered(false);


  }
 
  const handleunanswered=()=>{
    setanswered(false);
    setunanswered(true);
   


  }
 

  
  return (
<div className="QuestionBank">
      <div className="topQB">
        <div className="QBbtns">
     
     <button className={unanswered ? 'unPublishedopt' :'opt' } onClick={handleunanswered}>
        Unanswered
        </button>
        <button className={answered ? 'publishedopt' :'opt' } onClick={handleanswered}>
        Answered
      </button>
       
      </div>
      
    
      </div>
      <div className="bottom">
        {/* {(
      Options.map(option => (
        <div key={option.AnswerOptionId}>)))} */}
         {/* {(QIds !=  null) && console.log(QIds)} */}
        {(!(unansweredQIds.length===0)) && unanswered && (
            
            unansweredQIds.map(i =>(
              <QBblock1 key={i} id={i} unAnswered={unanswered}/>
              
              
          )))
          
        }
       {((unansweredQIds.length===0)) && unanswered && (
           <div className="noQuestion">
           <h2>Quiz done! More brain jazz tomorrow! 🚀🎉</h2>
           <div className="popBtns">
            {/* <Link to={"/postQuestions"}> <button  className='addQstnBtn'>Add   Questions</button></Link> */}
              {/* <Link to="prevQuestions">  <button className='prvQstnBtn'>Prev Question</button> </Link> */}
            {/* <button className='prvQstnBtn' >Prev Questions</button> */}
    
                
            </div>
       
        
          </div>
       )
          
        }

         {(!(answeredQIds.length===0)) && answered && (
            
            answeredQIds.map(i =>(
                <QBblock1 key={i} id={i} />
                
                
            )))
            
          }
          {((answeredQIds.length===0)) && answered && (
             <div className="noQuestion">
             <h2>Quiz done! More brain jazz tomorrow! 🚀🎉
           </h2>
             <div className="popBtns">
              {/* <Link to={"/postQuestions"}> <button  className='addQstnBtn'>Add   Questions</button></Link> */}
                {/* <Link to="prevQuestions">  <button className='prvQstnBtn'>Prev Question</button> </Link> */}
              {/* <button className='prvQstnBtn' >Prev Questions</button> */}
      
                  
              </div>
         
          
            </div>
           )
            
          }
      </div>
    </div>
  )
}

export default Prev