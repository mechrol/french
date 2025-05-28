import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaBook, FaGraduationCap, FaGamepad, FaHeadphones } from 'react-icons/fa'

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--spacing-xl) 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const HeroContent = styled.div`
  flex: 1;
  padding-right: var(--spacing-xl);
  
  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: var(--spacing-xl);
  }
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
  
  span {
    color: var(--color-accent);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-lg);
  max-width: 600px;
  
  @media (max-width: 768px) {
    margin: 0 auto var(--spacing-lg);
  }
`

const HeroButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const HeroButton = styled(Link)`
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 1rem;
  
  &.primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    
    &:hover {
      background-color: #3a4d80;
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    
    &:hover {
      background-color: rgba(43, 58, 103, 0.1);
    }
  }
`

const HeroImage = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    max-width: 500px;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
  }
`

const FeaturesSection = styled.section`
  margin: var(--spacing-xxl) 0;
`

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-xl);
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--color-accent);
    margin: var(--spacing-sm) auto 0;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
`

const FeatureTitle = styled.h3`
  margin-bottom: var(--spacing-sm);
  font-size: 1.25rem;
`

const FeatureDescription = styled.p`
  color: var(--color-text-light);
  font-size: 0.95rem;
`

const StatsSection = styled.section`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-xl) 0;
  margin: var(--spacing-xxl) 0;
  border-radius: var(--border-radius-lg);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const StatItem = styled.div`
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-accent);
`

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`

const TestimonialSection = styled.section`
  margin: var(--spacing-xxl) 0;
`

const TestimonialCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-lg);
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 5rem;
    color: var(--color-light);
    font-family: var(--font-display);
    opacity: 0.5;
  }
`

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text);
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`

const TestimonialAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: var(--spacing-md);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TestimonialInfo = styled.div`
  h4 {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    color: var(--color-text-light);
    font-size: 0.9rem;
  }
`

const CtaSection = styled.section`
  background-color: var(--color-accent);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  margin: var(--spacing-xxl) 0;
  color: var(--color-white);
`

const CtaTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  font-size: 2.2rem;
`

const CtaText = styled.p`
  margin-bottom: var(--spacing-lg);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  opacity: 0.9;
`

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-white);
  color: var(--color-accent);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
    transform: translateY(-3px);
  }
`

function Home() {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Learn French with <span>Polish</span> Translations
          </HeroTitle>
          <HeroSubtitle>
            Master the French language with our comprehensive learning platform designed specifically for Polish speakers. Access 3,000+ essential French words with Polish translations and pronunciation guides.
          </HeroSubtitle>
          <HeroButtons>
            <HeroButton to="/dictionary" className="primary">
              Explore Dictionary
            </HeroButton>
            <HeroButton to="/register" className="secondary">
              Sign Up Free
            </HeroButton>
          </HeroButtons>
        </HeroContent>
        <HeroImage>
          <img 
            src="https://images.pexels.com/photos/5088188/pexels-photo-5088188.jpeg" 
            alt="Learning French" 
          />
        </HeroImage>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Why Choose FrenchPol?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaBook />
            </FeatureIcon>
            <FeatureTitle>Comprehensive Dictionary</FeatureTitle>
            <FeatureDescription>
              Access 3,000+ essential French words with Polish translations and pronunciation guides.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaGraduationCap />
            </FeatureIcon>
            <FeatureTitle>Structured Lessons</FeatureTitle>
            <FeatureDescription>
              Follow our carefully designed lessons to build your French vocabulary and grammar skills.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaGamepad />
            </FeatureIcon>
            <FeatureTitle>Interactive Quizzes</FeatureTitle>
            <FeatureDescription>
              Test your knowledge with fun and engaging quizzes tailored to your learning progress.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaHeadphones />
            </FeatureIcon>
            <FeatureTitle>Pronunciation Guides</FeatureTitle>
            <FeatureDescription>
              Learn to speak like a native with our detailed pronunciation transcriptions.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <StatsSection>
        <div className="container">
          <StatsGrid>
            <StatItem>
              <StatNumber>3,000+</StatNumber>
              <StatLabel>French Words</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Lessons</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatNumber>100+</StatNumber>
              <StatLabel>Quizzes</StatLabel>
            </StatItem>
            
            <StatItem>
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Happy Learners</StatLabel>
            </StatItem>
          </StatsGrid>
        </div>
      </StatsSection>
      
      <TestimonialSection>
        <SectionTitle>What Our Users Say</SectionTitle>
        <TestimonialCard>
          <TestimonialText>
            "FrenchPol has completely transformed my French learning journey. The Polish translations and pronunciation guides make it so much easier to understand and remember new words. I've made more progress in 3 months than I did in a year with other methods!"
          </TestimonialText>
          <TestimonialAuthor>
            <TestimonialAvatar>
              <img 
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" 
                alt="Anna Kowalska" 
              />
            </TestimonialAvatar>
            <TestimonialInfo>
              <h4>Anna Kowalska</h4>
              <p>Student, Warsaw</p>
            </TestimonialInfo>
          </TestimonialAuthor>
        </TestimonialCard>
        
        <TestimonialCard>
          <TestimonialText>
            "As someone who struggled with language learning in the past, I was amazed at how quickly I picked up French with FrenchPol. The structured lessons and interactive quizzes keep me engaged, and the Polish translations make everything click instantly. Highly recommended!"
          </TestimonialText>
          <TestimonialAuthor>
            <TestimonialAvatar>
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="Piotr Nowak" 
              />
            </TestimonialAvatar>
            <TestimonialInfo>
              <h4>Piotr Nowak</h4>
              <p>Business Professional, Kraków</p>
            </TestimonialInfo>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialSection>
      
      <CtaSection>
        <CtaTitle>Ready to Start Your French Journey?</CtaTitle>
        <CtaText>
          Join thousands of Polish speakers who are mastering French with our comprehensive learning platform. Sign up today and get access to our complete dictionary, lessons, and quizzes.
        </CtaText>
        <CtaButton to="/register">
          Get Started For Free
        </CtaButton>
      </CtaSection>
    </>
  )
}

export default Home
