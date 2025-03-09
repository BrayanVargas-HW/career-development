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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const initialEducation = [
  {
    id: 1,
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    status: "completed",
    startYear: "2013",
    endYear: "2017",
    details: "Graduated with honors. Specialized in software engineering and artificial intelligence.",
  },
  {
    id: 2,
    institution: "Tech Academy",
    degree: "Master of Science in Data Science",
    status: "in-progress",
    startYear: "2022",
    endYear: "",
    details: "Currently focusing on machine learning and big data analytics.",
  },
]

export default function EducationTab() {
  const [education, setEducation] = useState(initialEducation)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEducation, setCurrentEducation] = useState({
    id: 0,
    institution: "",
    degree: "",
    status: "completed",
    startYear: "",
    endYear: "",
    details: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNew = () => {
    setCurrentEducation({
      id: 0,
      institution: "",
      degree: "",
      status: "completed",
      startYear: "",
      endYear: "",
      details: "",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (edu) => {
    setCurrentEducation(edu)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const handleSubmit = () => {
    if (isEditing) {
      setEducation(education.map((edu) => (edu.id === currentEducation.id ? currentEducation : edu)))
    } else {
      const newId = Math.max(0, ...education.map((edu) => edu.id)) + 1
      setEducation([...education, { ...currentEducation, id: newId }])
    }
    setIsDialogOpen(false)
  }

  const handleChange = (field, value) => {
    setCurrentEducation({
      ...currentEducation,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No education entries added yet. Click "Add Education" to get started.
          </CardContent>
        </Card>
      ) : (
        education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle>{edu.degree}</CardTitle>
                <div className="text-sm text-muted-foreground">{edu.institution}</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(edu.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>
                  {edu.startYear} - {edu.endYear || "Present"}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-muted">
                  {edu.status === "completed" ? "Completed" : "In Progress"}
                </span>
              </div>
              <p className="text-sm">{edu.details}</p>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Education" : "Add New Education"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your education details below." : "Enter your education details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="institution">Institution / University</Label>
              <Input
                id="institution"
                value={currentEducation.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree or Area of Study</Label>
              <Input
                id="degree"
                value={currentEducation.degree}
                onChange={(e) => handleChange("degree", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={currentEducation.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startYear">Start Year</Label>
                <Input
                  id="startYear"
                  type="text"
                  value={currentEducation.startYear}
                  onChange={(e) => handleChange("startYear", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endYear">End Year</Label>
                <Input
                  id="endYear"
                  type="text"
                  value={currentEducation.endYear}
                  onChange={(e) => handleChange("endYear", e.target.value)}
                  placeholder="Leave blank if in progress"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                value={currentEducation.details}
                onChange={(e) => handleChange("details", e.target.value)}
                rows={3}
                placeholder="Thesis, honors, specializations, etc."
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

