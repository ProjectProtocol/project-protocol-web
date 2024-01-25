import { render } from '@testing-library/react'
import AgentInfo from 'src/components/AgentInfo'
import Agent from 'src/types/Agent'
import Office from 'src/types/Office'

const anytownOffice: Office = {
  id: 0,
  street: '123 Noendinsight Circle',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
  type: 'Office',
}
const agentWithFirstName: Agent = {
  firstName: 'Jebediah E.',
  lastName: 'Hoover',
  fullName: 'Jebediah E. Hoover',
  office: anytownOffice,
  id: '54321',
  averageRating: 1,
  type: 'Agent',
}

const agentWithoutFirstName: Agent = {
  lastName: 'Hoover',
  fullName: 'Hoover',
  office: anytownOffice,
  id: '54321',
  averageRating: 1,
  type: 'Agent',
}

describe('AgentInfo', () => {
  it('renders agent without a first name', () => {
    const { getByText } = render(<AgentInfo agent={agentWithoutFirstName} />)
    expect(getByText('Hoover')).toBeInTheDocument()
  })

  it('renders agent with a first name', () => {
    const { getByText } = render(<AgentInfo agent={agentWithFirstName} />)
    expect(getByText('Hoover, Jebediah E.')).toBeInTheDocument()
  })
})
