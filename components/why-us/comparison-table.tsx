import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const comparisonData = [
  {
    feature: "租车",
    competitor: "租/借/买对标车辆，流程长，成本高",
    beeeval: "包含市面上所有热门车型，不需要额外流程"
  },
  {
    feature: "OTA",
    competitor: "每一个OTA都需要重新租/借/买对标车辆",
    beeeval: "所有OTA更新内容及时更新，不需要额外费用"
  },
  {
    feature: "全面性",
    competitor: "对标时间短，无法全面深入对标",
    beeeval: "AI辅助分析，全面覆盖功能点，场景模拟，异常情况呈现"
  },
  {
    feature: "拍摄",
    competitor: "受限于拍摄器材，对标资料质量不高",
    beeeval: "4K专业拍摄设备、标准化环境布置，对标材料质量高"
  },
  {
    feature: "资料整理",
    competitor: "资料分类错乱整理困烦琐，后期查找困难",
    beeeval: "AI智能分类、标签化管理、智能搜索、关联推荐"
  },
  {
    feature: "团队共享",
    competitor: "个人整理的材料较少分享给团队的工具",
    beeeval: "支持多人协作，实时同步，权限管理"
  },
  {
    feature: "总成本",
    competitor: "时间、精力、人力、设备、场地费用",
    beeeval: "订阅费用"
  }
]

export function ComparisonTable() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            BeeEval在智能汽车评测领域更专业更高效
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">功能</TableHead>
                  <TableHead>传统方式</TableHead>
                  <TableHead className="bg-primary/5">BeeEval</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.competitor}</TableCell>
                    <TableCell className="bg-primary/5">{row.beeeval}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

