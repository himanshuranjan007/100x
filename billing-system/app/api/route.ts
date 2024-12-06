import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'companies') {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(companies)
  } else if (type === 'bills') {
    const bills = await prisma.bill.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: true,
      },
    })
    return NextResponse.json(bills)
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}

export async function POST(request: Request) {
  const { type, ...data } = await request.json()

  if (type === 'company') {
    const company = await prisma.company.create({
      data: {
        name: data.name,
        rate: parseFloat(data.rate),
      },
    })
    return NextResponse.json(company)
  } else if (type === 'bill') {
    const company = await prisma.company.findUnique({
      where: { id: data.companyId },
    })

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const bill = await prisma.bill.create({
      data: {
        companyId: data.companyId,
        amount: company.rate,
        services: parseInt(data.services),
        total: company.rate * parseInt(data.services),
      },
      include: {
        company: true,
      },
    })
    return NextResponse.json(bill)
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}

