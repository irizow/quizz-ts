import styles from './questioncard.module.css'
import { Question } from '../../utils/interfaces'

interface QuestionCardProps {
    questionDetail: Question; // Expect a full Question object
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    isCorrect: boolean | undefined;
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    selectedAnswer: number | null;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  }


export default function QuestionCard({questionDetail, score, setScore, isCorrect, setIsCorrect, selectedAnswer, setSelectedAnswer} : QuestionCardProps) {



    const handleSubmit : React.FormEventHandler<HTMLFormElement> = (e)=> {
        e.preventDefault();
        if(selectedAnswer === questionDetail.correctAnswerIndex) {
            setScore(score+1)
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
        }
    }

    return (
        <div className={styles.questioncard}>
            <h4>{questionDetail.question}</h4>
            <form onSubmit={handleSubmit}>
            {questionDetail.answers.map((answer, index)=> 
            <div className={(isCorrect && index === questionDetail.correctAnswerIndex) ? styles.correct : (isCorrect === false && selectedAnswer === index) ? styles.incorrect : ''}>
                <input 
                    name={'answer'} 
                    key={index} 
                    type='radio'
                    checked={selectedAnswer === index}
                    value={index} 
                    onChange={()=>setSelectedAnswer(index)}>
                </input>
                <label>
                {answer}
                </label>
            </div>)}
            <button disabled={isCorrect === undefined ? false : true} type='submit'>Check</button>
            </form>
            {isCorrect !== undefined &&
            <div className={styles.explanation}>
                <p>{isCorrect ? 'Yes!' : 'Almost, but'} {questionDetail.explanation}</p>
            </div>}
            
        </div>
        
    )
}