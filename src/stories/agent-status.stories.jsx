import { AgentStatus } from '@/components/AgentStatus'
import { RadialProgress } from '@/components/RadialProgress'

export default {
  title: 'Originals/Agent status',
  component: AgentStatus,
  parameters: {
    docs: {
      description: {
        component: "The chat's status line, shown beneath the conversation.",
      },
    },
  },
}

export const Default = {
  render: () => <AgentStatus status="Awaiting your input" />,
}

export const Working = {
  render: () => <AgentStatus working status="Staging logic groups…" />,
}

export const Context = {
  render: () => (
    <div className="flex items-center">
      <AgentStatus working status="Staging logic groups…" />
      <RadialProgress value={42} label="context" className="ml-auto" />
    </div>
  ),
}
