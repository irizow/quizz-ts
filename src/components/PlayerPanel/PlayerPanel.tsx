import styles from './playerpanel.module.css'
import { useState, useEffect, startTransition } from 'react';
import backArrow from '../../assets/images/back-arrow.svg';
import timerIcon from '../../assets/images/timer.svg'
import starIcon from '../../assets/images/star.svg'

interface PlayerPanelProps {
    score: number; 
  }

export default function PlayerPanel({score}: PlayerPanelProps) {
    const goal : number = 60;
    const [time, setTime] = useState<number>(goal);

    const calculateStars = (score: number) => {
        if (score > 15) return 3;
        if (score > 8) return 2;
        if (score > 3) return 1;
        return 0;
      };

    const stars = calculateStars(score);

    useEffect(()=> {
        if(time > 0){
        const interval = setInterval(()=> {
            setTime((Prevtime) => Prevtime - 1 )
        }, 1000)
       
         return () => clearInterval(interval)
    }
    }, [time])
    return (
        <>
        <div className={styles.playerpanel}>
            <a href="/" aria-label="Go back to home">
                <img src={backArrow} alt=""></img>
            </a>
            <div>
                <div className={styles.timerdiv}>
                <img src={timerIcon} alt='timer icon'></img>
                <p>time: <span style={time < 10 ? {color: 'rgb(194, 82, 82)', fontWeight: '700'} : {color: ''}}>{time}</span></p>
                </div>
                <p>score: {score}</p>
            </div>
        </div>
        {time === 0 &&
        <div className={styles.winnermodal}>
            <div>
                <h3>{stars>15 ? 'AMAZING!' : stars>10 ? 'WELL DONE"' : 'NOT BAD'}</h3>
                {Array.from({ length: stars }).map((star, index) => (
                <img key={index} src={starIcon} alt={`Star ${index + 1}`} />
                ))}
                <p>You answered {score} questions correctly in {goal} seconds!</p>
                <a href='/'>Try Again</a>
            </div>
        </div>}
        </>
    )
}