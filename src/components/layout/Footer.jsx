import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const FooterContainer = styled.footer`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-xl) 0;
  margin-top: var(--spacing-xxl);
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FooterSection = styled.div`
  h3 {
    color: var(--color-white);
    margin-bottom: var(--spacing-md);
    font-size: 1.2rem;
  }
`

const FooterLink = styled(Link)`
  display: block;
  color: var(--color-light);
  margin-bottom: var(--spacing-sm);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-white);
  }
`

const FooterText = styled.p`
  color: var(--color-light);
  margin-bottom: var(--spacing-sm);
`

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`

const SocialLink = styled.a`
  color: var(--color-light);
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-white);
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-light);
  font-size: 0.9rem;
`

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <h3>FrenchPol</h3>
            <FooterText>
              Your ultimate resource for learning French with Polish translations.
              Master the language with our comprehensive tools and resources.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Learn</h3>
            <FooterLink to="/dictionary">Dictionary</FooterLink>
            <FooterLink to="/lessons">Lessons</FooterLink>
            <FooterLink to="/quiz">Quiz</FooterLink>
            <FooterLink to="/grammar">Grammar</FooterLink>
            <FooterLink to="/pronunciation">Pronunciation</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Resources</h3>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/resources">Learning Resources</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Legal</h3>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/cookies">Cookie Policy</FooterLink>
          </FooterSection>
        </FooterContent>
        
        <Copyright>
          &copy; {currentYear} FrenchPol. All rights reserved.
        </Copyright>
      </div>
    </FooterContainer>
  )
}

export default Footer
