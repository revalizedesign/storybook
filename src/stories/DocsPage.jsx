import { Title, Subtitle, Description, Controls, Stories, Unstyled } from '@storybook/addon-docs/blocks'

export function createDocsPage({ comments, candidates, deprecated } = {}) {
  return () => (
    <>
      <Title />
      <Subtitle />
      <Description />
      {comments && (
        <Unstyled>
          <div className="flex flex-col gap-3 my-4">
            {Object.entries(comments).map(([name, text]) => (
              <div key={name} className="text-sm">
                <span className="font-semibold">{name}:</span> {text}
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
