import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaUser, FaBook, FaStar, FaChartLine, FaEdit, FaTrash } from 'react-icons/fa'

const ProfileContainer = styled.div`
  margin: var(--spacing-xl) 0;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-lg);
  
  svg {
    font-size: 2.5rem;
    color: var(--color-white);
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: var(--spacing-md);
  }
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h1`
  margin-bottom: var(--spacing-xs);
`

const ProfileEmail = styled.p`
  color: var(--color-text-light);
`

const ProfileTabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-light);
  margin-bottom: var(--spacing-lg);
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-light);
    border-radius: 2px;
  }
`

const ProfileTab = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active }) => (active ? 'var(--color-primary)' : 'transparent')};
  color: ${({ active }) => (active ? 'var(--color-primary)' : 'var(--color-text)')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: var(--color-primary);
  }
`

const TabContent = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  text-align: center;
`

const StatIcon = styled.div`
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
`

const StatLabel = styled.div`
  color: var(--color-text-light);
  font-size: 0.9rem;
`

const WordsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const WordCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  position: relative;
`

const WordActions = styled.div`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  display: flex;
  gap: var(--spacing-xs);
`

const WordAction = styled.button`
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    color: ${({ remove }) => (remove ? 'var(--color-error)' : 'var(--color-primary)')};
  }
`

const WordFrench = styled(Link)`
  display: block;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: var(--spacing-xs);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

const WordPolish = styled.p`
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
`

const WordPronunciation = styled.p`
  color: var(--color-text-light);
  font-style: italic;
  font-size: 0.9rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xl) 0;
  
  h3 {
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

const ProgressSection = styled.div`
  margin-bottom: var(--spacing-xl);
`

const ProgressCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
`

const ProgressTitle = styled.h3`
  margin-bottom: var(--spacing-md);
`

const ProgressBar = styled.div`
  height: 8px;
  background-color: var(--color-light);
  border-radius: 4px;
  margin-bottom: var(--spacing-sm);
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ progress }) => {
    if (progress >= 80) return 'var(--color-success)';
    if (progress >= 40) return 'var(--color-warning)';
    return 'var(--color-primary)';
  }};
  border-radius: 4px;
`

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-light);
  font-size: 0.9rem;
