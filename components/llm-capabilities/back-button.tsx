import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function BackButton() {
  const [selectedVehicle, setSelectedVehicle] = useState("极越07")

  const vehicles = ["极越07", "小鹏P7", "理想L9", "蔚来ET7"]

  return (
    <div className="bg-gradient-to-b from-background to-muted/30 p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
        <Link href="/vehicle-detail">
          <Button variant="ghost" size="sm" className="flex items-center hover:bg-muted/50 text-muted-foreground">
            <ChevronLeft className="h-5 w-5 mr-1" />
            返回
          </Button>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">当前车型:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="flex items-center font-medium">
                {selectedVehicle}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {vehicles.map((vehicle) => (
                <DropdownMenuItem key={vehicle} onSelect={() => setSelectedVehicle(vehicle)}>
                  {vehicle}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>系统版本:</span>
            <span className="font-medium text-foreground">2.1.1</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>更新时间:</span>
            <span className="font-medium text-foreground">2024年12月26日</span>
          </div>
        </div>
      </div>
    </div>
  )
}

