export default {
  title: 'Foundations/Themes',
  parameters: {
    docs: {
      description: {
        component: `The design system ships two themes. **shadcn** is the unmodified default — neutral palette, Lucide icons, base-vega preset variables. **Revalize** layers product identity on top without changing any primitives.

**shadcn (default)**
- Neutral grayscale palette (oklch)
- Lucide icons
- Vega preset: \`--radius: 0.625rem\`, Inter font, standard spacing
- Light sidebar (\`--sidebar: oklch(0.985 0 0)\`)

**Revalize**
- Monochromatic blue branded sidebar via CSS custom properties (\`--sidebar: #0856cf\`, full variable set for foreground, accent, primary, border, ring)
- Font Awesome Pro icons (loaded via kit)
- Inverted sidebar — white text/icons on brand background
- Same Vega base variables — no layout or spacing changes
- Applied per-product through \`sidebar.className\` on Shell, not globally

Theming is additive. Every shadcn primitive renders unchanged under both themes. Product identity is expressed through sidebar color tokens and icon choice — never by modifying components.`,
      },
    },
  },
}

export const Shadcn = {
  name: 'shadcn',
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <div className="mb-2 font-semibold">Palette</div>
        <div className="flex gap-2">
          {['bg-background', 'bg-foreground', 'bg-primary', 'bg-secondary', 'bg-muted', 'bg-accent', 'bg-destructive', 'bg-card', 'bg-popover', 'bg-border'].map(c => (
            <div key={c} className={`size-10 rounded-md border ${c}`} title={c} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 font-semibold">Sidebar</div>
        <div className="flex gap-2">
          {['bg-sidebar', 'bg-sidebar-foreground', 'bg-sidebar-primary', 'bg-sidebar-accent', 'bg-sidebar-border'].map(c => (
            <div key={c} className={`size-10 rounded-md border ${c}`} title={c} />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 font-semibold">Variables</div>
        <div className="font-mono text-sm text-muted-foreground">
          --radius: 0.625rem &middot; --font-sans: Inter Variable &middot; --sidebar-width: 15rem
        </div>
      </div>
    </div>
  ),
}

export const RevalizeName = {
  name: 'Revalize',
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <div className="mb-2 font-semibold">Branded sidebar tokens</div>
        <div className="flex gap-2">
          {[
            ['--sidebar', '#0856cf'],
            ['--sidebar-foreground', '#ffffffd9'],
            ['--sidebar-primary', '#ffffff'],
            ['--sidebar-primary-foreground', '#0856cf'],
            ['--sidebar-accent', '#ffffff1f'],
            ['--sidebar-accent-foreground', '#ffffff'],
            ['--sidebar-border', '#ffffff2e'],
            ['--sidebar-ring', '#ffffff3d'],
          ].map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-1">
              <div className="size-10 rounded-md border" style={{ background: value }} title={name} />
              <span className="font-mono text-xs text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 font-semibold">Differences from shadcn default</div>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>Font Awesome Pro icons (via kit) instead of Lucide</li>
          <li>Inverted sidebar — white on brand blue</li>
          <li>Applied per-product via <code>sidebar.className</code> on Shell</li>
          <li>No changes to layout, spacing, radius, or component internals</li>
        </ul>
      </div>
    </div>
  ),
}

export const DarkMode = {
  name: 'Dark mode',
  render: () => (
    <div className="flex flex-1 items-center justify-center p-6 text-muted-foreground">Coming soon</div>
  ),
}
