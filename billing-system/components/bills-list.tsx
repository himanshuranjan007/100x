import { getBills } from '@/app/actions'
import { formatCurrency, formatDate } from '@/lib/utils'

export async function BillsList() {
  const bills = await getBills()

  return (
    <div className="space-y-8">
      {bills.length === 0 ? (
        <p className="text-center text-muted-foreground">No bills generated yet.</p>
      ) : (
        bills.map((bill) => (
          <div key={bill.id} className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{bill.company.name}</p>
              <p className="text-sm text-muted-foreground">
                {bill.services} services at {formatCurrency(bill.amount)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {formatCurrency(bill.total)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