`

function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('progress')
  const [savedWords, setSavedWords] = useState([])
  const [favoriteWords, setFavoriteWords] = useState([])
  const [stats, setStats] = useState({
    wordsLearned: 0,
    lessonsCompleted: 0,
    quizzesTaken: 0,
    daysStreak: 0
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])
  
  const fetchUserData = async () => {
    setLoading(true)
    
    try {
      // Fetch saved words
      const { data: savedData, error: savedError } = await supabase
        .from('saved_words')
        .select(`
          word_id,
          french_words (
            id,
            french,
            polish,
            pronunciation,
            category
          )
        `)
        .eq('user_id', user.id)
      
      if (savedError) throw savedError
      
      // Fetch favorite words
      const { data: favoriteData, error: favoriteError } = await supabase
        .from('favorite_words')
        .select(`
          word_id,
          french_words (
            id,
            french,
            polish,
            pronunciation,
            category
          )
        `)
        .eq('user_id', user.id)
      
      if (favoriteError) throw favoriteError
      
      // Fetch user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (!statsError && statsData) {
        setStats({
          wordsLearned: statsData.words_learned || 0,
          lessonsCompleted: statsData.lessons_completed || 0,
          quizzesTaken: statsData.quizzes_taken || 0,
          daysStreak: statsData.days_streak || 0
        })
      }
      
      setSavedWords(savedData?.map(item => item.french_words) || [])
      setFavoriteWords(favoriteData?.map(item => item.french_words) || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const removeSavedWord = async (wordId) => {
    try {
      const { error } = await supabase
        .from('saved_words')
        .delete()
        .eq('user_id', user.id)
        .eq('word_id', wordId)
      
      if (error) throw error
      
      setSavedWords(prev => prev.filter(word => word.id !== wordId))
    } catch (error) {
      console.error('Error removing saved word:', error)
    }
  }
  
  const removeFavoriteWord = async (wordId) => {
    try {
      const { error } = await supabase
        .from('favorite_words')
        .delete()
        .eq('user_id', user.id)
        .eq('word_id', wordId)
      
      if (error) throw error
      
      setFavoriteWords(prev => prev.filter(word => word.id !== wordId))
    } catch (error) {
      console.error('Error removing favorite word:', error)
    }
  }
  
  const renderWordsList = (words, removeFunction) => {
    if (words.length === 0) {
      return (
        <EmptyState>
          <h3>No words found</h3>
          <p>You haven't added any words to this list yet.</p>
          <Link to="/dictionary">Browse Dictionary</Link>
        </EmptyState>
      )
    }
    
    return (
      <WordsGrid>
        {words.map(word => (
          <WordCard key={word.id}>
            <WordActions>
              <WordAction remove onClick={() => removeFunction(word.id)}>
                <FaTrash />
              </WordAction>
            </WordActions>
            <WordFrench to={`/dictionary/${word.id}`}>{word.french}</WordFrench>
            <WordPolish>{word.polish}</WordPolish>
            <WordPronunciation>[{word.pronunciation}]</WordPronunciation>
          </WordCard>
        ))}
      </WordsGrid>
    )
  }
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>
          <FaUser />
        </ProfileAvatar>
        <ProfileInfo>
          <ProfileName>{user?.email?.split('@')[0] || 'User'}</ProfileName>
          <ProfileEmail>{user?.email}</ProfileEmail>
        </ProfileInfo>
      </ProfileHeader>
      
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <FaBook />
          </StatIcon>
          <StatValue>{stats.wordsLearned}</StatValue>
          <StatLabel>Words Learned</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaGraduationCap />
          </StatIcon>
          <StatValue>{stats.lessonsCompleted}</StatValue>
          <StatLabel>Lessons Completed</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaChartLine />
          </StatIcon>
          <StatValue>{stats.quizzesTaken}</StatValue>
          <StatLabel>Quizzes Taken</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaStar />
          </StatIcon>
          <StatValue>{stats.daysStreak}</StatValue>
          <StatLabel>Days Streak</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <ProfileTabs>
        <ProfileTab 
          active={activeTab === 'progress'} 
          onClick={() => setActiveTab('progress')}
        >
          Learning Progress
        </ProfileTab>
        <ProfileTab 
          active={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
        >
          Saved Words
        </ProfileTab>
        <ProfileTab 
          active={activeTab === 'favorites'} 
          onClick={() => setActiveTab('favorites')}
        >
          Favorite Words
        </ProfileTab>
      </ProfileTabs>
      
      <TabContent active={activeTab === 'progress'}>
        <ProgressSection>
          <h2>Your Learning Progress</h2>
          
          <ProgressCard>
            <ProgressTitle>Beginner Level</ProgressTitle>
            <ProgressBar>
              <ProgressFill progress={65} />
            </ProgressBar>
            <ProgressStats>
              <span>65% Complete</span>
              <span>4/6 Lessons</span>
            </ProgressStats>
          </ProgressCard>
          
          <ProgressCard>
            <ProgressTitle>Intermediate Level</ProgressTitle>
            <ProgressBar>
              <ProgressFill progress={20} />
            </ProgressBar>
            <ProgressStats>
              <span>20% Complete</span>
              <span>1/5 Lessons</span>
            </ProgressStats>
          </ProgressCard>
          
          <ProgressCard>
            <ProgressTitle>Advanced Level</ProgressTitle>
            <ProgressBar>
              <ProgressFill progress={0} />
            </ProgressBar>
            <ProgressStats>
              <span>0% Complete</span>
              <span>0/4 Lessons</span>
            </ProgressStats>
          </ProgressCard>
        </ProgressSection>
        
        <Link to="/lessons" className="btn-primary">
          Continue Learning
        </Link>
      </TabContent>
      
      <TabContent active={activeTab === 'saved'}>
        <h2>Saved Words</h2>
        {loading ? (
          <p>Loading saved words...</p>
        ) : (
          renderWordsList(savedWords, removeSavedWord)
        )}
      </TabContent>
      
      <TabContent active={activeTab === 'favorites'}>
        <h2>Favorite Words</h2>
        {loading ? (
          <p>Loading favorite words...</p>
        ) : (
          renderWordsList(favoriteWords, removeFavoriteWord)
        )}
      </TabContent>
    </ProfileContainer>
  )
}

export default Profile
