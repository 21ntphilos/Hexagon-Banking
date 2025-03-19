
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankTab from './BankTab'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'

const RecentTransactions = ({ accounts,
    transactions = [],
    appwriteItemId,
    page = 1 }: RecentTransactionsProps) => {
        console.log("Transactions===>", transactions)
        
    return (
        <section className='recent-transactions'>
            <header className="flex items-center justify-between">
                <h2 className="recent-transaction-label">
                    Recent Transactions
                </h2>
                <Link className="view-all-btn"
                    href={`/transaction-history/?id=${appwriteItemId}`}>
                    View All
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className='recent-transactions-tablist'>
                   {accounts.map(account=>(
                    <TabsTrigger key={account.id} value={account.appwriteItemId}>
                           <BankTab key={account.id} account={account} appwriteItemId={account.appwriteItemId}/>
                    </TabsTrigger>
                   ))}
                </TabsList>
                   {accounts.map(account=>(
                       <TabsContent key={account.id} value={account.appwriteItemId} className='space-y-4'>
                           <BankInfo account={account} appwriteItemId={account.appwriteItemId} type="full"/>
                       <TransactionsTable transactions={transactions}/>
                       </TabsContent>
                   ))}
            </Tabs>


        </section>
    )
}

export default RecentTransactions