import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const valueProps = [
  {
    title: "让竞品分析更全面更系统",
    description: "让产品规划全面掌握竞品功能清单",
    details: "每辆车的功能数以百计，我们通过智能化的功能树结构进行展示，方便快速查看和对比。"
  },
  {
    title: "让产品经理系统了解每一个功能细节",
    description: "所有的产品都会通过AI辅助详细分解到最小颗粒度，最多可以将功能拆分到六个层级，帮助你深入理解竞品的设计思路。"
  },
  {
    title: "智能化分析竞品差异与创新亮点",
    description: "我们的AI系统会从数千个产品功能中智能识别具有差异化、创新性的功能点，为你的产品创新提供有价值的参考。"
  }
]

export function ValueProps() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-12 items-start">
          <div className="space-y-12">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                    <p className="text-muted-foreground mb-4">{prop.description}</p>
                    {prop.details && (
                      <p className="text-sm text-muted-foreground">{prop.details}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="BeeEval Interface"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

