'use client'

import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
]

const quickLinks = [
  { label: '关于我们', href: '#' },
  { label: '服务项目', href: '#' },
  { label: '新闻资讯', href: '#' },
  { label: '加入我们', href: '#' },
  { label: '隐私政策', href: '#' },
  { label: '使用条款', href: '#' }
]

const contactInfo = [
  { icon: Phone, content: '+86 400-123-4567', href: 'tel:+86400-123-4567' },
  { icon: Mail, content: 'contact@example.com', href: 'mailto:contact@example.com' },
  { icon: MapPin, content: '上海市浦东新区世纪大道1号', href: '#' }
]

export function Footer() {
  return (
    <footer className="bg-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">智能汽车评测</h3>
            <p className="text-muted-foreground">
              专业、全面的智能汽车评测平台，为您提供最新、最权威的评测报告。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">快速链接</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">联系我们</h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.content}>
                  <a
                    href={info.href}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <info.icon className="h-5 w-5" />
                    <span>{info.content}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">订阅通讯</h3>
            <p className="text-muted-foreground">
              订阅我们的通讯，获取最新的评测报告和行业动态。
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // TODO: Handle newsletter subscription
              }}
              className="flex flex-col space-y-2"
            >
              <Input
                type="email"
                placeholder="请输入您的邮箱"
                className="bg-background"
              />
              <Button type="submit" className="w-full">
                订阅
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 智能汽车评测. 保留所有权利.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                隐私政策
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                使用条款
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie 政策
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

