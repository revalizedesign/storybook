import { useState } from 'react'
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StoryGuide({ data }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-5 z-50 size-10 rounded-full shadow-lg"
        onClick={() => setOpen(o => !o)}
      >
        <BookOpen className="size-4" />
      </Button>
      {open && (
        <div className="fixed bottom-18 right-5 z-50 flex h-[70vh] w-96 flex-col overflow-hidden rounded-lg border bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            {active && (
              <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-4" />
              </button>
            )}
            <span className="flex-1 font-semibold">{active ? active.title : 'Guide'}</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">&times;</button>
          </div>
          <div className="flex-1 overflow-auto">
            {active ? (
              <div className="flex flex-col gap-4 p-4">
                <p className="text-sm">{active.detail}</p>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Key questions</span>
                  {active.questions.map(q => (
                    <p key={q} className="text-sm">{q}</p>
                  ))}
                </div>
                {active.ideas?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Ideas</span>
                    <ul className="list-disc pl-5 text-sm">
                      {active.ideas.map(idea => (
                        <li key={idea}>{idea}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              data.map(group => (
                <div key={group.group}>
                  <div className="bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">{group.group}</div>
                  {group.items.map(item => (
                    <button
                      key={item.title}
                      className="flex w-full items-center gap-2 border-b px-4 py-3 text-left hover:bg-accent"
                      onClick={() => setActive(item)}
                    >
                      <span className="flex-1 font-medium">{item.title}</span>
                      <ChevronRight className="size-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
