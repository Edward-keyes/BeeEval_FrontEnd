'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { AnimatedElement } from '@/components/animated-element'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "基础版",
    price: 9999,
    features: [
      "访问所有车型基础数据",
      "每月10次深度分析报告",
      "标准客户支持",
    ],
  },
  {
    name: "专业版",
    price: 19999,
    features: [
      "访问所有车型详细数据",
      "无限次深度分析报告",
      "优先客户支持",
      "定制化数据dashboard",
    ],
  },
  {
    name: "企业版",
    price: 49999,
    features: [
      "全面的数据访问权限",
      "无限次深度分析报告",
      "24/7专属客户支持",
      "定制化数据解决方案",
      "现场培训和咨询服务",
    ],
  },
]

export default function EnterpriseMembership() {
  const [users, setUsers] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(plans[0])

  const calculatePrice = () => {
    return selectedPlan.price * users
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-tr from-yellow-50 to-orange-50",
      "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZjdlZCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmVlZGQxIj48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMiIgZmlsbD0iI2ZlZWRkMSI+PC9jaXJjbGU+Cjwvc3ZnPg==')]",
      "bg-repeat"
    )}>
      <Header activeItem="enterprise-membership" />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h1 className="text-4xl font-bold text-center mb-12">企业会员计划</h1>
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <AnimatedElement key={index}>
                <Card className={`h-full flex flex-col ${selectedPlan.name === plan.name ? "border-primary" : ""}`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <p className="text-2xl font-bold">¥{plan.price.toLocaleString()}/年</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full" onClick={() => setSelectedPlan(plan)}>
                      选择此计划
                    </Button>
                  </div>
                </Card>
              </AnimatedElement>
            ))}
          </div>
          <AnimatedElement>
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>价格计算器</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-grow">
                    <Label htmlFor="users">用户数量</Label>
                    <Input
                      id="users"
                      type="number"
                      min="1"
                      value={users}
                      onChange={(e) => setUsers(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex-grow">
                    <Label>选择的计划</Label>
                    <p className="text-lg font-semibold">{selectedPlan.name}</p>
                  </div>
                  <div className="flex-grow">
                    <Label>总价</Label>
                    <p className="text-2xl font-bold text-primary">¥{calculatePrice().toLocaleString()}/年</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </main>
      <Footer />
    </div>
  )
}

