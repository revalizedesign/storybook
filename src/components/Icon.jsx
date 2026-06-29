import * as icons from 'lucide-react'

export function Icon({ name, ...props }) {
  const C = icons[name]
  return C ? <C {...props} /> : null
}
