'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Info } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ModelCapabilityAssessment } from "./model-capability-assessment"

interface MainContentProps {
  showIndustryAverage: boolean
}

// Removed domainScores array

export function MainContent({ showIndustryAverage }: MainContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="relative aspect-video">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Feature demonstration"
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <button className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center text-white hover:bg-primary transition-colors">
              <Play className="h-8 w-8" />
            </button>
          </div>
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            4K Ultra HD
          </Badge>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    用车助手-车书展示
                  </h2>
                  <p className="text-muted-foreground">
                    通过自然语言交互方式，为用户提供车辆使用说明书内容的查询和解答服务。
                    支持多轮对话，上下文理解，并能根据用户具体场景提供个性化的建议。
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>00:05:32</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">极越07 核心能力</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-sm text-muted-foreground">高级自然语言理解：支持复杂查询和多轮对话</li>
                <li className="text-sm text-muted-foreground">全面车辆知识库：涵盖所有功能、操作指南和故障排除</li>
                <li className="text-sm text-muted-foreground">个性化体验：根据用户习惯提供定制建议</li>
                <li className="text-sm text-muted-foreground">实时数据整合：结合车辆状态提供智能响应</li>
                <li className="text-sm text-muted-foreground">持续学习：通过OTA更新优化性能和功能</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <ModelCapabilityAssessment showIndustryAverage={showIndustryAverage} />

    </div>
  )
}

