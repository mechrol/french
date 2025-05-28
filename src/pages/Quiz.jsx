import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaCheck, FaTimes, FaRedo, FaTrophy, FaArrowRight } from 'react-icons/fa'

const QuizContainer = styled.div`
  margin: var(--spacing-xl) 0;
`

const QuizHeader = styled.div`
  margin-bottom: var(--spacing-xl);
  text-align: center;
`

const QuizTitle = styled.h1`
  margin-bottom: var(--spacing-sm);
`

const QuizDescription = styled.p`
  color: var(--color-text-light);
  max-width: 800px;
  margin: 0 auto;
`

const QuizCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
`

const ProgressBar = styled.div`
  height: 8px;
  background-color: var(--color-light);
  border-radius: 4px;
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: var(--color-primary);
  border-radius: 4px;
  transition: width 0.3s ease;
`

const QuestionContainer = styled.div`
  margin-bottom: var(--spacing-lg);
`

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
`

const QuestionNumber = styled.span`
  font-weight: 500;
  color: var(--color-text-light);
`

const QuestionType = styled.span`
  font-weight: 500;
  color: var(--color-accent);
`

const QuestionText = styled.h2`
  margin-bottom: var(--spacing-lg);
  font-size: 1.8rem;
  color: var(--color-primary);
`

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
`

const OptionButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: 2px solid ${({ selected, correct, incorrect }) => {
    if (correct) return 'var(--color-success)';
    if (incorrect) return 'var(--color-error)';
    if (selected) return 'var(--color-primary)';
    return 'var(--color-light)';
  }};
  background-color: ${({ selected, correct, incorrect }) => {
    if (correct) return 'rgba(46, 204, 113, 0.1)';
    if (incorrect) return 'rgba(231, 76, 60, 0.1)';
    if (selected) return 'rgba(43, 58, 103, 0.1)';
    return 'var(--color-white)';
  }};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background-color: ${({ disabled, correct, incorrect }) => {
      if (disabled) {
        if (correct) return 'rgba(46, 204, 113, 0.1)';
        if (incorrect) return 'rgba(231, 76, 60, 0.1)';
        return 'rgba(43, 58, 103, 0.1)';
      }
      return 'var(--color-light)';
    }};
  }
`

const OptionText = styled.span`
  font-size: 1.1rem;
  color: var(--color-text);
`

const OptionIcon = styled.span`
  position: absolute;
  right: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: ${({ correct }) => (correct ? 'var(--color-success)' : 'var(--color-error)')};
`

const FeedbackContainer = styled.div`
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: ${({ correct }) => (correct ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)')};
  border: 1px solid ${({ correct }) => (correct ? 'var(--color-success)' : 'var(--color-error)')};
  display: flex;
  align-items: center;
`

const FeedbackIcon = styled.span`
  font-size: 1.5rem;
  margin-right: var(--spacing-md);
  color: ${({ correct }) => (correct ? 'var(--color-success)' : 'var(--color-error)')};
`

const FeedbackText = styled.p`
  margin: 0;
  color: var(--color-text);
`

const QuizActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xl);
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  
  &.primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    
    &:hover {
      background-color: #3a4d80;
    }
    
    svg {
      margin-left: var(--spacing-sm);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover {
      background-color: rgba(43, 58, 103, 0.1);
    }
    
    svg {
      margin-right: var(--spacing-sm);
    }
  }
`

const ResultsCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const ResultsIcon = styled.div`
  font-size: 4rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
`

const ResultsTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  font-size: 2rem;
  color: var(--color-primary);
`

const ResultsScore = styled.div`
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  
  span {
    font-weight: 700;
    color: ${({ score }) => {
      if (score >= 80) return 'var(--color-success)';
      if (score >= 60) return 'var(--color-warning)';
      return 'var(--color-error)';
    }};
  }
`

