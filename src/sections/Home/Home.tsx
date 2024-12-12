import { useState } from "react";
import styles from './home.module.css';
import { Link } from "react-router-dom";
import javaScriptLogo from '../../assets/images/javascript-logo.svg'
import typeScriptLogo from '../../assets/images/typescript-logo.svg'
import reactLogo from '../../assets/images/react-logo.svg'
import mixedIcon from '../../assets/images/shuffle-logo.svg'

interface HomeProps {
    setCategory: (category: "javascript" | "typescript" | "react" | "mixed" | null) => void;
}

export default function Home({setCategory} : HomeProps) {

    return (
        <section className={styles.home}>
            <div>
                <h1>Test Your <span>Frontend</span> Knowledge!</h1>
                <span>How many correct answers can you get in 1 minute?</span>
            </div>
            <div>
                <h3>What do you want to test?</h3>
                <div className={styles.categorywrapper}>
                    <img src={javaScriptLogo} onClick={()=>setCategory('javascript')} alt='javascript logo'></img>
                    <img src={typeScriptLogo } onClick={()=>setCategory('typescript')} alt='typescript logo'></img>
                    <img src={reactLogo} onClick={()=>setCategory('react')} alt='react logo'></img>
                    <img src={mixedIcon} onClick={()=>setCategory('mixed')} alt='shuffle logo'></img>
                </div>

            </div>
        </section>

    )
}