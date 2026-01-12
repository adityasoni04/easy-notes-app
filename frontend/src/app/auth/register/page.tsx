"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Eye, EyeOff, CheckCircle2, XCircle, NotebookPen } from "lucide-react"
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
  const [isMatching, setIsMatching] = useState<boolean | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useAuth()
  const router = useRouter()

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  useEffect(() => {
    if (formData.email === "") {
      setIsEmailValid(null)
    } else {
      setIsEmailValid(validateEmail(formData.email))
    }
  }, [formData.email])


  useEffect(() => {
    if (formData.confirmPassword === "") {
      setIsMatching(null)
    } else {
      setIsMatching(formData.password === formData.confirmPassword)
    }
  }, [formData.password, formData.confirmPassword])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isMatching) {
      setError("Passwords do not match")
      return
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      Cookies.set('token', response.data.token, {
        expires: 1,
        secure: true,
        sameSite: 'strict'
      })

      localStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
      router.push("/dashboard")

    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10 -ml-32 -mb-32"></div>

        <Card className="border border-primary/20 shadow-xl backdrop-blur-sm bg-white/80">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg"><NotebookPen /></span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Easy Notes
              </span>
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Join Easy Notes today to start taking smarter notes
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Full Name</label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="bg-muted/50 border-primary/20 h-9 rounded-xl focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="bg-muted/50 border-primary/20 h-9 rounded-xl focus-visible:ring-primary"
                />
              </div>
              {isEmailValid === false && (
                <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1">
                  <XCircle className="h-3 w-3" /> Invalid email address
                </p>
              )}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Password</label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="bg-muted/50 border-primary/20 h-9 rounded-xl pr-10 focus-visible:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Confirm Password</label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="bg-muted/50 border-primary/20 h-9 rounded-xl focus-visible:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="h-4 px-1 mt-1">
                  {isMatching === true && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in zoom-in-95">
                      <CheckCircle2 className="h-3 w-3" /> Passwords matched
                    </p>
                  )}
                  {isMatching === false && (
                    <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1 animate-in slide-in-from-left-1">
                      <XCircle className="h-3 w-3" /> Passwords do not match
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-2 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-10 mt-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold text-sm shadow-lg transition-all active:scale-[0.98] rounded-xl"
                disabled={isLoading || isMatching === false}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-primary/10">
              <p className="text-xs text-muted-foreground text-center">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}