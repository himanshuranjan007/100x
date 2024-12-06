import { getCompanies } from '@/app/actions'
import { formatCurrency, formatDate } from '@/lib/utils'

export async function CompanyList() {
  const companies = await getCompanies()

  return (
    <div className="space-y-8">
      {companies.length === 0 ? (
        <p className="text-center text-muted-foreground">No companies added yet.</p>
      ) : (
        companies.map((company) => (
          <div key={company.id} className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{company.name}</p>
              <p className="text-sm text-muted-foreground">
                Added on {formatDate(company.createdAt)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {formatCurrency(company.rate)}/service
            </div>
          </div>
        ))
      )}
    </div>
  )
}

