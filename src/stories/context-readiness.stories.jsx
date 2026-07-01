import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, StepperNav, StepperPanel, StepperContent } from '@/components/stepper'

export default {
  title: 'Experiments/Context readiness',
  parameters: {
    docs: {
      description: {
        component: 'Context readiness visualization for the AI admin agent. Explores how to represent hierarchical context layers (Company → Industry, Catalog → Categories → Products), their source relationships, and confidence indicators (No context / Low confidence / OK).',
      },
    },
  },
}

const status = (words) => words === 0 ? 'No context' : words < 50 ? 'Low confidence' : 'OK'
const variant = (words) => words === 0 ? 'outline' : words < 50 ? 'secondary' : 'default'

const stages = [
  { id: 'url', title: 'Company URL', description: 'Paste company link' },
  { id: 'context', title: 'Context', description: 'Company, Industry, Catalog' },
  { id: 'build', title: 'Build', description: 'Model, Rules, Results' },
  { id: 'c1c', title: 'C1C', description: 'Commit to Configure One Cloud' },
]

const stageDetails = {
  url: null,
  context: null,
  build: [
    'Model (groups → inputs → values → attributes)',
    'Rules (root group → groups → logic)',
    'Results (BOMs, assemblies, masters)',
  ],
  c1c: null,
}

