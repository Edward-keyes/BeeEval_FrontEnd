'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Car, ListChecks, BarChart2, FileText, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { title: '车型库', icon: Car, href: '/all-models' },
  { title: '免费体验车型', icon: Car, href: '/free-experience' },
  { title: '功能对标', icon: ListChecks, href: '/feature-comparison' },
  { title: '能力对标', icon: BarChart2, href: '/capability-comparison' },
  { title: '车型报告', icon: FileText, href: '/vehicle-report' }
];

const carModels = [
  { 
    id: 16, 
    name: '007', 
    brand: '极氪', 
    image: '/placeholder.svg?height=60&width=100&text=极氪+007',
    version: "2024款 长续航版",
    systemVersion: "Zeekr OS 5.0",
    updateDate: "2024年03月25日",
    launchDate: "2024.03",
    range: "650km",
    energyType: "纯电动",
    modelFeatures: "Zeekr AI Assistant",
    conversationDuration: "34",
    evaluationMetrics: "67"
  },
  { 
    id: 17, 
    name: 'L6', 
    brand: '理想', 
    image: '/placeholder.svg?height=60&width=100&text=理想+L6',
    version: "2024款 旗舰版",
    systemVersion: "Li OS 5.0",
    updateDate: "2024年03月20日",
    launchDate: "2024.03",
    range: "175km",
    energyType: "增程式电动（纯电续航）",
    modelFeatures: "Li Auto AI",
    conversationDuration: "33",
    evaluationMetrics: "66"
  },
  { 
    id: 18, 
    name: 'SU7', 
    brand: '小米', 
    image: '/placeholder.svg?height=60&width=100&text=小米+SU7',
    version: "2024款 高性能版",
    systemVersion: "HyperOS Auto 1.0",
    updateDate: "2024年03月28日",
    launchDate: "2024.03",
    range: "700km",
    energyType: "纯电动",
    modelFeatures: "Xiaomi AI Assistant",
    conversationDuration: "35",
    evaluationMetrics: "68"
  }
];

export function HeroSection() {
  const [selectedModel, setSelectedModel] = useState(carModels[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleModels = carModels.slice(startIndex, startIndex + (windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3));

  const handlePrevious = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(carModels.length - (windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3), prev + 1));
  };

  return (
    <div className="relative bg-white pt-8 pb-16 mb-12 rounded-3xl shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex-1 py-8">
              <motion.nav 
                className="flex flex-wrap justify-center gap-8 md:gap-10 mb-12 p-3 md:p-4 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {sidebarItems.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.href} 
                      className="flex items-center space-x-3 px-4 py-2 md:px-5 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base font-medium hover:bg-primary hover:text-primary-foreground group"
                    >
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary group-hover:text-primary-foreground" />
                      <span className="group-hover:text-primary-foreground transition-colors">{item.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="grid md:grid-cols-1 lg:grid-cols-[1fr,300px] xl:grid-cols-[1fr,350px] gap-6 items-stretch"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={selectedModel.image.replace('height=60&width=100', 'height=500&width=900')}
                    alt={`${selectedModel.brand} ${selectedModel.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-foreground bg-gradient-to-t from-white to-transparent">
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-5xl font-bold mb-2">{selectedModel.brand} {selectedModel.name}</h1>
                        <p className="text-2xl">{selectedModel.version}</p>
                      </div>
                      <Badge className="bg-primary/80 text-primary-foreground px-2 py-0.5">
                        4K Ultra HD
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <Card className="bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-4 h-[250px] md:h-[300px] lg:h-[330px] overflow-y-auto">
                      <h2 className="text-3xl font-semibold mb-4 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">基本信息</h2>
                      <div className="space-y-4 text-base">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-base text-muted-foreground">系统版本</div>
                            <div className="font-medium">{selectedModel.systemVersion}</div>
                          </div>
                          <div>
                            <div className="text-base text-muted-foreground">更新时间</div>
                            <div className="font-medium">{selectedModel.updateDate}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-base text-muted-foreground">上市时间</div>
                            <div className="font-medium">{selectedModel.launchDate}</div>
                          </div>
                          <div>
                            <div className="text-base text-muted-foreground">纯电续航里程</div>
                            <div className="font-medium">{selectedModel.range}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-base text-muted-foreground">功能模型</div>
                            <div className="font-medium">{selectedModel.modelFeatures}</div>
                          </div>
                          <div>
                            <div className="text-base text-muted-foreground">能源类型</div>
                            <div className="font-medium">{selectedModel.energyType}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Card className="bg-background/50 backdrop-blur-sm">
                      <CardContent className="p-3">
                        <div className="text-sm text-muted-foreground">对话时长</div>
                        <div className="text-xl font-bold">{selectedModel.conversationDuration}小时</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-background/50 backdrop-blur-sm">
                      <CardContent className="p-3">
                        <div className="text-sm text-muted-foreground">评测指标</div>
                        <div className="text-xl font-bold">{selectedModel.evaluationMetrics}个</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button className="w-full mt-4" size="lg" asChild>
                    <Link href="/vehicle-detail">
                      查看车辆详情
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Car Model Carousel */}
              <motion.div 
                className="mt-12 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-primary">热门车型</h3>
                    <Link href="/all-models" className="flex items-center space-x-2 text-base hover:text-primary">
                      <span className="font-medium">全部车型</span>
                      <span className="text-primary">{carModels.length}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-center relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        disabled={startIndex === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div 
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none",
                          "bg-gradient-to-r from-white to-transparent",
                          startIndex === 0 && "hidden"
                        )}
                      />
                      <div 
                        className={cn(
                          "absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none",
                          "bg-gradient-to-l from-white to-transparent",
                          startIndex >= carModels.length - (windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3) && "hidden"
                        )}
                      />
                      <div className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-hidden py-4 md:py-6 lg:py-8">
                        {visibleModels.map((model, index) => (
                          <motion.div 
                            key={`${model.brand}-${model.name}`} 
                            className="flex-shrink-0 text-center w-[150px] sm:w-[170px] md:w-[190px] cursor-pointer"
                            layout="preserve-aspect"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ 
                              scale: 1.05,
                              zIndex: 10,
                              transition: { duration: 0.2 }
                            }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            onClick={() => setSelectedModel(model)}
                          >
                            <motion.div 
                              className={`relative w-[150px] h-[90px] sm:w-[170px] sm:h-[102px] md:w-[190px] md:h-[114px] mb-2 bg-background/50 rounded-lg overflow-hidden ${
                                selectedModel.id === model.id ? 'border-2 border-primary' : 'border border-transparent'
                              }`}
                              whileHover={{ 
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                transition: { duration: 0.2 }
                              }}
                            >
                              <Image
                                src={model.image.replace('height=60&width=100', 'height=114&width=190')}
                                alt={`${model.brand} ${model.name}`}
                                width={190}
                                height={114}
                                className="object-cover"
                              />
                              {model.id <= 2 && (
                                <Badge variant="secondary" className="text-[11px] px-1 py-0 bg-primary/10 text-primary absolute top-1 right-1">
                                  Preview
                                </Badge>
                              )}
                            </motion.div>
                            <div className={`text-sm mt-2 transition-all ${
                              selectedModel.id === model.id ? 'text-primary font-medium' : 'text-muted-foreground'
                            }`}>{model.brand}</div>
                            <div className={`text-sm transition-all ${
                              selectedModel.id === model.id ? 'text-primary font-semibold text-base' : 'font-medium'
                            }`}>{model.name}</div>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        disabled={startIndex >= carModels.length - (windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

