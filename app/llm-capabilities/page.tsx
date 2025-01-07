import { Header } from "@/components/header"
import { LLMCapabilitiesLayout } from "@/components/llm-capabilities/layout"

export default function LLMCapabilitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header activeItem="llm-capabilities" />
      <LLMCapabilitiesLayout />
    </main>
  )
}

