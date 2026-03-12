import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Resume Builder', () => {
  it('renders heading', () => {
    render(<App />)
    expect(screen.getByText('Resume Builder')).toBeInTheDocument()
  })

  it('updates name input', () => {
    render(<App />)
    const nameInput = screen.getByTestId('input-name')
    fireEvent.change(nameInput, { target: { value: 'Sohrab' } })
    expect(nameInput.value).toBe('Sohrab')
  })

  it('renders Print / Export PDF button', () => {
    render(<App />)
    expect(screen.getByTestId('btn-print')).toBeInTheDocument()
  })

  it('renders all form sections', () => {
    render(<App />)
    expect(screen.getByText('Personal Info')).toBeInTheDocument()
    expect(screen.getByText('Summary')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
  })
})
