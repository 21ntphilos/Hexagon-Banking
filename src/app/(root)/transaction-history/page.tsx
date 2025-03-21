import Headbox from "../../components/Headbox"
import { getLoggedInUser } from '@/lib/actions/userAction'
import { getAccount, getAccounts } from '@/lib/actions/bank.action'
import { formatAmount } from "@/lib/utils"
import TransactionsTable from "@/app/components/TransactionsTable"
import {Pagination} from '@/app/components/Pagination'

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {

  const loggedInUser = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedInUser.$id })
  const { id, page } = await searchParams
  if (!accounts) return
  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId
  const account = await getAccount({ appwriteItemId })
  const currentPagenumber = Number(page as string) || 1;

  const itemsPerPage = 12;
  let indexOfPageLastItem = currentPagenumber * itemsPerPage;
  let indexOfpageFirstItem = indexOfPageLastItem - itemsPerPage

  let currentPageItems = account.transactions.slice(indexOfpageFirstItem, indexOfPageLastItem)

  const totalPages = Math.ceil(account.transactions.length / itemsPerPage)

  return (
    <section className='transactions'>
      <div className="transactions-header">
        <Headbox title="Transaction History" subtext="See your bank details and transactions" />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">
              {account?.data.officialName}
            </p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●
              <span className="text-16">{account?.data.mask}</span>
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 tex-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
          </div>
        </div>
        <section className="flex flex-col w-full gap-6">
          <TransactionsTable transactions={currentPageItems} />
          <Pagination page={currentPagenumber} totalPages={totalPages}/>
        </section>
      </div>
    </section>
  )
}

export default TransactionHistory