"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data
const initialExperiences = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    role: "Senior Software Engineer",
    startDate: "2020-01",
    endDate: "2023-03",
    responsibilities:
      "Led a team of 5 developers to build and maintain a cloud-based SaaS platform. Implemented CI/CD pipelines and improved system performance by 40%.",
  },
  {
    id: 2,
    company: "Digital Innovations",
    role: "Software Developer",
    startDate: "2017-06",
    endDate: "2019-12",
    responsibilities:
      "Developed and maintained RESTful APIs for mobile applications. Collaborated with UX designers to implement responsive web interfaces.",
  },
]

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState(initialExperiences)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentExperience, setCurrentExperience] = useState({
    id: 0,
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNew = () => {
    setCurrentExperience({
      id: 0,
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (experience) => {
    setCurrentExperience(experience)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const handleSubmit = () => {
    if (isEditing) {
      setExperiences(experiences.map((exp) => (exp.id === currentExperience.id ? currentExperience : exp)))
    } else {
      const newId = Math.max(0, ...experiences.map((exp) => exp.id)) + 1
      setExperiences([...experiences, { ...currentExperience, id: newId }])
    }
    setIsDialogOpen(false)
  }

  const handleChange = (field, value) => {
    setCurrentExperience({
      ...currentExperience,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No work experience added yet. Click "Add Experience" to get started.
          </CardContent>
        </Card>
      ) : (
        experiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle>{experience.role}</CardTitle>
                <div className="text-sm text-muted-foreground">{experience.company}</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(experience)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(experience.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                {new Date(experience.startDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })} -
                {experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                  : " Present"}
              </div>
              <p className="text-sm">{experience.responsibilities}</p>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Experience" : "Add New Experience"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your work experience details below." : "Enter your work experience details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={currentExperience.company}
                onChange={(e) => handleChange("company", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role or Position</Label>
              <Input
                id="role"
                value={currentExperience.role}
                onChange={(e) => handleChange("role", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={currentExperience.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={currentExperience.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  placeholder="Leave blank if current"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsibilities">Responsibilities / Achievements</Label>
              <Textarea
                id="responsibilities"
                value={currentExperience.responsibilities}
                onChange={(e) => handleChange("responsibilities", e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{isEditing ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

