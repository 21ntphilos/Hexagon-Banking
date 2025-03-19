import Headbox from '../components/Headbox'
import TotalBalanceBox from '../components/TotalBalanceBox'
import RigthSidebar from '../components/RigthSidebar'
import { getLoggedInUser } from '@/lib/actions/userAction'
import { getAccount, getAccounts } from '@/lib/actions/bank.action'
import RecentTransactions from '../components/RecentTransactions'

const Main = async ({ searchParams }: SearchParamProps) => {
  const loggedInUser = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedInUser.$id })
  const  { id, page } = await searchParams
  if (!accounts) return
  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId
  const account = await getAccount({ appwriteItemId })
  const currentPage = Number(page as string) || 1



  console.log("AD ===>", accounts.data)
  console.log("ACC ===>", account)




  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <Headbox
            title='Welcome'
            subtext='Welcome to your Dashboard'
            type='greeting'
            user={loggedInUser?.firstName || "Guest"}
          />
          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accounts?.data}
          transactions={account.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      {/* // "dev": "next dev --turbopack", */}
      <RigthSidebar user={loggedInUser}
        banks={accounts?.data.slice(0, 2)}
        transactions={accounts?.transactions} />
    </section>
  )
}

export default Main