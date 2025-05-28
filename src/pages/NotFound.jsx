import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaHome } from 'react-icons/fa'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  padding: var(--spacing-xl) 0;
`

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  
  @media (max-width: 576px) {
    font-size: 4rem;
  }
`

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`

const NotFoundText = styled.p`
  color: var(--color-text-light);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
  font-size: 1.1rem;
`

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: 500;
  
  svg {
    margin-right: var(--spacing-sm);
  }
  
  &:hover {
    background-color: #3a4d80;
  }
`

function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
      <NotFoundText>
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable. Please check the URL or return to the homepage.
      </NotFoundText>
      <HomeButton to="/">
        <FaHome /> Back to Home
      </HomeButton>
    </NotFoundContainer>
  )
}

export default NotFound
