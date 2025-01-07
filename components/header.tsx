'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from 'lucide-react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import DOMPurify from 'isomorphic-dompurify'
import { NAV_ITEMS } from '@/constants/navigation'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from 'lucide-react'

export function Header({ activeItem = 'home' }: { activeItem?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [language, setLanguage] = useState('中文')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchTerm = DOMPurify.sanitize((e.target as HTMLFormElement).search.value);
    console.log('Searching for:', searchTerm)
  }, [])

  const memoizedNavItems = useMemo(() => (
    NAV_ITEMS.map((item) => (
      <motion.div
        key={item.label}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href={item.href}
          className={cn(
            "relative py-2 text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? 'text-primary' : 'text-foreground/80'
          )}
          aria-current={pathname === item.href ? 'page' : undefined}
        >
          {item.label}
          {pathname === item.href && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="activeTab"
            />
          )}
        </Link>
      </motion.div>
    ))
  ), [pathname])

  return (
    <motion.header 
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-200",
        scrolled ? "glass-card shadow-lg bg-background/80" : "bg-transparent"
      )}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 text-sm relative">
          <Link href="/" className="flex items-center h-full z-10">
            <span className="text-2xl font-bold text-primary">BeeEval</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {memoizedNavItems}
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center">
                {!isSearchOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 300 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-2 relative"
                    >
                      <Input
                        type="search"
                        placeholder="搜索车型、功能、服务..."
                        className="w-full h-9 pl-4 pr-10 text-sm bg-background/80 backdrop-blur-sm border-none rounded-full focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="打开菜单" onClick={() => {/* 实现移动端菜单打开逻辑 */}}>
            <Search className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('中文')}>中文</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('日本語')}>日本語</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('English')}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="default" 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow"
                onClick={() => router.push('/login')}
              >
                账号登录
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

