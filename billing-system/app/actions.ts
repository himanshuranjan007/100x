'use server'

import { revalidatePath } from 'next/cache'

export async function addCompany(formData: FormData) {
  const name = formData.get('name') as string
  const rate = formData.get('rate') as string

  if (!name || !rate) {
    throw new Error('Name and rate are required')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type: 'company', name, rate }),
  })

  if (!response.ok) {
    throw new Error('Failed to add company')
  }

  revalidatePath('/dashboard')
  return response.json()
}

export async function generateBill(formData: FormData) {
  const companyId = formData.get('companyId') as string
  const services = formData.get('services') as string

  if (!companyId || !services) {
    throw new Error('Company and services are required')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type: 'bill', companyId, services }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate bill')
  }

  revalidatePath('/dashboard')
  return response.json()
}

export async function getCompanies() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api?type=companies`)
  if (!response.ok) {
    throw new Error('Failed to fetch companies')
  }
  return response.json()
}

export async function getBills() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api?type=bills`)
  if (!response.ok) {
    throw new Error('Failed to fetch bills')
  }
  return response.json()
}

