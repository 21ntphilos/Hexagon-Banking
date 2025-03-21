
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankTab from './BankTab'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import {Pagination} from './Pagination'


const RecentTransactions = ({ accounts,
    transactions = [],
    appwriteItemId,
    page = 1 }: RecentTransactionsProps) => {
        const itemsPerPage = 12;
        let indexOfPageLastItem = page * itemsPerPage;
        let indexOfpageFirstItem = indexOfPageLastItem - itemsPerPage 
        
        let currentPage = transactions.slice(indexOfpageFirstItem, indexOfPageLastItem)

        const totalPages = Math.ceil(transactions.length/ itemsPerPage)
        
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
                       <TransactionsTable transactions={currentPage}/>

                       { totalPages >1 && <div className="my-4 w-full">
                               <Pagination page={page} totalPages={totalPages} />  
                       </div>  }
                      
                       </TabsContent>
                   ))}
            </Tabs>


        </section>
    )
}

export default RecentTransactions