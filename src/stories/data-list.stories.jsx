export default {
  title: 'Components/Data list',
  parameters: {
    docs: { description: { component: '<a href="https://www.radix-ui.com/themes/docs/components/data-list">Data List - Radix Themes</a>' } },
  },
}

export const Default = {
  render: () => (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
      {[['Status', 'Active'], ['Name', 'John Doe'], ['Email', 'john@example.com'], ['Role', 'Admin']].map(([term, def]) => (
        <div key={term} className="contents">
          <dt className="text-muted-foreground">{term}</dt>
          <dd>{def}</dd>
        </div>
      ))}
    </dl>
  ),
}
