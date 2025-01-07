'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Hexagon, Brain, Users, LineChart, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from "@/lib/utils"

interface BeeHouse {
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
}

const beeHouses: BeeHouse[] = [
  {
    title: "功能蜂房",
    subtitle: "Function Bee Cell",
    description: "通过对大模型功能的充分拆解，以场景为出发点，形成了7大功能域，即用车、出行、知识、基础能力、创作、快捷场景、娱乐，共计93项功能描述，全面收集智能座舱大模型的功能细节。",
    icon: Hexagon
  },
  {
    title: "测评蜂房",
    subtitle: "Evaluation Bee Cell",
    description: "围绕基于Agent范式的P-CAFE评测方法，共计5项一级指标，15项二级指标，60项三级指标，7大功能域，为企业提供系统化的能力评估，分析各品牌大模型能力的具体表现。",
    icon: LineChart
  },
  {
    title: "设计蜂房",
    subtitle: "Design Bee Cell",
    description: "致力于设计范式的变革，通过系统化的评测和分析，帮助企业理解并应用新的设计理念，以适应大模型技术的发展，提升用户体验。",
    icon: Brain
  },
  {
    title: "用户蜂房",
    subtitle: "Customer Bee Cell",
    description: "采集最真实的用户交互与反馈，填补现实场景与开发场景之间的鸿沟，为优化产品设计和提升用户满意度提供最直接的信息输入。",
    icon: Users
  }
]

interface ProcessStep {
  step: number
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "概念化",
    description: "我们深入研究用户需求，制定完整的评测方案。"
  },
  {
    step: 2,
    title: "设计开发",
    description: "基于专业标准，开发评测工具和方法。"
  },
  {
    step: 3,
    title: "测试与改进",
    description: "持续优化评测系统，确保结果的准确性和可靠性。"
  }
]

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeItem="why-us" />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-primary/10 to-transparent">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              引领智能座舱大模型发展趋势
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              蜜蜂以其卓越的协作能力和集体智慧，创造出令人惊叹的蜂巢奇迹；而蜜蜂的勤劳与合作，又维系了生态的可持续发展。
              <span className="text-primary font-semibold">BeeEval（蜜蜂智评）</span>
              正是汲取了蜜蜂这种高效协作与智慧共享的精神，致力于通过最全面的数据采集与专业洞察，赋能企业在智能座舱大模型产品定义和设计开发领域实现突破与创新。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lab Introduction */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">XAI Lab</h2>
            <p className="text-lg text-muted-foreground">
              智舱大模型设计引领者，是蜂舱智能和同济大学联合的实验室，致力于推动智能座舱技术的创新与发展。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bee Houses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            BeeEval 蜜蜂智评产品体系
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {beeHouses.map((house, index) => (
              <motion.div
                key={house.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <house.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{house.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{house.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{house.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">我们的工作流程</h2>
            <p className="text-lg text-muted-foreground">
              系统化的评测流程，确保每一个细节都得到专业分析
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative h-full hover:border-primary transition-all duration-200">
                  <CardContent className="pt-6">
                    <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-4 mt-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

