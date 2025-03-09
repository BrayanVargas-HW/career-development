import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Briefcase, GraduationCap, LineChart, FileText, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Engineer Career Development Platform</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Manage your professional profile, track skills, and plan your career growth
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <Card>
          <CardHeader>
            <UserCircle className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Professional Profile</CardTitle>
            <CardDescription>Create and manage your comprehensive professional profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Maintain your general information, skills, experience, education, and certifications in one place.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <LineChart className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>T-Shape Analysis</CardTitle>
            <CardDescription>Visualize your skills against role requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Compare your current skills against the defined T-Shape model for your role and identify growth
              opportunities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Career Development</CardTitle>
            <CardDescription>Plan and track your professional growth</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create a structured development plan with courses, coaching sessions, and practical applications.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Briefcase className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Experience Tracking</CardTitle>
            <CardDescription>Document your professional journey</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Record your work history, roles, responsibilities, and achievements throughout your career.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <GraduationCap className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Education & Learning</CardTitle>
            <CardDescription>Track your educational background</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Document your formal education, degrees, and ongoing learning initiatives.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-10 w-10 mb-2 text-primary" />
            <CardTitle>Profile Export</CardTitle>
            <CardDescription>Share your professional profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Generate and export your complete profile as a PDF or Google Doc for easy sharing.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

