import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { RecentUpdates } from '@/components/recent-updates'
import { FeaturedFunctions } from '@/components/featured-functions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <RecentUpdates />
        <FeaturedFunctions />
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好开始您的智能汽车之旅了吗？</h2>
            <p className="text-lg text-muted-foreground mb-8">加入BeeEval，探索更多智能汽车的精彩世界。</p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="/enterprise-membership">了解企业会员</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">联系我们</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

