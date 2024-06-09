import React from 'react';
import './Question.css';

interface Props {
  id: number;
  questionText: string;
  correctAnswerIndex: number;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  onOptionClick: (id: number, selectedIndex: number) => void;
}

export function Question(props: Props) {
  const { id, questionText, answer1, answer2, answer3, answer4, correctAnswerIndex, onOptionClick } = props;

  return (
    <div className="question">
      <h2>{questionText}</h2>
      <div className="options">
        <button
          onClick={() => onOptionClick(id, 0)}
          className={`option-button ${correctAnswerIndex === 0 ? 'correct-answer' : ''}`}
        >
          {answer1}
        </button>
        <button
          onClick={() => onOptionClick(id, 1)}
          className={`option-button ${correctAnswerIndex === 1 ? 'correct-answer' : ''}`}
        >
          {answer2}
        </button>
        <button
          onClick={() => onOptionClick(id, 2)}
          className={`option-button ${correctAnswerIndex === 2 ? 'correct-answer' : ''}`}
        >
          {answer3}
        </button>
        <button
          onClick={() => onOptionClick(id, 3)}
          className={`option-button ${correctAnswerIndex === 3 ? 'correct-answer' : ''}`}
        >
          {answer4}
        </button>
      </div>
    </div>
  );
}