const ResultsMessage = styled.p`
  color: var(--color-text);
  margin-bottom: var(--spacing-xl);
  font-size: 1.1rem;
`

const ResultsActions = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  // Sample quiz data
  const quizQuestions = [
    {
      id: 1,
      type: 'French to Polish',
      question: 'bonjour',
      options: [
        { id: 'a', text: 'dzień dobry' },
        { id: 'b', text: 'do widzenia' },
        { id: 'c', text: 'dziękuję' },
        { id: 'd', text: 'przepraszam' }
      ],
      correctAnswer: 'a',
      feedback: {
        correct: 'Correct! "Bonjour" means "dzień dobry" in Polish.',
        incorrect: 'Incorrect. "Bonjour" means "dzień dobry" in Polish.'
      }
    },
    {
      id: 2,
      type: 'Polish to French',
      question: 'dziękuję',
      options: [
        { id: 'a', text: 'bonjour' },
        { id: 'b', text: 'au revoir' },
        { id: 'c', text: 'merci' },
        { id: 'd', text: 'excusez-moi' }
      ],
      correctAnswer: 'c',
      feedback: {
        correct: 'Correct! "Dziękuję" means "merci" in French.',
        incorrect: 'Incorrect. "Dziękuję" means "merci" in French.'
      }
    },
    {
      id: 3,
      type: 'French to Polish',
      question: 'maison',
      options: [
        { id: 'a', text: 'samochód' },
        { id: 'b', text: 'dom' },
        { id: 'c', text: 'książka' },
        { id: 'd', text: 'szkoła' }
      ],
      correctAnswer: 'b',
      feedback: {
        correct: 'Correct! "Maison" means "dom" in Polish.',
        incorrect: 'Incorrect. "Maison" means "dom" in Polish.'
      }
    },
    {
      id: 4,
      type: 'Polish to French',
      question: 'woda',
      options: [
        { id: 'a', text: 'pain' },
        { id: 'b', text: 'vin' },
        { id: 'c', text: 'lait' },
        { id: 'd', text: 'eau' }
      ],
      correctAnswer: 'd',
      feedback: {
        correct: 'Correct! "Woda" means "eau" in French.',
        incorrect: 'Incorrect. "Woda" means "eau" in French.'
      }
    },
    {
      id: 5,
      type: 'French to Polish',
      question: 'chat',
      options: [
        { id: 'a', text: 'pies' },
        { id: 'b', text: 'kot' },
        { id: 'c', text: 'ptak' },
        { id: 'd', text: 'ryba' }
      ],
      correctAnswer: 'b',
      feedback: {
        correct: 'Correct! "Chat" means "kot" in Polish.',
        incorrect: 'Incorrect. "Chat" means "kot" in Polish.'
      }
    }
  ]
  
  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
  }
  
  const handleOptionSelect = (optionId) => {
    if (showFeedback) return
    
    setSelectedOption(optionId)
    setShowFeedback(true)
    
    const currentQuiz = quizQuestions[currentQuestion]
    if (optionId === currentQuiz.correctAnswer) {
      setScore(prevScore => prevScore + 1)
    }
  }
  
  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }
  
  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setScore(0)
    setQuizCompleted(false)
  }
  
  const currentQuiz = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const scorePercentage = (score / quizQuestions.length) * 100
  
  const getResultMessage = () => {
    if (scorePercentage >= 80) {
      return "Excellent! You have a great understanding of French vocabulary. Keep up the good work!";
    } else if (scorePercentage >= 60) {
      return "Good job! You're making progress with your French vocabulary. Continue practicing to improve further.";
    } else {
      return "Keep practicing! Learning a new language takes time. Review the words you missed and try again.";
    }
  }
  
  if (!quizStarted) {
    return (
      <QuizContainer>
        <QuizHeader>
          <QuizTitle>French Vocabulary Quiz</QuizTitle>
          <QuizDescription>
            Test your knowledge of French vocabulary with this interactive quiz. 
            Translate words between French and Polish and see how well you know the most common words.
          </QuizDescription>
        </QuizHeader>
        
        <QuizCard>
          <h2>Ready to Test Your French?</h2>
          <p>This quiz contains 5 questions testing your knowledge of French-Polish translations.</p>
          <p>You'll be asked to translate words from French to Polish and vice versa.</p>
          <p>See how many you can get right!</p>
          
          <ActionButton className="primary" onClick={startQuiz}>
            Start Quiz <FaArrowRight />
          </ActionButton>
        </QuizCard>
      </QuizContainer>
    )
  }
  
  if (quizCompleted) {
    return (
      <QuizContainer>
        <QuizHeader>
          <QuizTitle>Quiz Results</QuizTitle>
        </QuizHeader>
        
        <ResultsCard>
          <ResultsIcon>
            <FaTrophy />
          </ResultsIcon>
          <ResultsTitle>Quiz Completed!</ResultsTitle>
          <ResultsScore score={scorePercentage}>
            Your score: <span>{score}</span> out of {quizQuestions.length} ({Math.round(scorePercentage)}%)
          </ResultsScore>
          <ResultsMessage>
            {getResultMessage()}
          </ResultsMessage>
          <ResultsActions>
            <ActionButton className="secondary" onClick={restartQuiz}>
              <FaRedo /> Try Again
            </ActionButton>
            <ActionButton className="primary" onClick={() => setQuizStarted(false)}>
              Back to Quizzes <FaArrowRight />
            </ActionButton>
          </ResultsActions>
        </ResultsCard>
      </QuizContainer>
    )
  }
  
  return (
    <QuizContainer>
      <QuizHeader>
        <QuizTitle>French Vocabulary Quiz</QuizTitle>
      </QuizHeader>
      
      <QuizCard>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        
        <QuestionContainer>
          <QuestionHeader>
            <QuestionNumber>Question {currentQuestion + 1} of {quizQuestions.length}</QuestionNumber>
            <QuestionType>{currentQuiz.type}</QuestionType>
          </QuestionHeader>
          
          <QuestionText>{currentQuiz.question}</QuestionText>
          
          <OptionsContainer>
            {currentQuiz.options.map(option => (
              <OptionButton
                key={option.id}
                selected={selectedOption === option.id}
                correct={showFeedback && option.id === currentQuiz.correctAnswer}
                incorrect={showFeedback && selectedOption === option.id && option.id !== currentQuiz.correctAnswer}
                disabled={showFeedback}
                onClick={() => handleOptionSelect(option.id)}
              >
                <OptionText>{option.text}</OptionText>
                {showFeedback && option.id === currentQuiz.correctAnswer && (
                  <OptionIcon correct>
                    <FaCheck />
                  </OptionIcon>
                )}
                {showFeedback && selectedOption === option.id && option.id !== currentQuiz.correctAnswer && (
                  <OptionIcon>
                    <FaTimes />
                  </OptionIcon>
                )}
              </OptionButton>
            ))}
          </OptionsContainer>
          
          {showFeedback && (
            <FeedbackContainer correct={selectedOption === currentQuiz.correctAnswer}>
              <FeedbackIcon correct={selectedOption === currentQuiz.correctAnswer}>
                {selectedOption === currentQuiz.correctAnswer ? <FaCheck /> : <FaTimes />}
              </FeedbackIcon>
              <FeedbackText>
                {selectedOption === currentQuiz.correctAnswer
                  ? currentQuiz.feedback.correct
                  : currentQuiz.feedback.incorrect}
              </FeedbackText>
            </FeedbackContainer>
          )}
        </QuestionContainer>
        
        <QuizActions>
          {showFeedback && (
            <ActionButton className="primary" onClick={handleNextQuestion}>
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'} <FaArrowRight />
            </ActionButton>
          )}
        </QuizActions>
      </QuizCard>
    </QuizContainer>
  )
}

export default Quiz
