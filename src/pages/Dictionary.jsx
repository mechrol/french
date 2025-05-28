import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import styled from 'styled-components'
import { FaSearch, FaFilter, FaTimes, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'

const DictionaryContainer = styled.div`
  margin: var(--spacing-xl) 0;
`

const SearchContainer = styled.div`
  margin-bottom: var(--spacing-xl);
`

const SearchBar = styled.div`
  display: flex;
  margin-bottom: var(--spacing-md);
  
  input {
    flex: 1;
    padding: var(--spacing-md);
    border: 2px solid var(--color-light);
    border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--color-accent);
    }
  }
  
  button {
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    padding: 0 var(--spacing-lg);
    border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
    cursor: pointer;
    
    &:hover {
      background-color: #3a4d80;
    }
  }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border: 1px solid var(--color-light);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  
  svg {
    margin-right: var(--spacing-xs);
  }
  
  &:hover {
    background-color: var(--color-light);
  }
`

const SortButton = styled.button`
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border: 1px solid var(--color-light);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  margin-left: var(--spacing-sm);
  
  svg {
    margin-right: var(--spacing-xs);
  }
  
  &:hover {
    background-color: var(--color-light);
  }
`

const FilterOptions = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-md);
`

const FilterTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--color-text-light);
    
    &:hover {
      color: var(--color-error);
    }
  }
`

const FilterGroup = styled.div`
  margin-bottom: var(--spacing-md);
  
  h4 {
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
  }
`

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  background-color: ${({ isChecked }) => (isChecked ? 'var(--color-light)' : 'transparent')};
  
  input {
    margin-right: var(--spacing-xs);
  }
  
  &:hover {
    background-color: var(--color-light);
  }
`

const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  
  button {
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
  }
  
  .reset {
    background-color: transparent;
    border: 1px solid var(--color-text-light);
    color: var(--color-text-light);
    
    &:hover {
      background-color: var(--color-text-light);
      color: var(--color-white);
    }
  }
  
  .apply {
    background-color: var(--color-primary);
    border: 1px solid var(--color-primary);
    color: var(--color-white);
    
    &:hover {
      background-color: #3a4d80;
    }
  }
`

const WordsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const WordCard = styled(Link)`
  display: block;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--color-text);
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
`

const WordFrench = styled.h3`
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
  font-size: 1.3rem;
`

const WordPolish = styled.p`
  color: var(--color-text);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
`

const WordPronunciation = styled.p`
  color: var(--color-text-light);
  font-style: italic;
  font-size: 0.9rem;
`

