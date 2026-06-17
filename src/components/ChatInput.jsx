import { Fa } from '@/components/Fa'

// ChatInput — the chat composer: an attach affordance, an auto-growing textarea (grows with its
// content, then scrolls), and a send button that becomes a stop button while the agent is `working`.
export function ChatInput({ defaultValue, working = false }) {
  return (
    <div className="flex items-end gap-1 border-t p-2">
      <button type="button" aria-label="Attach" className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"><Fa name="paperclip" /></button>
      <textarea
        rows={1}
        defaultValue={defaultValue}
        placeholder="Type, paste a URL, or drag a file…"
        className="field-sizing-content max-h-[50vh] min-w-0 flex-1 resize-none bg-transparent px-1 py-1.5 outline-none placeholder:text-muted-foreground"
      />
      <button type="button" aria-label={working ? 'Stop' : 'Send'} className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
        <Fa name={working ? 'stop' : 'paper-plane'} variant="solid" />
      </button>
    </div>
  )
}
