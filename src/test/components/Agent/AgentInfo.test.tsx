import { render } from '@testing-library/react'
import AgentInfo from 'src/components/AgentInfo'

const anytownOffice = {
  id: 0,
  street: '123 Noendinsight Circle',
  city: 'Anytown',
  state: 'CA',
  zip: '12345',
  type: 'Office',
}
const agentWithFirstName = {
  firstName: 'Jebediah E.',
  lastName: 'Hoover',
  fullName: 'Jebediah E. Hoover',
  office: anytownOffice,
  id: '54321',
  averageRating: 1,
  type: 'Agent',
}

const agentWithoutFirstName = {
  ...agentWithFirstName,
  firstName: undefined,
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
