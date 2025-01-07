import { Header } from "@/components/header"
import { VehicleDetailTabs } from "@/components/vehicle-detail/tabs"
import { FeatureTree } from "@/components/vehicle-detail/feature-tree"
import { CapabilityAssessment } from "@/components/vehicle-detail/capability-assessment"
import { UserFeedback } from "@/components/vehicle-detail/user-feedback"
import { VehicleDetailSearchBar } from "@/components/vehicle-detail/search-bar"

export default function VehicleDetailPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <VehicleDetailSearchBar />
      <div className="container px-4 md:px-6 py-6">
        <VehicleDetailTabs />
        <div className="grid gap-6">
          <FeatureTree />
          <CapabilityAssessment showIndustryAverage={true} selectedBrands={[]} />
          <UserFeedback />
        </div>
      </div>
    </main>
  )
}

