"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, Edit, Code } from "lucide-react"
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
const initialApplications = [
  {
    id: 1,
    description:
      "Applied React patterns learned from Advanced React course to refactor the authentication flow in our main product",
    hours: 20,
    progress: "complete",
    notes: "Successfully reduced bundle size by 15% and improved authentication performance",
  },
  {
    id: 2,
    description: "Implementing Docker containerization for our microservices based on Docker workshop learnings",
    hours: 15,
    progress: "partial",
    notes: "Completed containerization of 3 out of 5 services, facing some networking challenges",
  },
]

export default function ApplicationTab() {
  const [applications, setApplications] = useState(initialApplications)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentApplication, setCurrentApplication] = useState({
    id: 0,
    description: "",
    hours: 0,
    progress: "ongoing",
    notes: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNew = () => {
    setCurrentApplication({
      id: 0,
      description: "",
      hours: 0,
      progress: "ongoing",
      notes: "",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (application) => {
    setCurrentApplication(application)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id))
  }

  const handleSubmit = () => {
    if (isEditing) {
      setApplications(applications.map((app) => (app.id === currentApplication.id ? currentApplication : app)))
    } else {
      const newId = Math.max(0, ...applications.map((app) => app.id)) + 1
      setApplications([...applications, { ...currentApplication, id: newId }])
    }
    setIsDialogOpen(false)
  }

  const handleChange = (field, value) => {
    setCurrentApplication({
      ...currentApplication,
      [field]: value,
    })
  }

  const getProgressBadgeClass = (progress) => {
    switch (progress) {
      case "complete":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "partial":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "ongoing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getProgressLabel = (progress) => {
    switch (progress) {
      case "complete":
        return "Complete"
      case "partial":
        return "Partial"
      case "ongoing":
        return "Ongoing"
      default:
        return progress
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Application of Learning</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No applications added yet. Click "Add Application" to get started.
          </CardContent>
        </Card>
      ) : (
        applications.map((application) => (
          <Card key={application.id} className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Code className="h-5 w-5 text-primary mt-1" />
                  <CardTitle className="text-lg">Applied Learning</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(application)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(application.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm">{application.description}</p>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hours of Practice: {application.hours}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getProgressBadgeClass(application.progress)}`}
                  >
                    {getProgressLabel(application.progress)}
                  </span>
                </div>

                {application.notes && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Notes</h4>
                    <p className="text-sm">{application.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Application" : "Add New Application"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your application of learning details below."
                : "Enter your application of learning details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentApplication.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                placeholder="Describe how you're applying what you've learned"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hours">Hours of Practice</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                value={currentApplication.hours}
                onChange={(e) => handleChange("hours", Number.parseInt(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="progress">Progress</Label>
              <Select value={currentApplication.progress} onValueChange={(value) => handleChange("progress", value)}>
                <SelectTrigger id="progress">
                  <SelectValue placeholder="Select progress" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={currentApplication.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={2}
                placeholder="Notes on outcomes or challenges"
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

