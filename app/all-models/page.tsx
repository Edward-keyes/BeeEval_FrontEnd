import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AllModelsGrid } from "@/components/all-models/all-models-grid"

export default function AllModelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeItem="all-models" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">全部车型</h1>
        <AllModelsGrid />
      </main>
      <Footer />
    </div>
  )
}

