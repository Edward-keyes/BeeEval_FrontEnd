'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [loginType, setLoginType] = useState<'member' | 'supplier'>('member')
  const [isPhoneLogin, setIsPhoneLogin] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    verificationCode: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isPhoneLogin && (!formData.phone || !formData.verificationCode)) {
      toast.error('请输入手机号和验证码')
      return
    }
    if (!isPhoneLogin && (!formData.username || !formData.password)) {
      toast.error('请输入用户名和密码')
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('登录成功')
      router.push('/')
    } catch (error) {
      toast.error('登录失败，请重试')
    }
  }

  const handleSendVerificationCode = async () => {
    if (!formData.phone) {
      toast.error('请输入手机号')
      return
    }
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('验证码已发送')
    } catch (error) {
      toast.error('发送失败，请重试')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[url('/car-bg.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-20" />
      
      {/* Glowing Lines */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transform -translate-y-1/2 blur-sm" />
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent transform translate-y-1/2 blur-sm" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BEE%20Eval-36-TjleKEzVK79tEOJ8gjkfNGnp13RSqP.png"
                alt="BeeEval Logo"
                width={160}
                height={48}
                className="mb-2"
              />
              <div className="text-xl font-bold text-foreground">智能汽车评测平台</div>
            </Link>
          </div>

          <Card className="backdrop-blur-md bg-background/95 border-primary/20 h-[500px]">
            <CardContent className="p-6 h-full flex flex-col">
              <Tabs value={loginType} onValueChange={(value: 'member' | 'supplier') => setLoginType(value)}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="member" className="data-[state=active]:bg-primary">会员登录</TabsTrigger>
                  <TabsTrigger value="supplier" className="data-[state=active]:bg-primary">企业合作登录</TabsTrigger>
                </TabsList>

                <TabsContent value="member">
                  <form onSubmit={handleLogin} className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      {!isPhoneLogin ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="username" className="text-foreground">用户名</Label>
                            <Input
                              id="username"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              className="bg-background border-primary/20 text-foreground"
                              placeholder="请输入用户名"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground">密码</Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="bg-background border-primary/20 text-foreground"
                              placeholder="请输入密码"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-foreground">手机号</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="bg-background border-primary/20 text-foreground"
                              placeholder="请输入手机号"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="verificationCode" className="text-foreground">验证码</Label>
                            <div className="flex gap-2">
                              <Input
                                id="verificationCode"
                                name="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleInputChange}
                                className="bg-background border-primary/20 text-foreground flex-grow"
                                placeholder="请输入验证码"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleSendVerificationCode}
                                className="whitespace-nowrap border-primary text-primary hover:bg-primary hover:text-white"
                              >
                                发送验证码
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="space-y-4">
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        登录
                      </Button>
                      <div className="flex items-center justify-between text-sm">
                        <Button
                          type="button"
                          variant="link"
                          className="text-primary p-0 h-auto"
                          onClick={() => setIsPhoneLogin(!isPhoneLogin)}
                        >
                          {isPhoneLogin ? '密码登录' : '手机验证码登录'}
                        </Button>
                        <Link
                          href="/forgot-password"
                          className="text-primary hover:underline text-sm"
                        >
                          忘记密码？
                        </Link>
                      </div>
                      <div className="text-center text-xs text-gray-400">
                        登录即表示同意
                        <Link href="/terms" className="text-primary hover:underline mx-1">
                          服务条款
                        </Link>
                        和
                        <Link href="/privacy" className="text-primary hover:underline mx-1">
                          隐私政策
                        </Link>
                      </div>
                      <div className="text-center mt-2">
                        <Link href="/membership-guide" className="text-primary hover:underline text-sm">
                          还没有账号？查看如何获取普通会员账号
                        </Link>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="supplier">
                  <form onSubmit={handleLogin} className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="supplier-username" className="text-foreground">用户名</Label>
                        <Input
                          id="supplier-username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="bg-background border-primary/20 text-foreground"
                          placeholder="请输入企业合作用户名"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supplier-password" className="text-foreground">密码</Label>
                        <Input
                          id="supplier-password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-background border-primary/20 text-foreground"
                          placeholder="请输入密码"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        登录
                      </Button>
                      <div className="text-center text-xs text-gray-400">
                        登录即表示同意
                        <Link href="/terms" className="text-primary hover:underline mx-1">
                          服务条款
                        </Link>
                        和
                        <Link href="/privacy" className="text-primary hover:underline mx-1">
                          隐私政策
                        </Link>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

