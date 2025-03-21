import { getLoggedInUser } from '@/lib/actions/userAction'
import { getAccounts } from '@/lib/actions/bank.action'
import BankCard from '@/app/components/BankCard'
import Headbox from "../../components/Headbox"

const MyBanks = async() => {

   const loggedInUser = await getLoggedInUser()
    const accounts = await getAccounts({ userId: loggedInUser.$id })
  return (
    <section className='flex'>
      <div className="my-banks">
        <Headbox title="My Bank Accounts" subtext="Effortlessly manage your banking activities" />
      <div className="space-y-4">
        <h2 className="header-2">Your Cards</h2>
        <div className="flex flex-wrap gap-6">
            {accounts && accounts?.data.map((a:Account)=>(
              <BankCard key={a.id} account={a} userName={loggedInUser?.firstName} />
            ))}
        </div>
      </div>
      </div>


      </section>
  )
}

export default MyBanks