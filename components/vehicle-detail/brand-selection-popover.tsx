'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings2 } from 'lucide-react'

const carBrands = [
  { id: 'tesla', name: '特斯拉' },
  { id: 'nio', name: '蔚来' },
  { id: 'xpeng', name: '小鹏' },
  { id: 'li', name: '理想' },
  { id: 'byd', name: '比亚迪' },
  { id: 'zeekr', name: '极氪' },
  { id: 'aion', name: '广汽埃安' },
  { id: 'avatr', name: '阿维塔' },
  { id: 'bmw', name: '宝马' },
  { id: 'mercedes', name: '奔驰' },
  { id: 'audi', name: '奥迪' },
  { id: 'volkswagen', name: '大众' },
  { id: 'porsche', name: '保时捷' },
].sort((a, b) => a.name.localeCompare(b.name));

interface BrandSelectionPopoverProps {
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
  children: React.ReactNode;
}

export function BrandSelectionPopover({
  selectedBrands,
  onBrandsChange,
  children
}: BrandSelectionPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>(selectedBrands)
  const [confirmedBrands, setConfirmedBrands] = useState<string[]>(selectedBrands)

  useEffect(() => {
    setTempSelectedBrands(selectedBrands)
  }, [selectedBrands])

  const toggleBrand = (brandId: string) => {
    setTempSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  }

  const selectAll = () => {
    setTempSelectedBrands(carBrands.map(brand => brand.id));
  }

  const clearAll = () => {
    setTempSelectedBrands([]);
  }

  const handleConfirm = () => {
    onBrandsChange(tempSelectedBrands);
    setConfirmedBrands(tempSelectedBrands);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          设置对比车型
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">选择对比车型</h4>
            <div className="space-x-2">
              <Button variant="ghost" size="sm" onClick={selectAll}>
                全选
              </Button>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                清除
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {carBrands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={tempSelectedBrands.includes(brand.id)}
                    onCheckedChange={() => toggleBrand(brand.id)}
                  />
                  <label
                    htmlFor={brand.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      confirmedBrands.includes(brand.id) ? 'text-primary' : ''
                    }`}
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="text-xs text-muted-foreground">
            已选择 {tempSelectedBrands.length} 个品牌
          </div>
          <div className="flex justify-end">
            <Button onClick={handleConfirm}>确认</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

