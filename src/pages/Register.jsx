import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styled from 'styled-components'
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa'

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: var(--spacing-xl) auto;
`

const RegisterCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
`

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`

const RegisterTitle = styled.h1`
  margin-bottom: var(--spacing-sm);
`

const RegisterDescription = styled.p`
  color: var(--color-text-light);
`

const RegisterForm = styled.form`
  margin-bottom: var(--spacing-lg);
`

const FormGroup = styled.div`
  margin-bottom: var(--spacing-lg);
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
`

const FormInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ hasError }) => (hasError ? 'var(--color-error)' : 'var(--color-light)')};
  border-radius: var(--border-radius-md);
  overflow: hidden;
  
  svg {
    padding: var(--spacing-md);
    color: var(--color-text-light);
    background-color: var(--color-background);
  }
  
  input {
    flex: 1;
    padding: var(--spacing-md);
    border: none;
    outline: none;
    font-size: 1rem;
  }
  
  &:focus-within {
    border-color: var(--color-primary);
    
    svg {
      color: var(--color-primary);
    }
  }
`

const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: var(--spacing-xs);
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3a4d80;
  }
  
  &:disabled {
    background-color: var(--color-text-light);
    cursor: not-allowed;
  }
  
  svg {
    margin-right: var(--spacing-sm);
  }
`

const RegisterFooter = styled.div`
  text-align: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-light);
`

const LoginLink = styled(Link)`
  color: var(--color-primary);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { signUp } = useAuth()
  const navigate = useNavigate()
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const { success, error } = await signUp(email, password)
      
      if (success) {
        navigate('/login')
      } else {
        setErrors({ form: error || 'Failed to create an account' })
      }
    } catch (error) {
      setErrors({ form: error.message || 'An unexpected error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <RegisterTitle>Create Account</RegisterTitle>
          <RegisterDescription>
            Join FrenchPol and start your French learning journey today
          </RegisterDescription>
        </RegisterHeader>
        
        <RegisterForm onSubmit={handleSubmit}>
          {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
          
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput hasError={errors.email}>
              <FaEnvelope />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormInput>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput hasError={errors.password}>
              <FaLock />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </FormInput>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput hasError={errors.confirmPassword}>
              <FaLock />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </FormInput>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            <FaUserPlus />
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </RegisterForm>
        
        <RegisterFooter>
          <p>
            Already have an account?{' '}
            <LoginLink to="/login">Sign in</LoginLink>
          </p>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  )
}

export default Register
