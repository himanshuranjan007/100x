export interface Company {
  id: string
  name: string
  rate: number
  createdAt: Date
}

export interface Bill {
  id: string
  companyId: string
  companyName: string
  amount: number
  services: number
  total: number
  createdAt: Date
}