export const Overview = {
  render: () => {
    const [current, setCurrent] = useState(stages[0].id)
    return (
      <Stepper steps={stages} value={current} onValueChange={setCurrent} indicators={{ completed: <Check className="size-4" /> }} className="flex flex-col gap-6">
        <StepperNav>
          {stages.map((step, i) => (
            <StepperItem key={step.id} stepId={step.id} className="relative flex-1">
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator className="data-[state=completed]:bg-green-600">{i + 1}</StepperIndicator>
                <div className="flex flex-col">
                  <StepperTitle>{step.title}</StepperTitle>
                  <StepperDescription>{step.description}</StepperDescription>
                </div>
              </StepperTrigger>
              {i < stages.length - 1 && (
                <StepperSeparator className="absolute inset-x-0 top-2 right-[calc(-50%+18px)] left-[calc(50%+18px)]" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel>
          {stages.map(step => (
            <StepperContent key={step.id} value={step.id}>
              {stageDetails[step.id] ? (
                <div className="flex flex-col gap-1 rounded-lg border p-4">
                  {stageDetails[step.id].map(item => (
                    <span key={item} className="text-sm">{item}</span>
                  ))}
                </div>
              ) : null}
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

const contexts = [
  { label: 'Company', sources: 0, words: 0, children: [
    { label: 'Industry', sources: 0, words: 0 },
    { label: 'Catalog', sources: 0, words: 0, children: [
      { label: 'Categories', sources: 0, words: 0, children: [
        { label: 'Products', sources: 0, words: 0 },
      ]},
    ]},
  ]},
]

const ContextNode = ({ node, depth = 0 }) => (
  <>
    <div className="flex items-center gap-2 py-1.5" style={{ paddingLeft: `${depth * 1.5}rem` }}>
      <span className="flex-1 font-medium">{node.label}</span>
      <span className="text-xs text-muted-foreground">{node.sources} sources · {node.words} words</span>
      <Badge variant={variant(node.words)}>{status(node.words)}</Badge>
    </div>
    {node.children?.map(child => (
      <ContextNode key={child.label} node={child} depth={depth + 1} />
    ))}
  </>
)

export const Default = {
  render: () => (
    <div>
      {contexts.map(node => (
        <ContextNode key={node.label} node={node} depth={0} />
      ))}
    </div>
  ),
}

const zeroState = [
  { approved: false, confident: false, label: 'Company', questions: [
    { label: 'Company name', words: 0 },
    { label: 'Question 2', words: 0 },
  ]},
  { approved: false, confident: false, label: 'Industry', questions: [
    { label: 'Matched supported vertical', words: 0 },
  ]},
  { approved: false, confident: false, label: 'Catalog', questions: [
    { label: 'Category list summary', words: 0 },
    { label: 'Product list summary', words: 0 },
  ]},
]

const readyState = [
  { approved: true, confident: true, label: 'Company', questions: [
    { label: 'Company name', words: 1 },
    { label: 'Question 2', words: 1 },
  ]},
  { approved: true, confident: true, label: 'Industry', questions: [
    { label: 'Matched supported vertical', words: 1 },
  ]},
  { approved: true, confident: true, label: 'Catalog', questions: [
    { label: 'Category list summary', words: 1 },
    { label: 'Product list summary', words: 1 },
  ]},
]

export const DataModel = {
  name: 'Data model',
  render: () => (
    <div className="flex gap-8">
      <div>
        <div className="mb-2 text-xs font-medium text-muted-foreground">Zero state</div>
        <pre className="font-mono text-sm">{JSON.stringify(zeroState, null, 2)}</pre>
      </div>
      <div>
        <div className="mb-2 text-xs font-medium text-muted-foreground">Ready state</div>
        <pre className="font-mono text-sm">{JSON.stringify(readyState, null, 2)}</pre>
      </div>
    </div>
  ),
}

import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import flows from './context-readiness-flows.json'

const nodeStyle = (bg) => ({ background: bg, border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, padding: '8px 12px', width: 160 })

const toNodes = (nodes, colors) => nodes.map(n => ({
  id: n.id,
  position: { x: n.x, y: n.y },
  data: { label: n.label },
  style: nodeStyle(colors[n.color]),
  ...(n.source && { sourcePosition: n.source }),
  ...(n.target && { targetPosition: n.target }),
}))

const flowProps = {
  fitView: true,
  fitViewOptions: { maxZoom: 1 },
  nodesDraggable: false,
  nodesConnectable: false,
  elementsSelectable: false,
  panOnDrag: false,
  preventScrolling: false,
  zoomOnScroll: false,
}

export const AgentLoop = {
  name: 'Agent loop',
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 font-semibold">First use, first step</h3>
        <div className="h-[500px]">
          <ReactFlow nodes={toNodes(flows.firstUse.nodes, flows.colors)} edges={flows.firstUse.edges} {...flowProps} />
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Batch upload with explicit mapping</h3>
        <div className="h-[350px]">
          <ReactFlow nodes={toNodes(flows.fileUpload.nodes, flows.colors)} edges={flows.fileUpload.edges} {...flowProps} />
        </div>
      </div>
    </div>
  ),
}

const timeline = [
  { event: 'User pastes morgancorp.com', contexts: { Company: 0, Industry: 0, Catalog: 0 } },
  { event: 'Found Morgan Truck Body LLC — company name, what the business does, products and services, voice and positioning, key differentiators', contexts: { Company: 60, Industry: 0, Catalog: 0 } },
  { event: 'Matched to Motor Vehicles (not Industrial Machinery & Equipment, Building Materials & Construction Products, Fluid Handling & Pump Manufacturing, HVAC, Foodservice Equipment, Industrial Drives & Power Transmission, Medical Devices)', contexts: { Company: 60, Industry: 50, Catalog: 0 } },
  { event: 'Found 5 categories, 14 products — Dry Freight (Gold Star, Proscape-Van, Furniture Mover, Curtainsider, CityMax, Mini-Mover), Refrigerated (Cold Star), Specialty (MSU, EV/Alternative Fuel), Platform & Dump (ProStake, MHP, LandscaperPro, Dump Body). Sells across North America, existing selector at morgancorp.com/products', contexts: { Company: 60, Industry: 50, Catalog: 30 } },
  { event: 'User reviews and approves global context', contexts: { Company: 80, Industry: 50, Catalog: 50 } },
]

export const Timeline = {
  render: () => (
    <div className="flex flex-col gap-4">
      {timeline.map((step, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs">{i + 1}</span>
            <span className="text-sm font-medium">{step.event}</span>
          </div>
          <div className="ml-8 flex gap-2">
            {Object.entries(step.contexts).map(([label, words]) => (
              <Badge key={label} variant={variant(words)}>{label}: {status(words)}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
