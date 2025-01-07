'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LazyImage } from '@/components/lazy-image'
import { FileText, Map, Play } from 'lucide-react'
import Link from 'next/link'

const carModels = [
  { 
    id: 16, 
    name: '007', 
    brand: '极氪', 
    image: '/placeholder.svg?height=200&width=300&text=极氪+007',
    version: "2024款 长续航版",
    evaluationMetrics: "67",
    conversationDuration: "34",
  },
  { 
    id: 17, 
    name: 'L6', 
    brand: '理想', 
    image: '/placeholder.svg?height=200&width=300&text=理想+L6',
    version: "2024款 旗舰版",
    evaluationMetrics: "66",
    conversationDuration: "33",
  },
  { 
    id: 18, 
    name: 'SU7', 
    brand: '小米', 
    image: '/placeholder.svg?height=200&width=300&text=小米+SU7',
    version: "2024款 高性能版",
    evaluationMetrics: "68",
    conversationDuration: "35",
  },
  { 
    id: 19, 
    name: '07', 
    brand: '极越', 
    image: '/placeholder.svg?height=200&width=300&text=极越+07',
    version: "2024款 智能豪华版",
    evaluationMetrics: "65",
    conversationDuration: "32",
  },
  { 
    id: 1, 
    name: 'Model S', 
    brand: 'Tesla', 
    image: '/placeholder.svg?height=200&width=300&text=Tesla+Model+S',
    version: "2024款 长续航版",
    evaluationMetrics: "65",
    conversationDuration: "32",
  },
  { 
    id: 2, 
    name: 'ET7', 
    brand: 'NIO', 
    image: '/placeholder.svg?height=200&width=300&text=NIO+ET7',
    version: "2024款 100kWh 智能电动旗舰轿车",
    evaluationMetrics: "62",
    conversationDuration: "30",
  },
  { 
    id: 3, 
    name: 'EQS', 
    brand: 'Mercedes-Benz', 
    image: '/placeholder.svg?height=200&width=300&text=Mercedes+EQS',
    version: "2024款 EQS 580 4MATIC",
    evaluationMetrics: "68",
    conversationDuration: "35",
  },
  { 
    id: 4, 
    name: 'P7', 
    brand: 'XPeng', 
    image: '/placeholder.svg?height=200&width=300&text=XPeng+P7',
    version: "2024款 智能性能版",
    evaluationMetrics: "60",
    conversationDuration: "28",
  },
  { 
    id: 5, 
    name: 'Air', 
    brand: 'Lucid', 
    image: '/placeholder.svg?height=200&width=300&text=Lucid+Air',
    version: "2024款 Grand Touring",
    evaluationMetrics: "70",
    conversationDuration: "33",
  },
  { 
    id: 6, 
    name: 'iX', 
    brand: 'BMW', 
    image: '/placeholder.svg?height=200&width=300&text=BMW+iX',
    version: "2024款 xDrive50",
    evaluationMetrics: "64",
    conversationDuration: "31",
  },
  { 
    id: 7, 
    name: 'Taycan', 
    brand: 'Porsche', 
    image: '/placeholder.svg?height=200&width=300&text=Porsche+Taycan',
    version: "2024款 Turbo S",
    evaluationMetrics: "69",
    conversationDuration: "34",
  },
  { 
    id: 8, 
    name: 'e-tron GT', 
    brand: 'Audi', 
    image: '/placeholder.svg?height=200&width=300&text=Audi+e-tron+GT',
    version: "2024款 RS e-tron GT",
    evaluationMetrics: "63",
    conversationDuration: "30",
  },
  { 
    id: 9, 
    name: 'EQE', 
    brand: 'Mercedes-Benz', 
    image: '/placeholder.svg?height=200&width=300&text=Mercedes+EQE',
    version: "2024款 EQE 350+",
    evaluationMetrics: "67",
    conversationDuration: "33",
  },
  { 
    id: 10, 
    name: 'I-PACE', 
    brand: 'Jaguar', 
    image: '/placeholder.svg?height=200&width=300&text=Jaguar+I-PACE',
    version: "2024款 EV400 SE",
    evaluationMetrics: "61",
    conversationDuration: "29",
  },
  { 
    id: 11, 
    name: 'Ioniq 5', 
    brand: 'Hyundai', 
    image: '/placeholder.svg?height=200&width=300&text=Hyundai+Ioniq+5',
    version: "2024款 长续航四驱版",
    evaluationMetrics: "62",
    conversationDuration: "30",
  },
  { 
    id: 12, 
    name: 'EV6', 
    brand: 'Kia', 
    image: '/placeholder.svg?height=200&width=300&text=Kia+EV6',
    version: "2024款 GT-Line AWD",
    evaluationMetrics: "60",
    conversationDuration: "29",
  },
  { 
    id: 13, 
    name: 'Ocean', 
    brand: 'Fisker', 
    image: '/placeholder.svg?height=200&width=300&text=Fisker+Ocean',
    version: "2024款 Extreme",
    evaluationMetrics: "59",
    conversationDuration: "28",
  },
  { 
    id: 14, 
    name: 'Polestar 2', 
    brand: 'Polestar', 
    image: '/placeholder.svg?height=200&width=300&text=Polestar+2',
    version: "2024款 长续航双电机版",
    evaluationMetrics: "63",
    conversationDuration: "31",
  },
  { 
    id: 15, 
    name: 'ID.4', 
    brand: 'Volkswagen', 
    image: '/placeholder.svg?height=200&width=300&text=Volkswagen+ID.4',
    version: "2024款 Pro S AWD",
    evaluationMetrics: "61",
    conversationDuration: "29",
  }
];

export function AllModelsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {carModels.map((model) => (
        <motion.div
          key={model.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="overflow-hidden h-full flex flex-col group">
            <div className="relative aspect-[4/3]">
              <LazyImage
                src={model.image}
                alt={`${model.brand} ${model.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  4K
                </Badge>
                {model.id <= 2 && (
                  <Badge className="bg-primary text-primary-foreground">
                    Preview
                  </Badge>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/vehicle-detail/${model.id}`}>
                  <Button variant="secondary" size="lg" className="text-white bg-primary/80 hover:bg-primary">
                    <Play className="h-4 w-4 mr-2" />
                    查看详情
                  </Button>
                </Link>
              </div>
            </div>
            <CardContent className="flex-grow p-4">
              <h3 className="text-lg font-semibold mb-2">{model.brand} {model.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{model.version}</p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <div className="text-muted-foreground">功能拆解</div>
                  <div className="font-medium">{model.evaluationMetrics} 个</div>
                </div>
                <div>
                  <div className="text-muted-foreground">视频总时长</div>
                  <div className="font-medium">{model.conversationDuration}小时</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  车型报告
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Map className="h-4 w-4 mr-2" />
                  功能地图
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

