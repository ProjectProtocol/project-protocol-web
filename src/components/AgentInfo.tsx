import Agent from '../types/Agent'

interface IAgentInfo {
  /** An `Agent` object */
  agent: Agent
}

/** Repeatable UI pattern for basic agent info */
export default function AgentInfo({ agent }: IAgentInfo) {
  return (
    <div className="d-flex flex-column">
      <span className="m-0 large h4 lh-sm">
        {agent.lastName}, {agent.firstName}
      </span>
      <span className="mb-1 text-secondary h4 lh-sm">Agent</span>
      <p className="m-0 lh-sm">{agent.office.street}</p>
      <p className="m-0 lh-sm">
        {agent.office.city}, {agent.office.state} {agent.office.zip}
      </p>
    </div>
  )
}
