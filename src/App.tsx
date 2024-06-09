import React, { useState, useEffect } from 'react';
import './App.css';
import './components/question/FinalResults.css';

import { Question } from './components/question/question';
import { QuestionData } from './interface/QuestionData';

function App() {
  const [data, setData] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);

  const handleStartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameInProgress(true);
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameInProgress(true);
  };

  useEffect(() => {
    fetch('http://localhost:8080/questions')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar questões:', error);
        setLoading(false);
      });
  }, []);

  const handleOptionClick = (id: number, selectedIndex: number) => {
    const currentQuestion = data[currentQuestionIndex];
    if (currentQuestion && selectedIndex === currentQuestion.correctAnswerIndex) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }, 100); //Adia a atualização do Score pra funcionar corretamente
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <header>
        <h1>Quiz Game</h1>
      </header>
      <main>
        <section className="question-section">
          {gameInProgress ? (
            data.length > 0 && currentQuestionIndex < data.length ? (
              <Question
                id={data[currentQuestionIndex].id}
                questionText={data[currentQuestionIndex].questionText}
                correctAnswerIndex={data[currentQuestionIndex].correctAnswerIndex}
                answer1={data[currentQuestionIndex].answer1}
                answer2={data[currentQuestionIndex].answer2}
                answer3={data[currentQuestionIndex].answer3}
                answer4={data[currentQuestionIndex].answer4}
                onOptionClick={handleOptionClick}
              />
            ) : (
              <div>
                <p className="quiz-completed">Quiz completed!</p>
                <p className="score">Your score: {score}/{data.length}</p>
              </div>
            )
          ) : (
            <button onClick={() => handleStartGame()}>Start Game</button>
          )}
        </section>
      </main>
      <footer>
        <p>Developed by FelipeUCAA</p>
        {gameInProgress && currentQuestionIndex === data.length && (
          <button onClick={() => handleRestartGame()}>Restart Game</button>
        )}
      </footer>
    </div>
  );
}

export default App;
