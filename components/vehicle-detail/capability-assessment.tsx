'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from 'recharts'
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from 'react'
import { BrandSelectionPopover } from './brand-selection-popover'
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { CartesianGrid } from 'recharts'
import { LabelList } from 'recharts';
import Link from 'next/link'
import { PolarRadiusAxis } from 'recharts';

const basicCapabilityData = [
  { subject: 'NLU准确率', A: 92, B: 85 },
  { subject: '信息提取能力', A: 88, B: 82 },
  { subject: '语言推理能力', A: 95, B: 88 },
  { subject: '跨语言理解能力', A: 90, B: 85 },
  { subject: '文化伦理', A: 87, B: 80 },
  { subject: '通识知识', A: 89, B: 83 },
  { subject: '安全性', A: 91, B: 86 },
];

const performanceMetrics = {
  generationRate: { value: 25, label: "文本生成速度", unit: "词/秒" },
  responseTime: { value: 0.8, label: "首字响应时长", unit: "秒" },
  accuracy: { value: 95, label: "免唤醒准确率", unit: "%" },
  completionRate: { value: 98, label: "任务完成率", unit: "%" },
};

const industryAverageData = {
  basic: [
    { subject: '生成速率', A: 92, B: 85 },
    { subject: '响应时间', A: 88, B: 82 },
    { subject: '准确率', A: 95, B: 88 },
    { subject: '语义理解', A: 90, B: 85 },
    { subject: '上下文关联', A: 87, B: 80 },
    { subject: '多轮对话', A: 89, B: 83 },
  ],
  domains: [
    { name: "出行", score: 89, industryAverage: 82 },
    { name: "车书", score: 92, industryAverage: 85 },
    { name: "车控", score: 87, industryAverage: 80 },
    { name: "闲聊", score: 94, industryAverage: 88 },
    { name: "娱乐", score: 90, industryAverage: 84 },
    { name: "创作", score: 88, industryAverage: 81 }
  ]
};

const hearingPerceptionData = [
  {
    name: "语音识别准确性",
    type: "score",
    currentLevel: "64.53%",
    industryAverage: "65.32%",
    progress: 65
  },
  {
    name: "语音抗噪音干扰能力",
    type: "score",
    currentLevel: "3.218",
    industryAverage: "3.311",
    progress: 80
  },
  {
    name: "多语种识别能力",
    type: "count",
    currentLevel: "支持1种",
    industryAverage: "支持2种",
    progress: 50
  },
  {
    name: "方言识别能力",
    type: "count",
    currentLevel: "支持1种",
    industryAverage: "支持1种",
    progress: 100
  }
];

const visualPerceptionData = [
  { 
    name: "车内识人",
    currentLevel: true,
    industryAverage: false
  },
  {
    name: "车内识物",
    currentLevel: false,
    industryAverage: false
  },
  {
    name: "手势识别",
    currentLevel: true,
    industryAverage: false
  },
  {
    name: "视线识别",
    currentLevel: true,
    industryAverage: true
  }
];


interface CapabilityAssessmentProps {
  showIndustryAverage: boolean;
  selectedBrands: string[];
  currentVehicle?: { name: string };
}

