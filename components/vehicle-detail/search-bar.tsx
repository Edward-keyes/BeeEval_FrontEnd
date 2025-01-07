import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function VehicleDetailSearchBar() {
  return (
    <div className="w-full bg-muted py-4">
      <div className="container px-4 md:px-6">
        <div className="flex gap-4">
          <Input
            className="flex-1"
            placeholder="搜索车辆功能、参数或评价..."
            type="search"
          />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            搜索
          </Button>
        </div>
      </div>
    </div>
  )
}

