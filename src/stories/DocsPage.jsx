import { Title, Subtitle, Description, Controls, Stories, Unstyled, Markdown } from '@storybook/addon-docs/blocks'

export function createDocsPage({ comments, candidates, deprecated } = {}) {
  return () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      {comments && (
        <Unstyled>
          <div className="flex gap-8 my-5">
            {Object.entries(comments).map(([name, text]) => (
              <div key={name} className="flex-1 min-w-0">
                <div className="text-base font-semibold mb-1.5">{name}</div>
                <div className="text-sm leading-snug text-muted-foreground [&_p]:mt-1.5 [&_p:first-child]:mt-0 [&_strong]:font-medium [&_strong]:text-foreground">
                  <Markdown>{text}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </Unstyled>
      )}
      <Controls />
      <Stories />
      {candidates && (
        <>
          <h2>Candidate variants</h2>
          <Unstyled>{candidates()}</Unstyled>
        </>
      )}
      <h2>Deprecated variants</h2>
      {deprecated ? <Unstyled>{deprecated()}</Unstyled> : <p>None</p>}
    </>
  )
}
