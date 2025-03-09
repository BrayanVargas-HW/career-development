"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CoursesTab from "./courses-tab"
import CoachingTab from "./coaching-tab"
import ApplicationTab from "./application-tab"

export default function DevelopmentPage() {
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Career Development Plan</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses & Learning</TabsTrigger>
          <TabsTrigger value="coaching">Coaching Sessions</TabsTrigger>
          <TabsTrigger value="application">Application of Learning</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>
        <TabsContent value="coaching">
          <CoachingTab />
        </TabsContent>
        <TabsContent value="application">
          <ApplicationTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

