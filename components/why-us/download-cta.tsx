import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function DownloadCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            向公司介绍BeeEval
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            这里还有一个BeeEval产品介绍书，可作为交流使用
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            点击下载PDF
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

