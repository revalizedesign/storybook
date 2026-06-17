import { Band } from '@/components/Band'

// Labeled region box, so the first/middle/last positions are legible in each demo.
const box = (label, className = '') => (
  <div className={`flex items-center justify-center p-3 font-medium ${className}`}>{label}</div>
)

export default {
  title: 'Layout/Band',
  component: Band,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `**Band** — a generic, recursive, alternating-axis layout primitive.

Each band is one flex axis with three **positional** regions:

- **\`first\`** — leading content, fixed size
- **\`middle\`** — the one growing region (\`flex-1\`); recurses, conventionally on the opposite axis
- **\`last\`** — trailing content, fixed size

The names are positional, not semantic, because \`head\`/\`body\`/\`foot\`/\`side\`/\`main\` collide across nested axes — a "header" is the \`first\` of a vertical band, a "left nav" is the \`first\` of a horizontal one.

Nest bands and flip the axis at each level (V → H → V → H) to build any shell. See **Layout/Shell** for the canonical four-deep composition that uses this.`,
      },
    },
  },
}

// A single vertical band: first | middle (flex-1) | last, stacked.
export const Vertical = {
  render: () => (
    <div className="h-screen p-6">
      <Band
        axis="vertical"
        className="rounded-lg border"
        first={box('first', 'border-b bg-muted')}
        middle={box('middle — flex-1, grows', 'text-muted-foreground')}
        last={box('last', 'border-t bg-muted')}
      />
    </div>
  ),
}

// A single horizontal band: the same three regions, in a row.
export const Horizontal = {
  render: () => (
    <div className="h-screen p-6">
      <Band
        className="rounded-lg border"
        first={box('first', 'border-r bg-muted')}
        middle={box('middle — flex-1, grows', 'text-muted-foreground')}
        last={box('last', 'border-l bg-muted')}
      />
    </div>
  ),
}

// The "zig-zag": four bands deep, axis alternating V → H → V → H — the canonical app shell skeleton.
export const Nested = {
  render: () => (
    <div className="h-screen p-6">
      <Band
        axis="vertical"
        className="rounded-lg border"
        first={box('header — first of vertical', 'border-b bg-muted')}
        last={box('footer — last of vertical', 'border-t bg-muted')}
        middle={
          <Band
            axis="horizontal"
            first={box('nav', 'w-40 border-r bg-muted')}
            last={box('right rail', 'w-32 border-l bg-muted')}
            middle={
              <Band
                axis="vertical"
                first={box('toolbar — first of inner vertical', 'border-b bg-muted/50')}
                last={box('inner footer', 'border-t bg-muted/50')}
                middle={
                  <Band
                    axis="horizontal"
                    first={box('left pane', 'w-32 border-r bg-muted/50')}
                    last={box('right pane', 'w-32 border-l bg-muted/50')}
                    middle={box('MAIN CONTENT')}
                  />
                }
              />
            }
          />
        }
      />
    </div>
  ),
}
