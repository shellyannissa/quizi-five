import React, {useState, useEffect} from 'react'
import "./AnswerCard.css"
import { Button } from '../Button/Button';
import { BarGraph } from '../BarGraph/BarGraph';
import { Answers } from '../Answers/Answers';

export const AnswerCard = ({options, correctOption, initCounts}) => {
  
    const [ selectedOption, setSelectedOption ] = useState(null);
    const [counts, setCounts] = useState(initCounts);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setCounts(initCounts);
        setSelectedOption(null);
        setFlipped(false);
    },[initCounts]);

    const handleOptionClick = (index) => {
        if(selectedOption === null){
            setSelectedOption(index);
            const updatedCounts = [...counts];
            updatedCounts[index] += 1;
            counts[index] += 1;
            totalVotes += 1;
            setCounts(updatedCounts);
            setFlipped(!flipped);
        }
    };

    const makeRandom = () => {
        const randomizedCounts = counts.map(() => Math.floor(Math.random() * 100)); 
        setCounts(randomizedCounts);
        // setSelectedOption(null); 
    };

    const isCorrect = (index) => {
        return selectedOption === index && selectedOption === correctOption;
    };

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    let totalVotes = counts.reduce((acc,votes) => acc+votes, 0);
    console.log(counts);
    console.log(totalVotes);

    return (
        <div>
            <div>
                {options.map((option, index) => (
                        (flipped ? <BarGraph counts={counts} totalVotes={totalVotes} selectedOption={selectedOption} index={index} isCorrect={isCorrect}/> : <Answers option={option} handleOptionClick={handleOptionClick} isCorrect={isCorrect} selectedOption={selectedOption} index={index}/>)
                ))}
            </div>
            <div className="button-group">
                <Button text="randomize" clickHandler={makeRandom}/>
                <Button text="Flip" clickHandler={handleFlip}/>
            </div>
        </div>
  )
}
