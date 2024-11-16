import {React,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Quiz.scss';
const Quiz=()=>{
    const navigate=useNavigate();
    const [marks,setMarks]=useState();
    const [min,setMin]=useState(30);
    const [sec,setSec]=useState(0);
    const [question,setQuestion]=useState([]);
    const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
    const [selectedAnswers,setSelectedAnswers]=useState({});
    const goBack=()=>{
        const userConfirmed=window.confirm('Changes may not be saved. Do you want to go back?');
        if(userConfirmed){
            navigate('../');
        }
    };
    useEffect(()=>{
        const timer=setInterval(()=>{
            setSec((prevSec)=>{
                if(prevSec===0){
                    if(min===0){
                        clearInterval(timer);
                        alert("Time out!");
                        return 0;
                    }else{
                        setMin((prevMin) => prevMin - 1);
                        return 59;
                    }
                }else{
                    return prevSec - 1;
                }
            });
        },1000);
        return()=>clearInterval(timer);
    },[min]);
    useEffect(()=>{
        const fetchQuestions=async()=>{
            const {data}=await axios.get(`https://quizapi.io/api/v1/questions?apiKey=scupywzLAXMOnc1U9evEXNgnr1LAp6uM92w2nXIo&limit=10&category=Code`);
            setQuestion(data);
            console.log(data);
        };
        fetchQuestions();
    },[]);
    const handleOptionChange=(answer)=>{
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]:answer,
        });
    };
    const handleSubmit=()=>{
        let score=0;
        question.forEach((q,index)=>{
            const correctAnswerKey=Object.keys(q.correct_answers).find(
                (key)=>q.correct_answers[key]==="true"
            );
            if(!correctAnswerKey)return;
            const correctAnswer=correctAnswerKey.replace("_correct", "");
            console.log(
                `Question ${index+1}: Correct Answer: ${correctAnswer}, Your Answer: ${selectedAnswers[index]}`
            );
            if(selectedAnswers[index]===correctAnswer){
                score++;
            }
        });
        setMarks(score);
        console.log("Final Score:", score);
        alert(`Test completed! Your score is ${score}/${question.length}`);
        navigate("../");
    };    
    return(
        <>
            <button className="back" onClick={goBack}>End Test</button>
            <div className="quiz-container">
                {question.length>0?(
                    <nav className="top-navbar">
                        <p>Category: {question[currentQuestionIndex].category}</p>
                        <p>ID: {question[currentQuestionIndex].id}</p>
                        <p>Difficulty: {question[currentQuestionIndex].difficulty}</p>
                    </nav>
                ):(
                    <p className="quiz-container">Loading...</p>
                )}
                <nav className="navbar">
                    <p>Time Left : {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}</p>
                </nav>
                <div className="question-number">
                    {Array.from({length:10},(_,i)=>(
                        <button
                            key={i}
                            onClick={() => setCurrentQuestionIndex(i)}
                            className={`question-btn ${i === currentQuestionIndex ? 'active' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <div className="quiz-content">
                    {question.length>0?(
                        <div className="question-container">
                            <div className="question">
                                {question[currentQuestionIndex].question}
                            </div>
                            <div className="options-container">
                                {question[currentQuestionIndex].answers.answer_a&&(
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name={`question${currentQuestionIndex}`}
                                            checked={selectedAnswers[currentQuestionIndex]==='answer_a'}
                                            onChange={() => handleOptionChange('answer_a')}
                                        /> 
                                        <span>{question[currentQuestionIndex].answers.answer_a}</span>
                                    </label>
                                )}
                                {question[currentQuestionIndex].answers.answer_b&&(
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name={`question${currentQuestionIndex}`}
                                            checked={selectedAnswers[currentQuestionIndex]==='answer_b'}
                                            onChange={() => handleOptionChange('answer_b')}
                                        /> 
                                        <span>{question[currentQuestionIndex].answers.answer_b}</span>
                                    </label>
                                )}
                                {question[currentQuestionIndex].answers.answer_c&&(
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name={`question${currentQuestionIndex}`}
                                            checked={selectedAnswers[currentQuestionIndex]==='answer_c'}
                                            onChange={() => handleOptionChange('answer_c')}
                                        /> 
                                        <span>{question[currentQuestionIndex].answers.answer_c}</span>
                                    </label>
                                )}
                                {question[currentQuestionIndex].answers.answer_d&&(
                                    <label className="option">
                                        <input
                                            type="radio"
                                            name={`question${currentQuestionIndex}`}
                                            checked={selectedAnswers[currentQuestionIndex]==='answer_d'}
                                            onChange={() => handleOptionChange('answer_d')}
                                        /> 
                                        <span>{question[currentQuestionIndex].answers.answer_d}</span>
                                    </label>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Loading Question...</p>
                    )}
                    <div className="button-container">
                        <button
                            className="prev"
                            onClick={()=>{
                                console.log("Correct Answer:", question[currentQuestionIndex].correct_answers);
                                setCurrentQuestionIndex((prevIndex)=>Math.max(prevIndex-1,0))}}
                            disabled={currentQuestionIndex===0}
                        >
                            Prev
                        </button>
                        {currentQuestionIndex===question.length-1?(
                            <button className="next" onClick={handleSubmit}>
                                Submit
                            </button>
                        ) : (
                            <button
                                className="next"
                                onClick={()=>{
                                    console.log("Correct Answer:", question[currentQuestionIndex].correct_answers);
                                    setCurrentQuestionIndex((prevIndex)=>Math.min(prevIndex+1,question.length-1))}}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Quiz;