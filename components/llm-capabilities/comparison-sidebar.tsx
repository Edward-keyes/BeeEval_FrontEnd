'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const competitors = [
  { id: 1, name: "理想 L6", status: "未开放" },
  { id: 2, name: "小鹏 G9", status: "未开放" },
  { id: 3, name: "极氪 001", status: "未开放" },
  { id: 4, name: "蔚来 ET5", status: "未开放" },
  { id: 5, name: "小鹏 SU7", status: "未开放" },
  { id: 6, name: "智界 S7", status: "未开放" },
  { id: 7, name: "问界 M7", status: "未开放" },
  { id: 8, name: "阿维塔 11", status: "未开放" },
  { id: 9, name: "高合 HiPhi Z", status: "未开放" },
  { id: 10, name: "理想 L7", status: "未开放" }
]

interface ComparisonSidebarProps {
  selectedCompetitor: number | null;
  onCompetitorSelect: (id: number) => void;
  selectedFunctionality: string;
}

export function ComparisonSidebar({ selectedCompetitor, onCompetitorSelect, selectedFunctionality }: ComparisonSidebarProps) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">{selectedFunctionality}</h2>
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between -mt-[52px]">
          <h2 className="text-lg font-semibold text-foreground">竞品对比</h2>
          <Badge variant="outline" className="text-primary border-primary">
            8款车型
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {competitors.slice(0, 8).map((competitor) => (
            <motion.div
              key={competitor.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCompetitorSelect(competitor.id)}
            >
              <Card className={cn(
                "cursor-pointer transition-colors",
                selectedCompetitor === competitor.id && "border-primary"
              )}>
                <CardContent className="p-4">
                  <div className="relative aspect-video mb-4">
                    <Image
                      src="/placeholder.svg?height=120&width=200"
                      alt={competitor.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{competitor.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {competitor.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

