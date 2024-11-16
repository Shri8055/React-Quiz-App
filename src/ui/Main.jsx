import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.scss';
function Main(){
    const navigate=useNavigate();
    const handleStartTest=()=>{
        navigate('./ui/Quiz')
    }
    return(
        <div className='main-container' >
            <p>Instructions :</p><hr/>
            <li>This is a FREE online test. Beware of scammers who ask for money to attend this test.</li>
            <li>Total number of questions: 20.</li>
            <li>Time allotted: 30 minutes.</li>
            <li>Each question carries 1 mark; there are no negative marks.</li>
            <li>All the best!</li>
            <button type='submit' className='btn' onClick={handleStartTest}>Start Test</button>
        </div>
    )
}
export default Main;