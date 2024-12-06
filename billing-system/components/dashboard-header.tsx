import { ModeToggle } from '@/components/mode-toggle'

export function DashboardHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold tracking-tight">Billing System</h1>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

