'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Car, Settings, Phone, Music, User, Power, Navigation, Camera, Bell, Smartphone, Monitor, Eye, Map, Download, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LazyImage } from '@/components/lazy-image'

type Category = "行车信息" | "车辆设置" | "空调" | "多媒体" | "地图导航" | "OTA"

interface MenuItem {
  icon: React.ElementType
  label: Category
}

interface Video {
  id: number
  title: string
  duration: string
  category: string
}

const primaryMenuItems: MenuItem[] = [
  { icon: Car, label: "行车信息" },
  { icon: Settings, label: "车辆设置" },
  { icon: Power, label: "空调" },
  { icon: Music, label: "多媒体" },
  { icon: Navigation, label: "地图导航" },
  { icon: Download, label: "OTA" },
]

const secondaryMenuItems: Record<Category, string[]> = {
  "行车信息": ["全部", "车载设备", "里程", "续航能耗", "驾驶行为", "安全"],
  "车辆设置": ["全部", "车门", "车窗", "座椅", "灯光", "后视镜"],
  "空调": ["全部", "温度调节", "风量调节", "模式选择", "空气净化", "香氛系统"],
  "多媒体": ["全部", "音乐", "视频", "图片", "收音机", "蓝牙连接"],
  "地图导航": ["全部", "路线规划", "实时路况", "兴趣点", "语音导航", "离线地图"],
  "OTA": ["全部", "系统更新", "功能升级", "安全补丁", "地图更新", "应用更新"],
}

const featuredVideos: Record<Category, Video[]> = {
  "行车信息": [
    { id: 1, title: "实时车速显示", duration: "2:35", category: "车载设备" },
    { id: 2, title: "行驶里程统计", duration: "3:12", category: "里程" },
    { id: 3, title: "油耗分析", duration: "4:08", category: "续航能耗" },
    { id: 4, title: "行车轨迹回放", duration: "2:56", category: "驾驶行为" },
    { id: 5, title: "驾驶行为评分", duration: "3:45", category: "驾驶行为" },
    { id: 6, title: "交通标志识别", duration: "5:20", category: "安全" }
  ],
  "车辆设置": [
    { id: 7, title: "智能车门控制", duration: "3:10", category: "车门" },
    { id: 8, title: "车窗一键控制", duration: "2:45", category: "车窗" },
    { id: 9, title: "座椅记忆功能", duration: "4:20", category: "座椅" },
    { id: 10, title: "自适应大灯系统", duration: "3:55", category: "灯光" },
    { id: 11, title: "电动后视镜调节", duration: "2:30", category: "后视镜" },
    { id: 12, title: "个性化仪表盘设置", duration: "3:40", category: "车载设备" }
  ],
  "空调": [
    { id: 13, title: "智能温度控制", duration: "3:25", category: "温度调节" },
    { id: 14, title: "自动风量调节", duration: "2:50", category: "风量调节" },
    { id: 15, title: "空调模式切换", duration: "3:15", category: "模式选择" },
    { id: 16, title: "空气质量监测", duration: "4:05", category: "空气净化" },
    { id: 17, title: "车内香氛系统", duration: "3:30", category: "香氛系统" },
    { id: 18, title: "远程空调预热", duration: "3:45", category: "温度调节" }
  ],
  "多媒体": [
    { id: 19, title: "智能音乐推荐", duration: "3:20", category: "音乐" },
    { id: 20, title: "车载影院体验", duration: "4:15", category: "视频" },
    { id: 21, title: "照片智能分类", duration: "2:55", category: "图片" },
    { id: 22, title: "智能电台搜索", duration: "3:10", category: "收音机" },
    { id: 23, title: "多设备蓝牙连接", duration: "3:40", category: "蓝牙连接" },
    { id: 24, title: "语音控制多媒体", duration: "3:35", category: "音乐" }
  ],
  "地图导航": [
    { id: 25, title: "智能路线规划", duration: "4:10", category: "路线规划" },
    { id: 26, title: "实时路况更新", duration: "3:25", category: "实时路况" },
    { id: 27, title: "兴趣点推荐", duration: "3:50", category: "兴趣点" },
    { id: 28, title: "AR导航体验", duration: "4:30", category: "语音导航" },
    { id: 29, title: "离线地图下载", duration: "2:40", category: "离线地图" },
    { id: 30, title: "多屏联动导航", duration: "3:55", category: "路线规划" }
  ],
  "OTA": [
    { id: 31, title: "系统版本更新", duration: "5:15", category: "系统更新" },
    { id: 32, title: "新功能介绍", duration: "4:40", category: "功能升级" },
    { id: 33, title: "安全补丁安装", duration: "3:20", category: "安全补丁" },
    { id: 34, title: "地图数据更新", duration: "3:45", category: "地图更新" },
    { id: 35, title: "应用商店更新", duration: "3:10", category: "应用更新" },
    { id: 36, title: "远程诊断升级", duration: "4:05", category: "系统更新" }
  ]
}

export function FeaturedFunctions() {
  const [selectedPrimary, setSelectedPrimary] = useState<Category>("行车信息")
  const [selectedSecondary, setSelectedSecondary] = useState("全部")
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 8

  const filteredVideos = featuredVideos[selectedPrimary].filter(video => 
    selectedSecondary === "全部" || video.category === selectedSecondary
  )

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  )

  return (
    <div className="py-12 bg-white rounded-3xl shadow-md mb-12">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-8"
        >
          亮点功能推荐
        </motion.h2>
        
        <div className="space-y-6">
          {/* Primary Menu */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {primaryMenuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedPrimary(item.label)
                  setSelectedSecondary("全部")
                  setCurrentPage(1)
                }}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 cursor-pointer",
                  selectedPrimary === item.label
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-primary/10'
                )}
              >
                <item.icon className={cn(
                  "w-6 h-6 mb-2",
                  selectedPrimary === item.label ? 'text-primary-foreground' : 'text-primary'
                )} />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Secondary Menu */}
          <ScrollArea className="w-full">
            <div className="flex space-x-2 pb-4">
              {secondaryMenuItems[selectedPrimary].map((item: string, index: number) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    variant={item === selectedSecondary ? "default" : "outline"}
                    onClick={() => {
                      setSelectedSecondary(item)
                      setCurrentPage(1)
                    }}
                    className={cn(
                      "transition-all duration-200",
                      item === selectedSecondary 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    )}
                  >
                    {item}
                  </Button>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {paginatedVideos.map((video: Video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: video.id * 0.1 }}
              >
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
                  <LazyImage
                    src={`/placeholder.svg?height=200&width=300&text=Video+${video.id}`}
                    alt={video.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Play className="h-12 w-12" />
                    </Button>
                  </div>
                </div>
                <h4 className="mt-2 font-semibold">{video.title}</h4>
                <p className="text-sm text-muted-foreground">{video.duration}</p>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="text-muted-foreground hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  className={cn(
                    "w-10 h-10 p-0 rounded-full",
                    currentPage === page 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="text-muted-foreground hover:text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

