"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, Edit, Award, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data
const initialCertifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    date: "2022-05",
    credentialId: "AWS-123456",
    credentialUrl: "https://aws.amazon.com/verification",
  },
  {
    id: 2,
    name: "Professional Scrum Master I",
    organization: "Scrum.org",
    date: "2021-11",
    credentialId: "PSM-987654",
    credentialUrl: "https://www.scrum.org/certificates",
  },
]

export default function CertificationsTab() {
  const [certifications, setCertifications] = useState(initialCertifications)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCertification, setCurrentCertification] = useState({
    id: 0,
    name: "",
    organization: "",
    date: "",
    credentialId: "",
    credentialUrl: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddNew = () => {
    setCurrentCertification({
      id: 0,
      name: "",
      organization: "",
      date: "",
      credentialId: "",
      credentialUrl: "",
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEdit = (cert) => {
    setCurrentCertification(cert)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const handleSubmit = () => {
    if (isEditing) {
      setCertifications(
        certifications.map((cert) => (cert.id === currentCertification.id ? currentCertification : cert)),
      )
    } else {
      const newId = Math.max(0, ...certifications.map((cert) => cert.id)) + 1
      setCertifications([...certifications, { ...currentCertification, id: newId }])
    }
    setIsDialogOpen(false)
  }

  const handleChange = (field, value) => {
    setCurrentCertification({
      ...currentCertification,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No certifications added yet. Click "Add Certification" to get started.
          </CardContent>
        </Card>
      ) : (
        certifications.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start gap-2">
                <Award className="h-5 w-5 text-primary mt-1" />
                <div>
                  <CardTitle>{cert.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{cert.organization}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(cert)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                Issued: {new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </div>
              {cert.credentialId && <div className="text-sm">Credential ID: {cert.credentialId}</div>}
              {cert.credentialUrl && (
                <div className="mt-2">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Credential
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Certification" : "Add New Certification"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your certification details below." : "Enter your certification details below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Certification Name</Label>
              <Input
                id="name"
                value={currentCertification.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organization">Issuing Organization</Label>
              <Input
                id="organization"
                value={currentCertification.organization}
                onChange={(e) => handleChange("organization", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date of Completion</Label>
              <Input
                id="date"
                type="month"
                value={currentCertification.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="credentialId">Credential ID (Optional)</Label>
              <Input
                id="credentialId"
                value={currentCertification.credentialId}
                onChange={(e) => handleChange("credentialId", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="credentialUrl">Credential URL (Optional)</Label>
              <Input
                id="credentialUrl"
                type="url"
                value={currentCertification.credentialUrl}
                onChange={(e) => handleChange("credentialUrl", e.target.value)}
                placeholder="https://example.com/verify"
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

