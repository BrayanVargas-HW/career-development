"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, Edit, Users } from "lucide-react"
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
const initialCoachingSessions = [
  {
    id: 1,
    coach: "Sarah Johnson",
    startDate: "2023-02-01",
    endDate: "2023-07-31",
    duration: 1,
    frequency: "bi-weekly",
    objective: "Improve leadership and team management skills",
    progress: "Completed 10 sessions, showing improvement in delegation and conflict resolution",
    status: "active",
  },
  {
    id: 2,
    coach: "Michael Chen",
    startDate: "2022-09-15",
    endDate: "2023-03-15",
    duration: 2,
    frequency: "monthly",
    objective: "Enhance system architecture design skills",
    progress: "Completed all sessions, successfully applied learning to recent project",
    status: "completed",
  },
]

export default function CoachingTab() {
  const [coachingSessions, setCoachingSessions] = useState(initialCoachingSessions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentSession, setCurrentSession] = useState({
    id: 0,
    coach: "",
    startDate: "",
    endDate: "",
    duration: 1,
    frequency: "weekly",
    objective: "",
    progress: "",
    status: "active",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNew = () => {
    setCurrentSession({
      id: 0,
      coach: "",
      startDate: "",
      endDate: "",
      duration: 1,
      frequency: "weekly",
      objective: "",
      progress: "",
      status: "active",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (session) => {
    setCurrentSession(session)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setCoachingSessions(coachingSessions.filter((session) => session.id !== id))
  }

  const handleSubmit = () => {
    if (isEditing) {
      setCoachingSessions(
        coachingSessions.map((session) => (session.id === currentSession.id ? currentSession : session)),
      )
    } else {
      const newId = Math.max(0, ...coachingSessions.map((session) => session.id)) + 1
      setCoachingSessions([...coachingSessions, { ...currentSession, id: newId }])
    }
    setIsDialogOpen(false)
  }

  const handleChange = (field, value) => {
    setCurrentSession({
      ...currentSession,
      [field]: value,
    })
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active"
      case "on-hold":
        return "On Hold"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  const getFrequencyLabel = (frequency) => {
    switch (frequency) {
      case "weekly":
        return "Weekly"
      case "bi-weekly":
        return "Bi-weekly"
      case "monthly":
        return "Monthly"
      default:
        return frequency
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Coaching Sessions</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Coaching
        </Button>
      </div>

      {coachingSessions.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No coaching sessions added yet. Click "Add Coaching" to get started.
          </CardContent>
        </Card>
      ) : (
        coachingSessions.map((session) => (
          <Card key={session.id} className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-lg">Coaching with {session.coach}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {getFrequencyLabel(session.frequency)} sessions ({session.duration} hour
                      {session.duration > 1 ? "s" : ""} each)
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(session)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(session.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(session.startDate).toLocaleDateString()} -{" "}
                    {session.endDate ? new Date(session.endDate).toLocaleDateString() : "Ongoing"}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(session.status)}`}
                  >
                    {getStatusLabel(session.status)}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Objective</h4>
                  <p className="text-sm">{session.objective}</p>
                </div>

                {session.progress && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Progress</h4>
                    <p className="text-sm">{session.progress}</p>
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
            <DialogTitle>{isEditing ? "Edit Coaching Session" : "Add New Coaching Session"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your coaching session details below." : "Enter your coaching session details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="coach">Coach Name</Label>
              <Input
                id="coach"
                value={currentSession.coach}
                onChange={(e) => handleChange("coach", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentSession.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={currentSession.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (hours per session)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={currentSession.duration}
                  onChange={(e) => handleChange("duration", Number.parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={currentSession.frequency} onValueChange={(value) => handleChange("frequency", value)}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="objective">Objective</Label>
              <Textarea
                id="objective"
                value={currentSession.objective}
                onChange={(e) => handleChange("objective", e.target.value)}
                rows={2}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="progress">Progress</Label>
              <Textarea
                id="progress"
                value={currentSession.progress}
                onChange={(e) => handleChange("progress", e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={currentSession.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
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

