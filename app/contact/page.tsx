'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'
import { AnimatedElement } from '@/components/animated-element'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-hot-toast'
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, { message: '姓名至少需要2个字符' }),
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  message: z.string().min(10, { message: '消息至少需要10个字符' }),
})

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
    toast.success('消息已发送！我们会尽快回复您。')
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-tr from-yellow-50 to-orange-50",
      "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZjdlZCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmVlZGQxIj48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMiIgZmlsbD0iI2ZlZWRkMSI+PC9jaXJjbGU+Cjwvc3ZnPg==')]",
      "bg-repeat"
    )}>
      <Header activeItem="contact" />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h1 className="text-4xl font-bold text-center mb-12">联系我们</h1>
          </AnimatedElement>
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedElement>
              <Card>
                <CardHeader>
                  <CardTitle>发送消息</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Input placeholder="您的姓名" {...register('name')} />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input type="email" placeholder="您的邮箱" {...register('email')} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Textarea placeholder="您的消息" rows={5} {...register('message')} />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">发送</Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedElement>
            <div className="space-y-8">
              <AnimatedElement>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      电子邮件
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>info@beeeval.com</p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      电话
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>+86 123 4567 8900</p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      地址
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>上海市浦东新区科技园区</p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

