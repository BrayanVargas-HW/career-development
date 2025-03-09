"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, Edit, BookOpen } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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
const initialCourses = [
  {
    id: 1,
    name: "Advanced React Patterns",
    type: "online-course",
    startDate: "2023-01-15",
    endDate: "2023-03-30",
    progress: 75,
    status: "in-progress",
    quarter: "Q1",
  },
  {
    id: 2,
    name: "Docker and Kubernetes Fundamentals",
    type: "workshop",
    startDate: "2023-04-10",
    endDate: "2023-05-15",
    progress: 25,
    status: "in-progress",
    quarter: "Q2",
  },
  {
    id: 3,
    name: "TypeScript Masterclass",
    type: "online-course",
    startDate: "2022-10-05",
    endDate: "2022-12-20",
    progress: 100,
    status: "completed",
    quarter: "Q4",
  },
]

export default function CoursesTab() {
  const [courses, setCourses] = useState(initialCourses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState({
    id: 0,
    name: "",
    type: "online-course",
    startDate: "",
    endDate: "",
    progress: 0,
    status: "not-started",
    quarter: "Q1",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNew = () => {
    setCurrentCourse({
      id: 0,
      name: "",
      type: "online-course",
      startDate: "",
      endDate: "",
      progress: 0,
      status: "not-started",
      quarter: "Q1",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (course) => {
    setCurrentCourse(course)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const handleSubmit = () => {
    if (isEditing) {
      setCourses(courses.map((course) => (course.id === currentCourse.id ? currentCourse : course)))
    } else {
      const newId = Math.max(0, ...courses.map((course) => course.id)) + 1
      setCourses([...courses, { ...currentCourse, id: newId }])
    }
    setIsDialogOpen(false)
  }

  const handleChange = (field, value) => {
    setCurrentCourse({
      ...currentCourse,
      [field]: value,
    })
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "not-started":
        return "Not Started"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Courses & Learning</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No courses added yet. Click "Add Course" to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-primary mt-1" />
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {course.type === "online-course"
                    ? "Online Course"
                    : course.type === "workshop"
                      ? "Workshop"
                      : course.type === "conference"
                        ? "Conference"
                        : course.type === "certification"
                          ? "Certification"
                          : course.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {new Date(course.startDate).toLocaleDateString()} -{" "}
                      {course.endDate ? new Date(course.endDate).toLocaleDateString() : "Ongoing"}
                    </span>
                    <span className="font-medium">{course.quarter}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(course.status)}`}
                    >
                      {getStatusLabel(course.status)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Course" : "Add New Course"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your course details below." : "Enter your course details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={currentCourse.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={currentCourse.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online-course">Online Course</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentCourse.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={currentCourse.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={currentCourse.progress}
                onChange={(e) => handleChange("progress", Number.parseInt(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={currentCourse.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quarter">Quarter</Label>
              <Select value={currentCourse.quarter} onValueChange={(value) => handleChange("quarter", value)}>
                <SelectTrigger id="quarter">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1</SelectItem>
                  <SelectItem value="Q2">Q2</SelectItem>
                  <SelectItem value="Q3">Q3</SelectItem>
                  <SelectItem value="Q4">Q4</SelectItem>
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

