import { motion } from "framer-motion"

export function WhyUsHero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            为什么要使用 BeeEval ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            让智能汽车评测更专业，让竞品分析更高效，让团队协作更便捷
          </p>
        </motion.div>
      </div>
    </section>
  )
}

