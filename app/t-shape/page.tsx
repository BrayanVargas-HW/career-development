"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

// Sample data
const tShapeData = {
  role: "Full Stack Developer",
  level: "Senior",
  primarySkills: [
    { category: "Frontend", name: "React", required: 4, current: 5 },
    { category: "Frontend", name: "JavaScript", required: 4, current: 5 },
    { category: "Frontend", name: "HTML/CSS", required: 4, current: 4 },
    { category: "Backend", name: "Node.js", required: 4, current: 4 },
    { category: "Backend", name: "Express", required: 3, current: 4 },
  ],
  secondarySkills: [
    { category: "Database", name: "MongoDB", required: 3, current: 3 },
    { category: "Database", name: "PostgreSQL", required: 2, current: 3 },
    { category: "DevOps", name: "Docker", required: 2, current: 1 },
    { category: "DevOps", name: "Kubernetes", required: 1, current: 1 },
    { category: "Testing", name: "Jest", required: 3, current: 2 },
    { category: "Testing", name: "Cypress", required: 2, current: 1 },
  ],
}

const proficiencyLabels = ["Novice", "Advanced Beginner", "Competent", "Proficient", "Expert"]

export default function TShapePage() {
  const [activeTab, setActiveTab] = useState("primary")

  const gapSkills = [
    ...tShapeData.primarySkills.filter((skill) => skill.current < skill.required),
    ...tShapeData.secondarySkills.filter((skill) => skill.current < skill.required),
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">T-Shape Analysis</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>
              T-Shape Model for {tShapeData.role} ({tShapeData.level})
            </CardTitle>
            <CardDescription>
              Compare your current skills against the required T-Shape model for your role and level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="primary">Primary Expertise (Depth)</TabsTrigger>
                <TabsTrigger value="secondary">Secondary Knowledge (Breadth)</TabsTrigger>
              </TabsList>
              <TabsContent value="primary" className="space-y-4">
                <div className="space-y-4">
                  {tShapeData.primarySkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground ml-2">({skill.category})</span>
                        </div>
                        <div className="text-sm">
                          <span className={skill.current < skill.required ? "text-destructive" : "text-primary"}>
                            {proficiencyLabels[skill.current - 1]}
                          </span>
                          <span className="text-muted-foreground mx-1">/</span>
                          <span>Required: {proficiencyLabels[skill.required - 1]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(skill.current / 5) * 100}
                          className="h-2"
                          indicatorClassName={skill.current < skill.required ? "bg-destructive" : ""}
                        />
                        <span className="text-sm w-8 text-right">{skill.current}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="secondary" className="space-y-4">
                <div className="space-y-4">
                  {tShapeData.secondarySkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground ml-2">({skill.category})</span>
                        </div>
                        <div className="text-sm">
                          <span className={skill.current < skill.required ? "text-destructive" : "text-primary"}>
                            {proficiencyLabels[skill.current - 1]}
                          </span>
                          <span className="text-muted-foreground mx-1">/</span>
                          <span>Required: {proficiencyLabels[skill.required - 1]}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(skill.current / 5) * 100}
                          className="h-2"
                          indicatorClassName={skill.current < skill.required ? "bg-destructive" : ""}
                        />
                        <span className="text-sm w-8 text-right">{skill.current}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {gapSkills.length > 0 && (
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Skill Gaps</CardTitle>
              <CardDescription>
                Areas where your current skills don't meet the required level for your role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Attention Required</AlertTitle>
                <AlertDescription>
                  The following skills need improvement to meet your role requirements. Consider adding them to your
                  Career Development Plan.
                </AlertDescription>
              </Alert>

              <div className="mt-4 space-y-4">
                {gapSkills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.category}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-destructive">Current: {proficiencyLabels[skill.current - 1]}</div>
                      <div>Required: {proficiencyLabels[skill.required - 1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

