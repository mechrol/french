import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styled from 'styled-components'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'

const LoginContainer = styled.div`
  max-width: 500px;
  margin: var(--spacing-xl) auto;
`

const LoginCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
`

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`

const LoginTitle = styled.h1`
  margin-bottom: var(--spacing-sm);
`

const LoginDescription = styled.p`
  color: var(--color-text-light);
`

const LoginForm = styled.form`
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

const LoginFooter = styled.div`
  text-align: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-light);
`

const RegisterLink = styled(Link)`
  color: var(--color-primary);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { signIn } = useAuth()
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
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const { success, error } = await signIn(email, password)
      
      if (success) {
        navigate('/')
      } else {
        setErrors({ form: error || 'Failed to sign in' })
      }
    } catch (error) {
      setErrors({ form: error.message || 'An unexpected error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginTitle>Log In</LoginTitle>
          <LoginDescription>
            Sign in to access your personalized French learning experience
          </LoginDescription>
        </LoginHeader>
        
        <LoginForm onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
              />
            </FormInput>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            <FaSignInAlt />
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </LoginForm>
        
        <LoginFooter>
          <p>
            Don't have an account?{' '}
            <RegisterLink to="/register">Sign up now</RegisterLink>
          </p>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
