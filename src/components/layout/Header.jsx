import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  
  span {
    color: var(--color-accent);
  }
`

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 250px;
    height: 100vh;
    background-color: var(--color-primary);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 60px;
    transition: right 0.3s ease-in-out;
    box-shadow: var(--shadow-lg);
  }
`

const NavItem = styled(NavLink)`
  margin: 0 var(--spacing-md);
  color: var(--color-text);
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--color-accent);
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &.active {
    color: var(--color-accent);
  }
  
  @media (max-width: 768px) {
    margin: var(--spacing-md) 0;
    color: var(--color-white);
    
    &:after {
      bottom: -2px;
    }
  }
`

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: var(--spacing-lg);
  }
`

const AuthButton = styled(Link)`
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  margin-left: var(--spacing-sm);
  
  &.login {
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
  
  &.register {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
  
  @media (max-width: 768px) {
    margin: var(--spacing-sm) 0;
  }
`

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const UserButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: var(--color-primary);
  padding: var(--spacing-sm);
  
  svg {
    margin-right: var(--spacing-xs);
  }
  
  @media (max-width: 768px) {
    color: var(--color-white);
  }
`

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  min-width: 150px;
  z-index: 10;
  overflow: hidden;
  
  @media (max-width: 768px) {
    position: static;
    background: none;
    box-shadow: none;
    margin-top: var(--spacing-sm);
  }
`

const DropdownItem = styled(Link)`
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text);
  
  &:hover {
    background-color: var(--color-light);
  }
  
  svg {
    margin-right: var(--spacing-sm);
  }
  
  @media (max-width: 768px) {
    color: var(--color-white);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text);
  background: none;
  border: none;
  
  &:hover {
    background-color: var(--color-light);
  }
  
  svg {
    margin-right: var(--spacing-sm);
  }
  
  @media (max-width: 768px) {
    color: var(--color-white);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: block;
  }
`

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  
  const handleSignOut = async () => {
    await signOut()
    setIsDropdownOpen(false)
    navigate('/')
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <HeaderContainer>
      <div className="container">
        <NavContainer>
          <Logo to="/">French<span>Pol</span></Logo>
          
          <MenuToggle onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
          
          <NavMenu isOpen={isMenuOpen}>
            <NavItem to="/" onClick={closeMenu}>Home</NavItem>
            <NavItem to="/dictionary" onClick={closeMenu}>Dictionary</NavItem>
            <NavItem to="/lessons" onClick={closeMenu}>Lessons</NavItem>
            <NavItem to="/quiz" onClick={closeMenu}>Quiz</NavItem>
            
            {user ? (
              <UserMenu>
                <UserButton onClick={toggleDropdown}>
                  <FaUser /> {user.email?.split('@')[0]}
                </UserButton>
                
                {isDropdownOpen && (
                  <UserDropdown>
                    <DropdownItem to="/profile" onClick={() => {
                      closeMenu()
                      setIsDropdownOpen(false)
                    }}>
                      <FaUser /> Profile
                    </DropdownItem>
                    <DropdownButton onClick={handleSignOut}>
                      <FaSignOutAlt /> Sign Out
                    </DropdownButton>
                  </UserDropdown>
                )}
              </UserMenu>
            ) : (
              <AuthButtons>
                <AuthButton to="/login" className="login" onClick={closeMenu}>
                  Log In
                </AuthButton>
                <AuthButton to="/register" className="register" onClick={closeMenu}>
                  Sign Up
                </AuthButton>
              </AuthButtons>
            )}
          </NavMenu>
        </NavContainer>
      </div>
    </HeaderContainer>
  )
}

export default Header