const domainDetailData = {
  "出行域": [
    { subject: '出行生态信息', A: 85, B: 78 },
    { subject: '生活生态信息', A: 80, B: 75 },
    { subject: '在线搜索', A: 90, B: 82 },
    { subject: '复杂指令识别率', A: 88, B: 80 },
    { subject: '直接指令识别率', A: 95, B: 90 },
    { subject: '场景意图识别率', A: 87, B: 82 },
    { subject: '跨域协作能力', A: 82, B: 76 },
    { subject: '文本生成质量', A: 89, B: 84 },
    { subject: '单轮次对话记忆', A: 92, B: 86 },
  ],
  "车书域": [
    { subject: '准确性', A: 92, B: 85 },
    { subject: '响应速度', A: 88, B: 80 },
    { subject: '理解能力', A: 95, B: 88 },
    { subject: '知识覆盖', A: 90, B: 82 },
    { subject: '上下文理解', A: 87, B: 79 },
    { subject: '个性化', A: 89, B: 81 },
    { subject: '多轮对话', A: 91, B: 83 },
    { subject: '语义理解', A: 93, B: 86 },
  ],
  "车控域": [
    { subject: '准确性', A: 90, B: 83 },
    { subject: '响应速度', A: 92, B: 85 },
    { subject: '理解能力', A: 88, B: 81 },
    { subject: '知识覆盖', A: 91, B: 84 },
    { subject: '上下文理解', A: 89, B: 82 },
    { subject: '个性化', A: 87, B: 80 },
    { subject: '多轮对话', A: 93, B: 86 },
    { subject: '语义理解', A: 90, B: 83 },
  ],
  "闲聊域": [
    { subject: '准确性', A: 88, B: 81 },
    { subject: '响应速度', A: 90, B: 83 },
    { subject: '理解能力', A: 92, B: 85 },
    { subject: '知识覆盖', A: 89, B: 82 },
    { subject: '上下文理解', A: 91, B: 84 },
    { subject: '个性化', A: 93, B: 86 },
    { subject: '多轮对话', A: 87, B: 80 },
    { subject: '语义理解', A: 90, B: 83 },
  ],
  "娱乐域": [
    { subject: '准确性', A: 91, B: 84 },
    { subject: '响应速度', A: 93, B: 86 },
    { subject: '理解能力', A: 89, B: 82 },
    { subject: '知识覆盖', A: 92, B: 85 },
    { subject: '上下文理解', A: 90, B: 83 },
    { subject: '个性化', A: 94, B: 87 },
    { subject: '多轮对话', A: 88, B: 81 },
    { subject: '语义理解', A: 91, B: 84 },
  ],
  "创作域": [
    { subject: '准确性', A: 89, B: 82 },
    { subject: '响应速度', A: 91, B: 84 },
    { subject: '理解能力', A: 93, B: 86 },
    { subject: '知识覆盖', A: 90, B: 83 },
    { subject: '上下文理解', A: 88, B: 81 },
    { subject: '个性化', A: 92, B: 85 },
    { subject: '多轮对话', A: 94, B: 87 },
    { subject: '语义理解', A: 89, B: 82 },
  ],
}

export function CapabilityAssessment({ showIndustryAverage, selectedBrands, currentVehicle = { name: "当前车型" } }: CapabilityAssessmentProps) {
  const [perceptionMode, setPerceptionMode] = useState<'hearing' | 'visual'>('hearing')
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

  return (
    <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-primary">大模型能力评测</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="basic" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">基础能力</TabsTrigger>
            <TabsTrigger value="domain" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">功能域表现</TabsTrigger>
            <TabsTrigger value="mbti" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">性格特征</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 雷达图 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">基础性能</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={showIndustryAverage ? basicCapabilityData : basicCapabilityData}>
                      <PolarGrid gridType="circle" stroke="hsl(var(--muted))" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                        stroke="hsl(var(--muted))"
                      />
                      <Radar
                        name="当前车型"
                        dataKey="A"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        stroke="hsl(var(--primary))"
                        dot={{ fill: 'hsl(var(--primary))', r: 4, fillOpacity: 1, stroke: 'none' }}
                      />
                      {showIndustryAverage && (
                        <Radar
                          name="行业平均"
                          dataKey="B"
                          fill="hsl(var(--muted-foreground))"
                          fillOpacity={0.2}
                          stroke="hsl(var(--muted-foreground))"
                          dot={{ fill: 'hsl(var(--muted-foreground))', r: 4, fillOpacity: 1, stroke: 'none' }}
                        />
                      )}
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 性能指标 */}
              <Card>
  <CardHeader>
    <CardTitle className="text-lg">性能指标</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(performanceMetrics).map(([key, { value, label, unit }]) => (
        <div key={key} className="bg-muted/50 p-4 rounded-lg">
          <div className="text-sm font-medium text-muted-foreground mb-2">{label}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-primary">{value}</span>
            <span className="text-lg text-primary">{unit}</span>
          </div>
          {showIndustryAverage && (
            <div className="text-xs text-muted-foreground mt-2">
              行业平均：
              {key === 'generationRate' && `${(value * 0.8).toFixed(1)}${unit}`}
              {key === 'responseTime' && `${(value * 1.2).toFixed(1)}${unit}`}
              {key === 'accuracy' && `${value - 5}${unit}`}
              {key === 'completionRate' && `${value - 3}${unit}`}
            </div>
          )}
          {(key === 'accuracy' || key === 'completionRate') && (
            <div className="mt-2">
              <Progress value={value} className="h-1" />
            </div>
          )}
        </div>
      ))}
    </div>
  </CardContent>
