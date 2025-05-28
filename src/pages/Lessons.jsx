import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaGraduationCap, FaLock, FaCheck, FaPlay } from 'react-icons/fa'

const LessonsContainer = styled.div`
  margin: var(--spacing-xl) 0;
`

const LessonsHeader = styled.div`
  margin-bottom: var(--spacing-xl);
`

const LessonsTitle = styled.h1`
  margin-bottom: var(--spacing-sm);
`

const LessonsDescription = styled.p`
  color: var(--color-text-light);
  max-width: 800px;
`

const LevelsContainer = styled.div`
  margin-bottom: var(--spacing-xl);
`

const LevelTabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-light);
  margin-bottom: var(--spacing-lg);
`

const LevelTab = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active }) => (active ? 'var(--color-primary)' : 'transparent')};
  color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-text)')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`

const LessonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const LessonCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`

const LessonImage = styled.div`
  height: 160px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${LessonCard}:hover & img {
    transform: scale(1.05);
  }
`

const LessonContent = styled.div`
  padding: var(--spacing-lg);
`

const LessonTitle = styled.h3`
  margin-bottom: var(--spacing-xs);
  display: flex;
  align-items: center;
  
  svg {
    margin-left: var(--spacing-xs);
    color: ${({ locked }) => (locked ? 'var(--color-text-light)' : 'var(--color-success)')};
  }
`

const LessonDescription = styled.p`
  color: var(--color-text-light);
  font-size: 0.95rem;
  margin-bottom: var(--spacing-md);
`

const LessonMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
`

const LessonButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: ${({ locked }) => (locked ? 'var(--color-text-light)' : 'var(--color-primary)')};
  color: var(--color-white);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: 500;
  cursor: ${({ locked }) => (locked ? 'not-allowed' : 'pointer')};
  opacity: ${({ locked }) => (locked ? '0.7' : '1')};
  pointer-events: ${({ locked }) => (locked ? 'none' : 'auto')};
  
  svg {
    margin-right: var(--spacing-xs);
  }
  
  &:hover {
    background-color: ${({ locked }) => (locked ? 'var(--color-text-light)' : '#3a4d80')};
  }
`

const ProgressBar = styled.div`
  height: 6px;
  background-color: var(--color-light);
  border-radius: 3px;
  margin-bottom: var(--spacing-sm);
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: var(--color-success);
  border-radius: 3px;
`

const ProgressText = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-light);
  text-align: right;
`

