import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UserFeedback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>用户反馈</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">
          用户反馈功能开发中
        </div>
      </CardContent>
    </Card>
  )
}

