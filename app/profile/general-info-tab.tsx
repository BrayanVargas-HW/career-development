"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function GeneralInfoTab() {
  const [formData, setFormData] = useState({
    email: "john.doe@example.com",
    name: "John Doe",
    description: "Experienced software engineer with a passion for building scalable web applications.",
    manager: "Jane Smith",
    level: "senior",
    location: "mexico",
    knownFor: "Problem solving, React, Node.js",
    loveTechBecause: "I love technology because it allows me to create solutions that impact people's lives.",
    profile: "fullstack",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save the general information
    console.log("Saving general info:", formData)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Manager</Label>
              <Input id="manager" value={formData.manager} onChange={(e) => handleChange("manager", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid">Mid-level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="brazil">Brazil</SelectItem>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="colombia">Colombia</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                  <SelectItem value="peru">Peru</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile">Professional Profile</Label>
              <Select value={formData.profile} onValueChange={(value) => handleChange("profile", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullstack">Full Stack</SelectItem>
                  <SelectItem value="frontend">Front End</SelectItem>
                  <SelectItem value="backend">Back End</SelectItem>
                  <SelectItem value="sdet">SDET</SelectItem>
                  <SelectItem value="qa-automation">QA Automation Engineer</SelectItem>
                  <SelectItem value="qa-manual">Manual QA</SelectItem>
                  <SelectItem value="scrum-master">Scrum Master</SelectItem>
                  <SelectItem value="business-analyst">Business Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="knownFor">I'm known for</Label>
              <Input
                id="knownFor"
                value={formData.knownFor}
                onChange={(e) => handleChange("knownFor", e.target.value)}
                placeholder="e.g., Problem solving, React, Node.js"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Personal Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="loveTechBecause">I love tech because</Label>
              <Textarea
                id="loveTechBecause"
                value={formData.loveTechBecause}
                onChange={(e) => handleChange("loveTechBecause", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