function Lessons() {
  const [activeLevel, setActiveLevel] = useState('beginner')
  
  // Sample lesson data
  const lessons = {
    beginner: [
      {
        id: 1,
        title: 'Basic Greetings',
        description: 'Learn essential French greetings and introductions.',
        image: 'https://images.pexels.com/photos/7096339/pexels-photo-7096339.jpeg',
        duration: '20 min',
        wordsCount: 15,
        progress: 100,
        completed: true,
        locked: false
      },
      {
        id: 2,
        title: 'Numbers 1-20',
        description: 'Master counting in French from one to twenty.',
        image: 'https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg',
        duration: '25 min',
        wordsCount: 20,
        progress: 75,
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: 'Common Phrases',
        description: 'Learn everyday expressions used in French conversations.',
        image: 'https://images.pexels.com/photos/5831017/pexels-photo-5831017.jpeg',
        duration: '30 min',
        wordsCount: 25,
        progress: 40,
        completed: false,
        locked: false
      },
      {
        id: 4,
        title: 'Food & Drinks',
        description: 'Essential vocabulary for ordering food and drinks in French.',
        image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg',
        duration: '35 min',
        wordsCount: 30,
        progress: 0,
        completed: false,
        locked: false
      },
      {
        id: 5,
        title: 'Family Members',
        description: 'Learn how to talk about your family in French.',
        image: 'https://images.pexels.com/photos/7262384/pexels-photo-7262384.jpeg',
        duration: '25 min',
        wordsCount: 20,
        progress: 0,
        completed: false,
        locked: true
      },
      {
        id: 6,
        title: 'Colors & Shapes',
        description: 'Basic vocabulary for colors and shapes in French.',
        image: 'https://images.pexels.com/photos/5428835/pexels-photo-5428835.jpeg',
        duration: '20 min',
        wordsCount: 15,
        progress: 0,
        completed: false,
        locked: true
      }
    ],
    intermediate: [
      {
        id: 7,
        title: 'Past Tense Verbs',
        description: 'Master the passé composé and imparfait tenses.',
        image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
        duration: '45 min',
        wordsCount: 40,
        progress: 0,
        completed: false,
        locked: true
      },
      {
        id: 8,
        title: 'Travel Vocabulary',
        description: 'Essential words and phrases for traveling in French-speaking countries.',
        image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
        duration: '40 min',
        wordsCount: 35,
        progress: 0,
        completed: false,
        locked: true
      },
      {
        id: 9,
        title: 'Describing People',
        description: 'Learn to describe physical appearance and personality traits.',
        image: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg',
        duration: '35 min',
        wordsCount: 30,
        progress: 0,
        completed: false,
        locked: true
      }
    ],
    advanced: [
      {
        id: 10,
        title: 'Business French',
        description: 'Professional vocabulary for workplace and business settings.',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        duration: '60 min',
        wordsCount: 50,
        progress: 0,
        completed: false,
        locked: true
      },
      {
        id: 11,
        title: 'Subjunctive Mood',
        description: 'Master the complex subjunctive mood in French.',
        image: 'https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg',
        duration: '55 min',
        wordsCount: 45,
        progress: 0,
        completed: false,
        locked: true
      }
    ]
  }
  
  return (
    <LessonsContainer>
      <LessonsHeader>
        <LessonsTitle>French Lessons</LessonsTitle>
        <LessonsDescription>
          Structured lessons to help you master French vocabulary, grammar, and pronunciation. 
          Each lesson focuses on a specific topic and includes vocabulary, example sentences, 
          and interactive exercises.
        </LessonsDescription>
      </LessonsHeader>
      
      <LevelsContainer>
        <LevelTabs>
          <LevelTab 
            active={activeLevel === 'beginner'} 
            onClick={() => setActiveLevel('beginner')}
          >
            Beginner
          </LevelTab>
          <LevelTab 
            active={activeLevel === 'intermediate'} 
            onClick={() => setActiveLevel('intermediate')}
          >
            Intermediate
          </LevelTab>
          <LevelTab 
            active={activeLevel === 'advanced'} 
            onClick={() => setActiveLevel('advanced')}
          >
            Advanced
          </LevelTab>
        </LevelTabs>
        
        <LessonsGrid>
          {lessons[activeLevel].map(lesson => (
            <LessonCard key={lesson.id}>
              <LessonImage>
                <img src={lesson.image} alt={lesson.title} />
              </LessonImage>
              <LessonContent>
                <LessonTitle locked={lesson.locked}>
                  {lesson.title}
                  {lesson.locked ? <FaLock /> : lesson.completed ? <FaCheck /> : null}
                </LessonTitle>
                <LessonDescription>{lesson.description}</LessonDescription>
                <LessonMeta>
                  <span>{lesson.duration}</span>
                  <span>{lesson.wordsCount} words</span>
                </LessonMeta>
                
                {!lesson.locked && (
                  <>
                    <ProgressBar>
                      <ProgressFill progress={lesson.progress} />
                    </ProgressBar>
                    <ProgressText>{lesson.progress}% complete</ProgressText>
                  </>
                )}
                
                <LessonButton 
                  to={`/lessons/${lesson.id}`} 
                  locked={lesson.locked}
                >
                  {lesson.locked ? (
                    <>
                      <FaLock /> Unlock
                    </>
                  ) : lesson.completed ? (
                    <>
                      <FaPlay /> Review
                    </>
                  ) : lesson.progress > 0 ? (
                    <>
                      <FaPlay /> Continue
                    </>
                  ) : (
                    <>
                      <FaPlay /> Start
                    </>
                  )}
                </LessonButton>
              </LessonContent>
            </LessonCard>
          ))}
        </LessonsGrid>
      </LevelsContainer>
    </LessonsContainer>
  )
}

export default Lessons
