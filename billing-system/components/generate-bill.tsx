'use client'

import { useState } from 'react'
import { generateBill, getCompanies } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { Company } from '@/types'

export function GenerateBill() {
  const [isLoading, setIsLoading] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState('')
  
  useState(() => {
    getCompanies().then(setCompanies)
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await generateBill(formData)
      const form = document.getElementById('generate-bill') as HTMLFormElement
      form.reset()
      setSelectedCompany('')
      toast({
        title: "Bill generated",
        description: "The bill has been successfully generated.",
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
    <form id="generate-bill" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyId">Company</Label>
        <Select name="companyId" value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="services">Number of Services</Label>
        <Input
          id="services"
          name="services"
          type="number"
          placeholder="Enter number of services"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Bill"}
      </Button>
    </form>
  )
}

