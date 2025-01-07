'use client'

import { useState } from 'react'
import { CapabilitiesSidebar } from "./sidebar"
import { MainContent } from "./main-content"
import { ComparisonSidebar } from "./comparison-sidebar"
import { ComparisonModal } from "./comparison-modal"
import { BackButton } from "./back-button"

const competitors = [
  { id: 1, name: "理想 L6", description: "理想 L6 的车载语音助手采用先进的自然语言处理技术，能够理解复杂的语境和多轮对话。它支持多种车载功能控制，并能提供实时路况和导航建议。", accuracy: 96.5, responseTime: 0.9 },
  { id: 2, name: "小鹏 G9", description: "小鹏 G9 的智能语音系统具有高度的个性化功能，可以学习用户的使用习惯和偏好。它支持方言识别，并能进行多模态交互，结合语音和手势来执行命令。", accuracy: 97.2, responseTime: 0.7 },
  { id: 3, name: "极氪 001", description: "极氪 001 的语音助手采用深度学习算法，能够持续优化和改进其性能。它具有强大的环境感知能力，可以根据车内外情况调整交互方式。", accuracy: 95.8, responseTime: 1.0 },
  { id: 4, name: "蔚来 ET5", description: "蔚来 ET5 的NOMI智能助手提供了拟人化的交互体验，具有情感识别和表达能力。它可以主动提供信息和建议，如行程规划和能耗优化。", accuracy: 98.0, responseTime: 0.6 },
  { id: 5, name: "小鹏 SU7", description: "小鹏 SU7 的语音系统集成了大规模语言模型，能够处理复杂的查询和任务。它支持车载应用的语音控制，并能与智能家居设备无缝连接。", accuracy: 97.8, responseTime: 0.8 },
  { id: 6, name: "智界 S7", description: "智界 S7 的语音助手专注于提供精准的驾驶辅助信息，如实时路况、能耗分析和充电规划。它还具有强大的车载娱乐控制功能。", accuracy: 96.0, responseTime: 1.1 },
  { id: 7, name: "问界 M7", description: "问界 M7 的语音系统采用多传感器融合技术，可以精确识别说话人的位置和身份。它支持高度个性化的车内环境控制和驾驶模式调节。", accuracy: 97.5, responseTime: 0.9 },
  { id: 8, name: "阿维塔 11", description: "阿维塔 11 的智能语音助手具有先进的噪声抑制技术，即使在嘈杂的环境中也能准确识别语音命令。它能够提供详细的车辆状态报告和维护建议。", accuracy: 95.5, responseTime: 1.2 },
  { id: 9, name: "高合 HiPhi Z", description: "高合 HiPhi Z 的语音系统整合了增强现实技术，可以通过语音命令在挡风玻璃上显示信息。它还支持复杂的场景化语音命令，如一键设置度假模式。", accuracy: 98.2, responseTime: 0.7 },
  { id: 10, name: "理想 L7", description: "理想 L7 的语音助手专注于家庭使用场景，支持多用户配置文件和偏好设置。它能够根据不同乘客的需求提供个性化的服务和建议。", accuracy: 96.8, responseTime: 1.0 }
]

export function LLMCapabilitiesLayout() {
  const [selectedCategory, setSelectedCategory] = useState('用车助手')
  const [selectedSubcategory, setSelectedSubcategory] = useState('日程驾驶场景')
  const [selectedItem, setSelectedItem] = useState('车书展示')
  const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentVehicle = {
    name: "特斯拉 Model S",
    description: "通过自然语言交互方式，为用户提供车辆使用说明书内容的查询和解答服务。支持多轮对话，上下文理解，并能根据用户具体场景提供个性化的建议。",
    accuracy: 98.5,
    responseTime: 0.8,
    industryAccuracy: 92.3,
    industryResponseTime: 1.2
  }

  const handleCompetitorSelect = (id: number) => {
    setSelectedCompetitor(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCompetitor(null)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <BackButton />
      <div className="bg-background shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-64 flex-shrink-0 bg-muted/20 border-r border-border/20 shadow-inner pt-6">
            <CapabilitiesSidebar 
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              selectedItem={selectedItem}
              onCategorySelect={setSelectedCategory}
              onSubcategorySelect={setSelectedSubcategory}
              onItemSelect={setSelectedItem}
              categoryClassName="font-semibold text-primary"
              subcategoryClassName="font-medium text-foreground"
              itemClassName="text-muted-foreground hover:text-foreground"
            />
          </div>
          <div className="flex-grow overflow-y-auto p-6">
            <MainContent 
              category={selectedCategory}
              subcategory={selectedSubcategory}
              item={selectedItem}
            />
          </div>
          <div className="w-80 flex-shrink-0 border-l border-border/10 bg-muted/10 p-4">
            <ComparisonSidebar 
              selectedCompetitor={selectedCompetitor}
              onCompetitorSelect={handleCompetitorSelect}
            />
          </div>
        </div>
      </div>
      <ComparisonModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentVehicle={currentVehicle}
        competitor={selectedCompetitor ? competitors.find(c => c.id === selectedCompetitor)! : competitors[0]}
      />
    </div>
  )
}

