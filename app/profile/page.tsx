"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import GeneralInfoTab from "./general-info-tab"
import SkillsTab from "./skills-tab"
import ExperienceTab from "./experience-tab"
import EducationTab from "./education-tab"
import CertificationsTab from "./certifications-tab"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container py-10 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Professional Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Profile
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralInfoTab />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsTab />
        </TabsContent>
        <TabsContent value="experience">
          <ExperienceTab />
        </TabsContent>
        <TabsContent value="education">
          <EducationTab />
        </TabsContent>
        <TabsContent value="certifications">
          <CertificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

