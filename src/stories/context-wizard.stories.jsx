import { ContextWizard } from '@/components/ContextWizard'
import data from './configureone-aiadmin-wizard.json'
import contextData from './configureone-aiadmin-context.json'

const enrichedSteps = data.map(s => s.type === 'review' ? { ...s, _context: contextData[s.context].found } : s)

export default {
  title: 'Originals/Context wizard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Data-driven multi-step flow for onboarding a product’s context (Company, Industry, Catalog…). Steps come from JSON — see \`configureone-aiadmin-wizard.json\`.

**onStepComplete:** fires with the raw step object whenever a step finishes (a \`flow\` step advancing, or a \`review\` step being approved). ContextWizard doesn’t interpret it — it’s a plain event, letting any listener derive its own meaning.

**ContextProgressProvider** (\`@/components/ContextProgressProvider\`) is the reference listener — tracks per-layer progress and shares it without prop drilling.

**Usage:**
- Wrap the tree in \`<ContextProgressProvider layers={['Company', 'Industry', 'Catalog']}>\`
- Wire the wizard with \`<ContextWizard onStepComplete={completeStep} .../>\` (from \`useContextProgress()\`)
- Any descendant — a dashboard card, a review tab — reads \`layerState\` via \`useContextProgress()\`
- Progress is inferred from step shape alone: \`type: 'flow'\` advancing → a shared source was found for every layer; \`type: 'review'\` being approved → that step’s \`context\` layer was approved
- See <a href="?path=/story/products-configure-one--ai-admin">Products/Configure One → AI admin</a> for a working example (Dashboard card, Context manager’s Global tab)`,
      },
    },
  },
  args: { format: 'pane' },
  argTypes: {
    format: {
      control: 'select',
      options: ['pane', 'dialog', 'drawer'],
    },
  },
}

export const Default = {
  render: (args) => (
    <div className="h-screen">
      <ContextWizard format={args.format} steps={enrichedSteps} onClose={() => {}} />
    </div>
  ),
}
