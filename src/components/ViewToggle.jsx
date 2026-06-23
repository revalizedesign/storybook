import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Fa } from '@/components/Fa'

export function ViewToggle() {
  return (
    <Tabs defaultValue="3d">
      <TabsList>
        <TabsTrigger value="2d"><Fa name="square" /> 2D</TabsTrigger>
        <TabsTrigger value="3d"><Fa name="cube" /> 3D</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
