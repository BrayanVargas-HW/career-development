"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data
const initialSkills = [
  { id: 1, category: "Frontend", technology: "React", proficiency: "expert" },
  { id: 2, category: "Frontend", technology: "Angular", proficiency: "competent" },
  { id: 3, category: "Backend", technology: "Node.js", proficiency: "proficient" },
  { id: 4, category: "Backend", technology: "Python", proficiency: "advanced-beginner" },
  { id: 5, category: "Database", technology: "MongoDB", proficiency: "competent" },
  { id: 6, category: "Database", technology: "PostgreSQL", proficiency: "proficient" },
  { id: 7, category: "DevOps", technology: "Docker", proficiency: "novice" },
  { id: 8, category: "DevOps", technology: "Kubernetes", proficiency: "novice" },
]

export default function SkillsTab() {
  const [skills, setSkills] = useState(initialSkills)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [proficiencyFilter, setProficiencyFilter] = useState("")
  const [newRequestOpen, setNewRequestOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    type: "category",
    name: "",
    category: "",
    reason: "",
  })

  const handleProficiencyChange = (skillId: number, newProficiency: string) => {
    setSkills(skills.map((skill) => (skill.id === skillId ? { ...skill, proficiency: newProficiency } : skill)))
  }

  const handleRequestSubmit = () => {
    console.log("New request submitted:", newRequest)
    setNewRequestOpen(false)
    setNewRequest({
      type: "category",
      name: "",
      category: "",
      reason: "",
    })
  }

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.technology.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter ? skill.category === categoryFilter : true
    const matchesProficiency = proficiencyFilter ? skill.proficiency === proficiencyFilter : true

    return matchesSearch && matchesCategory && matchesProficiency
  })

  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search technologies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={proficiencyFilter} onValueChange={setProficiencyFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Proficiencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">All Proficiencies</SelectItem>
                <SelectItem value="novice">Novice</SelectItem>
                <SelectItem value="advanced-beginner">Advanced Beginner</SelectItem>
                <SelectItem value="competent">Competent</SelectItem>
                <SelectItem value="proficient">Proficient</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={newRequestOpen} onOpenChange={setNewRequestOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Request New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request New Technology or Category</DialogTitle>
                  <DialogDescription>
                    Submit a request for a new technology or category to be added to the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="request-type">Request Type</Label>
                    <Select
                      value={newRequest.type}
                      onValueChange={(value) => setNewRequest({ ...newRequest, type: value })}
                    >
                      <SelectTrigger id="request-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="category">New Category</SelectItem>
                        <SelectItem value="technology">New Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="request-name">
                      {newRequest.type === "category" ? "Category Name" : "Technology Name"}
                    </Label>
                    <Input
                      id="request-name"
                      value={newRequest.name}
                      onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
                    />
                  </div>

                  {newRequest.type === "technology" && (
                    <div className="grid gap-2">
                      <Label htmlFor="request-category">Category</Label>
                      <Select
                        value={newRequest.category}
                        onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                      >
                        <SelectTrigger id="request-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="request-reason">Reason for Request</Label>
                    <Input
                      id="request-reason"
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                      placeholder="Why is this needed?"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewRequestOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRequestSubmit}>Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead>Proficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSkills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.technology}</TableCell>
                <TableCell>
                  <Select value={skill.proficiency} onValueChange={(value) => handleProficiencyChange(skill.id, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={skill.proficiency} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novice">Novice</SelectItem>
                      <SelectItem value="advanced-beginner">Advanced Beginner</SelectItem>
                      <SelectItem value="competent">Competent</SelectItem>
                      <SelectItem value="proficient">Proficient</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

