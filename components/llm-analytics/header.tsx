import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  return (
    <>
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=36&width=36"
              alt="BeeEval Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">BeeEval</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary hover:text-primary/80">首页</Link>
            <Link href="/why-us" className="text-muted-foreground hover:text-primary">Why us?</Link>
            <Link href="/enterprise" className="text-muted-foreground hover:text-primary">企业会员</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary">联系我们</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              语言选择 <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
              账号登录
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-4 flex gap-4 border-b">
        <div className="relative flex-1">
          <Input 
            type="search" 
            placeholder="搜索车型、功能、服务..." 
            className="w-full pl-4 pr-10 py-2 rounded-lg"
          />
          <Button className="absolute right-0 top-0 h-full px-4 bg-[#F5A623] hover:bg-[#F5A623]/90 text-white rounded-l-none">
            搜索
          </Button>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          全部车型 <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}

