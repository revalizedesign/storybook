import { Badge } from '@/components/ui/badge'
import { createDocsPage } from './DocsPage'

const semanticStyles = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  destructive: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  default: 'bg-muted text-muted-foreground border-border',
}

export default {
  title: 'shadcn/Badge',
  parameters: {
    docs: {
      description: {
        component: '<a href="https://ui.shadcn.com/docs/components/base/badge">Badge - shadcn/ui</a>',
      },
      page: createDocsPage({
        comments: {
          Jonathan: 'Critical. Pill style (never square), text always paired with color, semantic colors only, consistent across ALL products. Palette is open for review.',
          Matt: `One of the more complex primitives despite appearing simple.

**Observations:** Multiple badge categories are represented: Read-only labels, Status indicators, Interactive filters, Visualization legends, Combined legend/filter controls. Status badge variant is directionally correct. Current set may be broader than necessary, but there is not yet enough evidence to consolidate.

**What's missing:** More product examples. Better understanding of badge intent across products. Validation of color state requirements.

**Roadmap:** Stress test across filtering, status, and visualization contexts. Reduce to a smaller set of confirmed variants once usage patterns emerge. Establish clearer color semantics.`,
        },
        candidates: () => (
          <>
            <h3 className="text-sm font-semibold mt-6 mb-2">C1 Intelligence — composites/StatusBadge</h3>
            <p className="text-sm text-muted-foreground mb-3">Semantic colors via className. Maps status strings to success/warning/destructive/info.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {[['Active', 'success'], ['Pending', 'warning'], ['Error', 'destructive'], ['New', 'info'], ['Offline', 'default']].map(([label, variant]) => (
                <Badge key={label} variant="outline" className={`${semanticStyles[variant]} capitalize`}>{label}</Badge>
              ))}
            </div>
            <h3 className="text-sm font-semibold mb-2">C1 Intelligence — cpq/StatusBadge</h3>
            <p className="text-sm text-muted-foreground mb-3">Pipeline states mapped to generic variants.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {[['New', 'outline'], ['Uploading', 'secondary'], ['Extracting', 'secondary'], ['Needs Review', 'default'], ['Configuring', 'secondary'], ['Configs Ready', 'default'], ['Quoted', 'outline']].map(([label, variant]) => (
                <Badge key={label} variant={variant}>{label}</Badge>
              ))}
            </div>
            <h3 className="text-sm font-semibold mb-2">Attainia — status chips</h3>
            <p className="text-sm text-muted-foreground mb-3">Four semantic statuses with dedicated colors.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Matched</Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Review</Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Candidate</Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Error</Badge>
            </div>
            <h3 className="text-sm font-semibold mb-2">FlowIQ — status dots</h3>
            <p className="text-sm text-muted-foreground mb-3">Small colored circles, not pills. Used inline with text.</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {[['Published', 'bg-green-500'], ['Draft', 'bg-yellow-500'], ['Archived', 'bg-gray-400']].map(([label, color]) => (
                <span key={label} className="flex items-center gap-2 text-sm">
                  <span className={`inline-block size-2 rounded-full ${color}`} />
                  {label}
                </span>
              ))}
            </div>
            <h3 className="text-sm font-semibold mb-2">c1c-admin — category badges</h3>
            <p className="text-sm text-muted-foreground mb-3">Domain-specific colored badges for model element types.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {[['input', 'bg-green-100 text-green-800'], ['driven', 'bg-purple-100 text-purple-800'], ['equation', 'bg-teal-100 text-teal-800'], ['configured', 'bg-blue-100 text-blue-800'], ['conditional', 'bg-orange-100 text-orange-800']].map(([label, cls]) => (
                <Badge key={label} variant="outline" className={`${cls} border-transparent`}>{label}</Badge>
              ))}
            </div>
          </>
        ),
      }),
    },
  },
}

export const Default = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}

export const Status = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">Active</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge>Draft</Badge>
      <Badge variant="ghost">Archived</Badge>
    </div>
  ),
}