</Card>
            </div>
            <Card className="col-span-2 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-primary">感知能力</CardTitle>
                      <div className="flex gap-2">
                        <Button 
                          variant={perceptionMode === 'hearing' ? "secondary" : "outline"} 
                          size="sm" 
                          className={`text-xs ${perceptionMode === 'hearing' ? "bg-primary/10 text-primary" : ""}`}
                          onClick={() => setPerceptionMode('hearing')}
                        >
                          听觉感知
                        </Button>
                        <Button 
                          variant={perceptionMode === 'visual' ? "secondary" : "outline"} 
                          size="sm"
                          className={`text-xs ${perceptionMode === 'visual' ? "bg-primary/10 text-primary" : ""}`}
                          onClick={() => setPerceptionMode('visual')}
                        >
                          视觉感知
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-4 gap-6">
                    {(perceptionMode === 'hearing' ? hearingPerceptionData : visualPerceptionData).map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-lg p-4 shadow-sm border"
                      >
                        <div className="space-y-3">
                          <h3 className="font-medium text-base text-primary">{item.name}</h3>

                          {perceptionMode === 'hearing' ? (
                            <>
                              <Badge 
                                variant={item.type === 'score' ? "default" : "secondary"} 
                                className={
                                  item.type === 'score' 
                                    ? parseFloat(item.currentLevel) > parseFloat(item.industryAverage)
                                      ? "bg-green-100 text-green-800"
                                      : parseFloat(item.currentLevel) === parseFloat(item.industryAverage)
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                    : parseFloat(item.currentLevel.replace(/[^0-9]/g, '')) > parseFloat(item.industryAverage.replace(/[^0-9]/g, ''))
                                    ? "bg-green-100 text-green-800"
                                    : parseFloat(item.currentLevel.replace(/[^0-9]/g, '')) === parseFloat(item.industryAverage.replace(/[^0-9]/g, ''))
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {item.type === 'score' 
                                  ? parseFloat(item.currentLevel) > parseFloat(item.industryAverage)
                                    ? "领先"
                                    : parseFloat(item.currentLevel) === parseFloat(item.industryAverage)
                                    ? "持平"
                                    : "落后"
                                  : parseFloat(item.currentLevel.replace(/[^0-9]/g, '')) > parseFloat(item.industryAverage.replace(/[^0-9]/g, ''))
                                  ? "领先"
                                  : parseFloat(item.currentLevel.replace(/[^0-9]/g, '')) === parseFloat(item.industryAverage.replace(/[^0-9]/g, ''))
                                  ? "持平"
                                  : "落后"
                                }
                              </Badge>

                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium text-muted-foreground">当前水平</span>
                                  <span className="text-base font-bold text-primary">{item.currentLevel}</span>
                                </div>
                                {showIndustryAverage && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-muted-foreground">行业均值</span>
                                    <span className="text-sm font-semibold text-secondary-foreground">{item.industryAverage}</span>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-muted-foreground">当前支持</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  item.currentLevel && !item.industryAverage 
                                    ? 'bg-green-100 text-green-600' 
                                    : item.currentLevel === item.industryAverage
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-red-100 text-red-600'
                                }`}>
                                  {item.currentLevel ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                </div>
                              </div>
                              {showIndustryAverage && (
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-medium text-muted-foreground">行业支持</span>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.industryAverage ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {item.industryAverage ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          <TabsContent value="domain" className="space-y-6">
            <Card className="overflow-hidden border border-primary/10">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-primary/10">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-primary/80">功能域表现</CardTitle>
                  <Link href="/llm-analytics">
                    <Button variant="outline" size="sm" className="text-primary border-primary/20 hover:bg-primary/10">
                      查看详细数据
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <Tabs value={selectedDomain || ''} onValueChange={setSelectedDomain}>
                    <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                      {industryAverageData.domains.map((domain) => (
                        <TabsTrigger key={domain.name} value={domain.name} className="text-sm">
                          {domain.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>

                  <div className="h-[360px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={industryAverageData.domains}
                        layout="horizontal"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barSize={20}
                      >
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="hsl(var(--muted-foreground))" 
                          opacity={0.05} 
                        />
                        <XAxis 
                          dataKey="name" 
                          type="category"
                          tickLine={false}
                          axisLine={false}
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        />
                        <YAxis 
                          type="number" 
                          domain={[0, 100]} 
                          tickLine={false}
                          axisLine={false}
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar 
                          dataKey="score" 
                          name={currentVehicle?.name || "当前车型"} 
                          radius={[4, 4, 0, 0]}
                          fill="hsl(var(--primary))"
                        >
                          <LabelList 
                            dataKey="score" 
                            position="right" 
                            offset={5}
                            style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              fill: 'hsl(var(--primary))',
                            }}
                          />
                        </Bar>
                        {showIndustryAverage && (
                          <Bar 
                            dataKey="industryAverage" 
                            name="行业平均" 
                            radius={[4, 4, 0, 0]}
                            fill="hsl(var(--muted-foreground))"
                            fillOpacity={0.3}
                          >
                            <LabelList 
                              dataKey="industryAverage" 
                              position="right"
                              offset={5}
                              style={{
                                fontSize: '12px',
                                fontWeight: '500',
                                fill: 'hsl(var(--muted-foreground))',
                              }}
                            />
                          </Bar>
                        )}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {selectedDomain && (
                    <div className="h-[360px] w-full mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={domainDetailData[selectedDomain]}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name={selectedDomain} dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                          {showIndustryAverage && (
                            <Radar name="行业平均" dataKey="B" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.3} />
                          )}
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* New section for detailed domain scores */}
            
          </TabsContent>

          <TabsContent value="mbti">
  <Card>
    <CardContent className="p-6">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium text-primary/80">AI 性格类型</h3>
          <div className="text-6xl font-bold text-primary">
            ESTJ
          </div>
          <div className="text-xl text-muted-foreground">总经理型人格</div>
          <div className="max-w-2xl mx-auto mt-4 text-sm text-muted-foreground">
            具有出色的执行力和组织能力，善于制定计划并确保其得到有效实施。
            注重效率和逻辑，能够快速理解用户需求并提供准确的解决方案。
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>外向</span>
              <span>内向</span>
            </div>
            <div className="relative h-2">
              <div className="absolute inset-0 rounded-full bg-muted/50">
                <div 
                  className="absolute inset-y-0 left-0 w-[55%] rounded-full bg-gradient-to-r from-primary/60 to-primary"
                />
              </div>
            </div>
            <div className="text-right text-sm">
              <span className="text-primary font-medium">E</span>
              <span className="text-muted-foreground"> - 55%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>直觉</span>
              <span>感知</span>
            </div>
            <div className="relative h-2">
              <div className="absolute inset-0 rounded-full bg-muted/50">
                <div 
                  className="absolute inset-y-0 left-0 w-[88%] rounded-full bg-gradient-to-r from-primary/60 to-primary"
                />
              </div>
            </div>
            <div className="text-right text-sm">
              <span className="text-primary font-medium">S</span>
              <span className="text-muted-foreground"> - 88%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>情感</span>
              <span>思维</span>
            </div>
            <div className="relative h-2">
              <div className="absolute inset-0 rounded-full bg-muted/50">
                <div 
                  className="absolute inset-y-0 left-0 w-[75%] rounded-full bg-gradient-to-r from-primary/60 to-primary"
                />
              </div>
            </div>
            <div className="text-right text-sm">
              <span className="text-primary font-medium">T</span>
              <span className="text-muted-foreground"> - 75%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>判断</span>
              <span>认知</span>
            </div>
            <div className="relative h-2">
              <div className="absolute inset-0 rounded-full bg-muted/50">
                <div 
                  className="absolute inset-y-0 left-0 w-[93%] rounded-full bg-gradient-to-r from-primary/60 to-primary"
                />
              </div>
            </div>
            <div className="text-right text-sm">
              <span className="text-primary font-medium">J</span>
              <span className="text-muted-foreground"> - 93%</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

