import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import styled from 'styled-components'
import { FaVolumeUp, FaBookmark, FaStar, FaArrowLeft } from 'react-icons/fa'

const WordDetailContainer = styled.div`
  margin: var(--spacing-xl) 0;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
  
  svg {
    margin-right: var(--spacing-xs);
  }
  
  &:hover {
    color: var(--color-primary);
  }
`

const WordCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
`

const WordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
`

const WordTitle = styled.div`
  flex: 1;
`

const WordFrench = styled.h1`
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
`

const WordCategory = styled.span`
  display: inline-block;
  background-color: var(--color-light);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  margin-right: var(--spacing-sm);
`

const WordDifficulty = styled.span`
  display: inline-block;
  background-color: ${({ level }) => {
    switch (level) {
      case 'beginner': return '#e6f7ff';
      case 'intermediate': return '#fff7e6';
      case 'advanced': return '#fff1f0';
      default: return '#f0f0f0';
    }
  }};
  color: ${({ level }) => {
    switch (level) {
      case 'beginner': return '#0050b3';
      case 'intermediate': return '#ad8b00';
      case 'advanced': return '#cf1322';
      default: return '#333';
    }
  }};
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
`

const WordActions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-white)')};
  color: ${({ active }) => (active ? 'var(--color-white)' : 'var(--color-primary)')};
  border: 1px solid var(--color-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? '#3a4d80' : 'rgba(43, 58, 103, 0.1)')};
  }
`

const WordContent = styled.div`
  margin-bottom: var(--spacing-lg);
`

const TranslationSection = styled.div`
  margin-bottom: var(--spacing-lg);
`

const TranslationTitle = styled.h3`
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  font-size: 1.2rem;
`

const TranslationText = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-text);
`

const PronunciationSection = styled.div`
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
`

const PronunciationText = styled.p`
  font-style: italic;
  color: var(--color-text-light);
  margin-right: var(--spacing-md);
  font-size: 1.1rem;
`

const PronunciationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent);
  color: var(--color-white);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  
  &:hover {
    background-color: #77aaa9;
  }
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-light);
  margin: var(--spacing-lg) 0;
`

const ExamplesSection = styled.div`
  margin-bottom: var(--spacing-lg);
`

const ExamplesList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ExampleItem = styled.li`
  margin-bottom: var(--spacing-md);
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ExampleFrench = styled.p`
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
`

const ExamplePolish = styled.p`
  color: var(--color-text);
  font-style: italic;
`

const RelatedWordsSection = styled.div`
  margin-top: var(--spacing-xl);
`

const RelatedWordsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const RelatedWordCard = styled(Link)`
  display: block;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--color-text);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
`

const RelatedWordFrench = styled.h4`
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
`

const RelatedWordPolish = styled.p`
  color: var(--color-text);
  font-size: 0.9rem;
`

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid var(--color-primary);
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const NotFoundState = styled.div`
  text-align: center;
  padding: var(--spacing-xl) 0;
  
  h2 {
    margin-bottom: var(--spacing-md);
  }
  
  p {
    color: var(--color-text-light);
    margin-bottom: var(--spacing-lg);
  }
  
  a {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--border-radius-md);
    text-decoration: none;
    
    &:hover {
      background-color: #3a4d80;
    }
  }
`

function WordDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [word, setWord] = useState(null)
  const [relatedWords, setRelatedWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  
  useEffect(() => {
    fetchWordDetails()
  }, [id])
  
  useEffect(() => {
    if (user && word) {
      checkUserInteractions()
    }
  }, [user, word])
  
  const fetchWordDetails = async () => {
    setLoading(true)
    
    try {
      // Fetch the word details
      const { data: wordData, error: wordError } = await supabase
        .from('french_words')
        .select('*')
        .eq('id', id)
        .single()
      
      if (wordError) throw wordError
      
      setWord(wordData)
      
      // Fetch related words (same category)
      if (wordData) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('french_words')
          .select('id, french, polish, category')
          .eq('category', wordData.category)
          .neq('id', id)
          .limit(4)
        
        if (relatedError) throw relatedError
        
        setRelatedWords(relatedData || [])
      }
    } catch (error) {
      console.error('Error fetching word details:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const checkUserInteractions = async () => {
    try {
      // Check if word is saved
      const { data: savedData, error: savedError } = await supabase
        .from('saved_words')
        .select('*')
        .eq('user_id', user.id)
        .eq('word_id', id)
        .single()
      
      if (!savedError) {
        setIsSaved(true)
      }
      
      // Check if word is favorite
      const { data: favoriteData, error: favoriteError } = await supabase
        .from('favorite_words')
        .select('*')
        .eq('user_id', user.id)
        .eq('word_id', id)
        .single()
      
      if (!favoriteError) {
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error checking user interactions:', error)
    }
  }
  
  const toggleSaved = async () => {
    if (!user) return
    
    try {
      if (isSaved) {
        // Remove from saved
        const { error } = await supabase
          .from('saved_words')
          .delete()
          .eq('user_id', user.id)
          .eq('word_id', id)
        
        if (error) throw error
        
        setIsSaved(false)
      } else {
        // Add to saved
        const { error } = await supabase
          .from('saved_words')
          .insert([
            { user_id: user.id, word_id: id }
          ])
        
        if (error) throw error
        
        setIsSaved(true)
      }
    } catch (error) {
      console.error('Error toggling saved status:', error)
    }
  }
  
  const toggleFavorite = async () => {
    if (!user) return
    
    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorite_words')
          .delete()
          .eq('user_id', user.id)
          .eq('word_id', id)
        
        if (error) throw error
        
        setIsFavorite(false)
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorite_words')
          .insert([
            { user_id: user.id, word_id: id }
          ])
        
        if (error) throw error
        
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error)
    }
  }
  
  const playPronunciation = () => {
    // In a real app, this would play an audio file
    // For this example, we'll use the browser's speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.french)
      utterance.lang = 'fr-FR'
      window.speechSynthesis.speak(utterance)
    }
  }
  
  if (loading) {
    return (
      <LoadingState>
        <div className="spinner"></div>
      </LoadingState>
    )
  }
  
  if (!word) {
    return (
      <NotFoundState>
        <h2>Word Not Found</h2>
        <p>The word you're looking for doesn't exist or has been removed.</p>
        <Link to="/dictionary">Back to Dictionary</Link>
      </NotFoundState>
    )
  }
  
  return (
    <WordDetailContainer>
      <BackLink to="/dictionary">
        <FaArrowLeft /> Back to Dictionary
      </BackLink>
      
      <WordCard>
        <WordHeader>
          <WordTitle>
            <WordFrench>{word.french}</WordFrench>
            <div>
              <WordCategory>{word.category}</WordCategory>
              <WordDifficulty level={word.difficulty}>
                {word.difficulty.charAt(0).toUpperCase() + word.difficulty.slice(1)}
              </WordDifficulty>
            </div>
          </WordTitle>
          
          <WordActions>
            <ActionButton 
              active={isSaved} 
              onClick={toggleSaved}
              title={isSaved ? "Remove from saved words" : "Save word"}
            >
              <FaBookmark />
            </ActionButton>
            <ActionButton 
              active={isFavorite} 
              onClick={toggleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FaStar />
            </ActionButton>
          </WordActions>
        </WordHeader>
        
        <WordContent>
          <TranslationSection>
            <TranslationTitle>Polish Translation:</TranslationTitle>
            <TranslationText>{word.polish}</TranslationText>
          </TranslationSection>
          
          <PronunciationSection>
            <PronunciationText>[{word.pronunciation}]</PronunciationText>
            <PronunciationButton onClick={playPronunciation} title="Listen to pronunciation">
              <FaVolumeUp />
            </PronunciationButton>
          </PronunciationSection>
          
          <Divider />
          
          <ExamplesSection>
            <h3>Example Sentences:</h3>
            <ExamplesList>
              {word.examples && word.examples.map((example, index) => (
                <ExampleItem key={index}>
                  <ExampleFrench>{example.french}</ExampleFrench>
                  <ExamplePolish>{example.polish}</ExamplePolish>
                </ExampleItem>
              ))}
            </ExamplesList>
          </ExamplesSection>
        </WordContent>
      </WordCard>
      
      {relatedWords.length > 0 && (
        <RelatedWordsSection>
          <h2>Related Words</h2>
          <RelatedWordsGrid>
            {relatedWords.map(relatedWord => (
              <RelatedWordCard key={relatedWord.id} to={`/dictionary/${relatedWord.id}`}>
                <RelatedWordFrench>{relatedWord.french}</RelatedWordFrench>
                <RelatedWordPolish>{relatedWord.polish}</RelatedWordPolish>
              </RelatedWordCard>
            ))}
          </RelatedWordsGrid>
        </RelatedWordsSection>
      )}
    </WordDetailContainer>
  )
}

export default WordDetail
