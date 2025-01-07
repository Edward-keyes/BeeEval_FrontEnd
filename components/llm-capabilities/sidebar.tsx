'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from 'react'

interface Subcategory {
  name: string
  items: string[]
}

interface Category {
  name: string
  subcategories: Subcategory[]
}

const categories: Category[] = [
  {
    name: "用车助手",
    subcategories: [
      {
        name: "日程驾驶场景",
        items: ["车书展示", "导航规划", "智能推荐"]
      },
      {
        name: "紧急情况处理场景",
        items: ["故障诊断", "应急指南", "救援服务"]
      },
      {
        name: "车辆维护与保养场景",
        items: ["保养提醒", "维修指导", "配件更换"]
      }
    ]
  },
  {
    name: "语言及多模态",
    subcategories: [
      {
        name: "交互效果",
        items: ["连续交互", "多音区识别", "语音合成"]
      },
      {
        name: "智能化",
        items: ["上下文理解", "意图识别", "知识推理"]
      }
    ]
  },
  {
    name: "通识闲聊",
    subcategories: [
      {
        name: "日常对话",
        items: ["天气查询", "新闻资讯", "生活百科"]
      },
      {
        name: "娱乐互动",
        items: ["笑话段子", "智力游戏", "音乐推荐"]
      }
    ]
  }
]

interface CapabilitiesSidebarProps {
  onCategorySelect: (category: string) => void
  onSubcategorySelect: (subcategory: string) => void
  onItemSelect: (item: string) => void
}

export function CapabilitiesSidebar({
  onCategorySelect,
  onSubcategorySelect,
  onItemSelect
}: CapabilitiesSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([])

  useEffect(() => {
    // Expand the parent categories when a subcategory or item is selected
    if (selectedSubcategory) {
      const parentCategory = categories.find(cat => 
        cat.subcategories.some(sub => sub.name === selectedSubcategory)
      )
      if (parentCategory && !expandedCategories.includes(parentCategory.name)) {
        setExpandedCategories(prev => [...prev, parentCategory.name])
      }
    }
    if (selectedItem) {
      const parentCategory = categories.find(cat => 
        cat.subcategories.some(sub => sub.items.includes(selectedItem))
      )
      const parentSubcategory = parentCategory?.subcategories.find(sub => 
        sub.items.includes(selectedItem)
      )
      if (parentCategory && !expandedCategories.includes(parentCategory.name)) {
        setExpandedCategories(prev => [...prev, parentCategory.name])
      }
      if (parentSubcategory && !expandedSubcategories.includes(parentSubcategory.name)) {
        setExpandedSubcategories(prev => [...prev, parentSubcategory.name])
      }
    }
  }, [selectedSubcategory, selectedItem, expandedCategories, expandedSubcategories])

  const toggleExpand = (name: string, type: 'category' | 'subcategory') => {
    if (type === 'category') {
      setExpandedCategories(prev => 
        prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
      )
      // 折叠类别时，同时折叠其所有子类别
      if (expandedCategories.includes(name)) {
        const subcategoriesToCollapse = categories.find(cat => cat.name === name)?.subcategories.map(sub => sub.name) || []
        setExpandedSubcategories(prev => prev.filter(item => !subcategoriesToCollapse.includes(item)))
      }
    } else {
      setExpandedSubcategories(prev => 
        prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
      )
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(null)
    setSelectedItem(null)
    onCategorySelect(category)
    // 展开选中的类别
    if (!expandedCategories.includes(category)) {
      setExpandedCategories(prev => [...prev, category])
    }
  }

  const handleSubcategorySelect = (category: string, subcategory: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(subcategory)
    setSelectedItem(null)
    onCategorySelect(category)
    onSubcategorySelect(subcategory)
    // 展开选中的类别和子类别
    if (!expandedCategories.includes(category)) {
      setExpandedCategories(prev => [...prev, category])
    }
    if (!expandedSubcategories.includes(subcategory)) {
      setExpandedSubcategories(prev => [...prev, subcategory])
    }
  }

  const handleItemSelect = (category: string, subcategory: string, item: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(subcategory)
    setSelectedItem(item)
    onCategorySelect(category)
    onSubcategorySelect(subcategory)
    onItemSelect(item)
    // 展开选中的类别和子类别
    if (!expandedCategories.includes(category)) {
      setExpandedCategories(prev => [...prev, category])
    }
    if (!expandedSubcategories.includes(subcategory)) {
      setExpandedSubcategories(prev => [...prev, subcategory])
    }
  }

  return (
    <nav className="space-y-2">
      {categories.map((category) => (
        <div key={category.name} className="space-y-1">
          <button
            onClick={() => handleCategorySelect(category.name)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors",
              selectedCategory === category.name
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{category.name}</span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                expandedCategories.includes(category.name) ? "rotate-180" : ""
              )}
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(category.name, 'category')
              }}
            />
          </button>
          {expandedCategories.includes(category.name) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-4 space-y-1"
            >
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.name} className="space-y-1">
                  <button
                    onClick={() => handleSubcategorySelect(category.name, subcategory.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors",
                      selectedCategory === category.name && selectedSubcategory === subcategory.name
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{subcategory.name}</span>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expandedSubcategories.includes(subcategory.name) ? "rotate-180" : ""
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpand(subcategory.name, 'subcategory')
                      }}
                    />
                  </button>
                  {expandedSubcategories.includes(subcategory.name) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 space-y-1"
                    >
                      {subcategory.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleItemSelect(category.name, subcategory.name, item)}
                          className={cn(
                            "w-full text-left px-4 py-2 text-sm rounded-lg transition-colors",
                            selectedCategory === category.name && selectedSubcategory === subcategory.name && selectedItem === item
                              ? "bg-primary/30 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  )
}

