'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart2, MessageSquare, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import Image from 'next/image'
import { BrandSelectionPopover } from './brand-selection-popover'
import { motion } from 'framer-motion'

const skillModules = [
  { name: "出行", total: 60, available: 35 },
  { name: "车书", total: 50, available: 32 },
  { name: "车控", total: 70, available: 45 },
  { name: "闲聊", total: 40, available: 30 },
  { name: "娱乐", total: 55, available: 38 },
  { name: "创作", total: 45, available: 28 }
];

export function FeatureTree() {
  const [showIndustryAverage, setShowIndustryAverage] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [industryAverage, setIndustryAverage] = useState<any>(null)

  useEffect(() => {
    if (selectedBrands.length > 0) {
      // Simulated API call to get industry average
      const simulatedIndustryAverage = {
        skills: 950,
        duration: '3h 45m',
        modules: skillModules.map(module => ({
          ...module,
          industryAvailable: Math.floor(module.total * 0.7),
        }))
      };
      setIndustryAverage(simulatedIndustryAverage);
    } else {
      setIndustryAverage(null);
    }
  }, [selectedBrands]);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <Card className="glass-card">
        <CardContent className="py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">筛选条件：</div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIndustryAverage(!showIndustryAverage)}
                className="gap-2"
              >
                {showIndustryAverage ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    隐藏行业均值
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    显示行业均值
                  </>
                )}
              </Button>
              <BrandSelectionPopover
                selectedBrands={selectedBrands}
                onSelectedBrandsChange={setSelectedBrands}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Tree Content */}
      <Card className="glass-card">
        <Card className="mb-6 glass-card">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden gradient-border">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Vehicle Preview"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  4K Ultra HD
                </Badge>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">特斯拉 Model S</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium text-muted-foreground">系统版本:</span> <span className="text-primary">XOS 5.4.0</span></p>
                    <p><span className="font-medium text-muted-foreground">上线时间:</span> <span>2024年12月20日</span></p>
                    <p><span className="font-medium text-muted-foreground">大模型名称:</span> <span>GPT-4</span></p>
                  </div>
                  <div>
                    <p><span className="font-medium text-muted-foreground">上市时间:</span> <span>2023年6月15日</span></p>
                    <p><span className="font-medium text-muted-foreground">能源类型:</span> <span>纯电动</span></p>
                    <p><span className="font-medium text-muted-foreground">续航:</span> <span>600 km</span></p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">大模型技能树</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-primary">基本内容</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <BarChart2 className="h-4 w-4" />
                    <span>大模型技能</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">1,183</div>
                    {showIndustryAverage && industryAverage && (
                      <div className="text-sm text-muted-foreground">
                        行业平均: {industryAverage.skills}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>对话时长</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary">4h 30m</div>
                    {showIndustryAverage && industryAverage && (
                      <div className="text-sm text-muted-foreground">
                        行业平均: {industryAverage.duration}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-primary">技能丰富度</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillModules.map((module) => (
                <Card key={module.name} className="glass-card">
                  <CardContent className="p-4">
                    <div className="text-muted-foreground mb-2">{module.name}</div>
                    <div className="text-xl font-bold mb-2 text-primary">
                      {module.available}/{module.total}
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${(module.available / module.total) * 100}%` }}
                        />
                      </div>
                      {showIndustryAverage && industryAverage && (
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-muted-foreground/50 h-2.5 rounded-full"
                            style={{ width: `${(industryAverage.modules.find(m => m.name === module.name)?.industryAvailable / module.total) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {Math.round((module.available / module.total) * 100)}% 技能丰富度
                      {showIndustryAverage && industryAverage && (
                        <div>
                          行业平均: {Math.round((industryAverage.modules.find(m => m.name === module.name)?.industryAvailable / module.total) * 100)}%
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/llm-capabilities">
              <Button variant="default" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                查看详细数据
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

