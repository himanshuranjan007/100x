'use client'

import { useState } from 'react'
import { addCompany } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

export function AddCompany() {
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await addCompany(formData)
      const form = document.getElementById('add-company') as HTMLFormElement
      form.reset()
      toast({
        title: "Company added",
        description: "The company has been successfully added to the system.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form id="add-company" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Company Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter company name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rate">Rate per Service</Label>
        <Input
          id="rate"
          name="rate"
          type="number"
          placeholder="Enter rate per service"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Company"}
      </Button>
    </form>
  )
}

