import styles from './questions.module.css'
import PlayerPanel from '../../components/PlayerPanel/PlayerPanel';
import { useEffect, useState } from 'react';
import { Question } from '../../utils/interfaces';
import QuestionCard from '../../components/QuestionCard/QuestionCard';

interface QuestionProps {
    category: 'javascript' | 'react' | 'typescript' | 'mixed' | null
}




export default function Questions({category} : QuestionProps) {
    const [quizQuestions, setQuizQuestions] = useState<Question[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [score, setScore] = useState<number>(0);
    const [currQuestion, setCurrQuestion] = useState<number>(Math.floor(Math.random() * 6 ));
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/questions.json');
                if(!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data: Question[] = await response.json();
                setQuizQuestions(data);
                console.log(data);
            } catch (err: any) {
                setError(err.message)
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [])

    const filteredQuestions: Question[] | null | undefined  = category === 'mixed' ? quizQuestions : quizQuestions?.filter((question) => question.category === category || null);

    const getRandomIndex = (length: number) => Math.floor(Math.random() * length);
    
    const nextQuestion = ()=> {
        if(filteredQuestions && filteredQuestions.length > 0) {
            const randomQuestion = getRandomIndex(filteredQuestions.length);
            setCurrQuestion(randomQuestion);
            setIsCorrect(undefined);
            setSelectedAnswer(null);
        }
    }
    
    if(loading) return <div>Loading ... </div>
    if(error) return <div>Error: {error}</div>

    return (
        <section className={styles.questions}>
           <PlayerPanel score={score} />
            {filteredQuestions && filteredQuestions.length > 0 ? (
                <>
                <QuestionCard questionDetail={filteredQuestions[currQuestion]} score={score} setScore={setScore} isCorrect={isCorrect} setIsCorrect={setIsCorrect} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} />
                </>
            
            ) : (
                <div>No questions available</div>
            )}
            <button disabled={isCorrect !== undefined ? false : true} onClick={nextQuestion}>Next Question</button>
        </section>
    )
}