const WordCategory = styled.span`
  display: inline-block;
  background-color: var(--color-light);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: 0.8rem;
  margin-top: var(--spacing-sm);
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-xl);
  gap: var(--spacing-xs);
`

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  border: 1px solid ${({ isActive }) => (isActive ? 'var(--color-primary)' : 'var(--color-light)')};
  background-color: ${({ isActive }) => (isActive ? 'var(--color-primary)' : 'var(--color-white)')};
  color: ${({ isActive }) => (isActive ? 'var(--color-white)' : 'var(--color-text)')};
  cursor: pointer;
  
  &:hover {
    background-color: ${({ isActive }) => (isActive ? 'var(--color-primary)' : 'var(--color-light)')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  
  button {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--border-radius-md);
    border: none;
    cursor: pointer;
    
    &:hover {
      background-color: #3a4d80;
    }
  }
`

function Dictionary() {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    difficulty: []
  })
  const [sortOrder, setSortOrder] = useState('asc')
  
  const wordsPerPage = 12
  
  // Categories and difficulty levels for filters
  const categories = ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun']
  const difficultyLevels = ['beginner', 'intermediate', 'advanced']
  
  useEffect(() => {
    fetchWords()
  }, [currentPage, filters, sortOrder])
  
  const fetchWords = async () => {
    setLoading(true)
    
    try {
      let query = supabase
        .from('french_words')
        .select('*', { count: 'exact' })
      
      // Apply search term if exists
      if (searchTerm) {
        query = query.or(`french.ilike.%${searchTerm}%,polish.ilike.%${searchTerm}%`)
      }
      
      // Apply category filters if selected
      if (filters.categories.length > 0) {
        query = query.in('category', filters.categories)
      }
      
      // Apply difficulty filters if selected
      if (filters.difficulty.length > 0) {
        query = query.in('difficulty', filters.difficulty)
      }
      
      // Apply sorting
      query = query.order('french', { ascending: sortOrder === 'asc' })
      
      // Apply pagination
      const from = (currentPage - 1) * wordsPerPage
      const to = from + wordsPerPage - 1
      
      const { data, error, count } = await query.range(from, to)
      
      if (error) throw error
      
      setWords(data || [])
      setTotalPages(Math.ceil((count || 0) / wordsPerPage))
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchWords()
  }
  
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const updated = { ...prev }
      
      if (updated[type].includes(value)) {
        updated[type] = updated[type].filter(item => item !== value)
      } else {
        updated[type] = [...updated[type], value]
      }
      
      return updated
    })
  }
  
  const resetFilters = () => {
    setFilters({
      categories: [],
      difficulty: []
    })
  }
  
  const applyFilters = () => {
    setCurrentPage(1)
    setIsFilterOpen(false)
    fetchWords()
  }
  
  const toggleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
  }
  
  const renderPagination = () => {
    const pages = []
    
    // Previous button
    pages.push(
      <PageButton 
        key="prev" 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </PageButton>
    )
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      // Show first page, last page, and pages around current page
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(
          <PageButton 
            key={i} 
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PageButton>
        )
      } else if (
        (i === currentPage - 3 && currentPage > 3) || 
        (i === currentPage + 3 && currentPage < totalPages - 2)
      ) {
        // Show ellipsis
        pages.push(
          <PageButton key={`ellipsis-${i}`} disabled>
            {"..."}
          </PageButton>
        )
      }
    }
    
    // Next button
    pages.push(
      <PageButton 
        key="next" 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </PageButton>
    )
    
    return pages
  }
  
  return (
    <DictionaryContainer>
      <h1>French-Polish Dictionary</h1>
      <p>Browse our comprehensive collection of 3,000+ essential French words with Polish translations and pronunciation guides.</p>
      
      <SearchContainer>
        <form onSubmit={handleSearch}>
          <SearchBar>
            <input 
              type="text" 
              placeholder="Search for words in French or Polish..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </SearchBar>
        </form>
        
        <FilterContainer>
          <div>
            <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FaFilter /> Filter
            </FilterButton>
            <SortButton onClick={toggleSort}>
              {sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
              {sortOrder === 'asc' ? 'A to Z' : 'Z to A'}
            </SortButton>
          </div>
          
          {(filters.categories.length > 0 || filters.difficulty.length > 0) && (
            <div>
              <small>
                Active filters: 
                {filters.categories.length > 0 && ` ${filters.categories.length} categories`}
                {filters.categories.length > 0 && filters.difficulty.length > 0 && ','}
                {filters.difficulty.length > 0 && ` ${filters.difficulty.length} difficulty levels`}
              </small>
            </div>
          )}
        </FilterContainer>
        
        <FilterOptions isOpen={isFilterOpen}>
          <FilterTitle>
            Filter Words
            <button onClick={() => setIsFilterOpen(false)}>
              <FaTimes />
            </button>
          </FilterTitle>
          
          <FilterGroup>
            <h4>Word Category</h4>
            <CheckboxGroup>
              {categories.map(category => (
                <CheckboxLabel 
                  key={category}
                  isChecked={filters.categories.includes(category)}
                >
                  <input 
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleFilterChange('categories', category)}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FilterGroup>
          
          <FilterGroup>
            <h4>Difficulty Level</h4>
            <CheckboxGroup>
              {difficultyLevels.map(level => (
                <CheckboxLabel 
                  key={level}
                  isChecked={filters.difficulty.includes(level)}
                >
                  <input 
                    type="checkbox"
                    checked={filters.difficulty.includes(level)}
                    onChange={() => handleFilterChange('difficulty', level)}
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FilterGroup>
          
          <FilterActions>
            <button className="reset" onClick={resetFilters}>
              Reset
            </button>
            <button className="apply" onClick={applyFilters}>
              Apply Filters
            </button>
          </FilterActions>
        </FilterOptions>
      </SearchContainer>
      
      {loading ? (
        <LoadingState>
          <div className="spinner"></div>
        </LoadingState>
      ) : words.length > 0 ? (
        <>
          <WordsGrid>
            {words.map(word => (
              <WordCard key={word.id} to={`/dictionary/${word.id}`}>
                <WordFrench>{word.french}</WordFrench>
                <WordPolish>{word.polish}</WordPolish>
                <WordPronunciation>[{word.pronunciation}]</WordPronunciation>
                <WordCategory>{word.category}</WordCategory>
              </WordCard>
            ))}
          </WordsGrid>
          
          <Pagination>
            {renderPagination()}
          </Pagination>
        </>
      ) : (
        <EmptyState>
          <h3>No words found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
          <button onClick={() => {
            setSearchTerm('')
            resetFilters()
            setCurrentPage(1)
            fetchWords()
          }}>
            Clear Search & Filters
          </button>
        </EmptyState>
      )}
    </DictionaryContainer>
  )
}

export default Dictionary
