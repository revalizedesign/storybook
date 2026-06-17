import { cn } from '@/lib/utils'

/**
 * Band — a generic, recursive, alternating-axis layout primitive.
 *
 * THE MODEL — "zig-zag" (alternating axis)
 * Every Band is ONE flex container along a single axis with three POSITIONAL regions:
 *   first   — leading content, fixed size (shrink-0)        [several allowed — the "zig-zig"]
 *   middle  — the one growing region (flex-1); RECURSES, conventionally on the OPPOSITE axis
 *   last    — trailing content, fixed size (shrink-0)       [several allowed — the "zag-zag"]
 * Nest bands and flip the axis at each level (V → H → V → H) to build any shell. See Shell
 * (components/Shell.jsx) for the canonical four-deep composition that uses this.
 *
 * WHY first/middle/last AND NOT head/body/foot/side/main/aside
 * Those names are SEMANTIC and collide across axes: a "header" is the `first` of a vertical band,
 * but a "left nav" is the `first` of a horizontal one; "side"/"main"/"foot" mean different things
 * at every level of the nest. Positional names stay unambiguous no matter how deep you go — the
 * primitive describes WHERE, the composition describes WHAT.
 */
export function Band({ axis = 'horizontal', first = null, middle = null, last = null, className }) {
  const dir = axis === 'vertical' ? 'flex-col' : 'flex-row'
  return (
    <div className={cn('flex h-full w-full min-h-0 min-w-0', dir, className)}>
      {first != null && <div className={cn('flex shrink-0', dir)}>{first}</div>}
      <div className={cn('flex min-h-0 min-w-0 flex-1', dir)}>{middle}</div>
      {last != null && <div className={cn('flex shrink-0', dir)}>{last}</div>}
    </div>
  )
}
