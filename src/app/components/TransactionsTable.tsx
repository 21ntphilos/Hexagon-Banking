import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { transactionCategoryStyles } from "../../../constants"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const { borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default

    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full', backgroundColor)} />
            <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>

        </div>
    )
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-2">Transactions</TableHead>
                    <TableHead className="px-2">Amount </TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2">Date</TableHead>
                    <TableHead className="px-2 max-md:hidden">Channel</TableHead>
                    <TableHead className="px-2 max-md:hidden">Category</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions?.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date))
                    const amount = formatAmount(t.amount)

                    const isDebit = t.type === "debit"

                    return (
                        <TableRow key={t.id}
                            className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'}
                        hover:bg-none border-b-DEFAULT`}>
                            <TableCell className="max-w-[250px] pl-2 pr-10" >
                                <div className="flex item-center gap-3">
                                    <h1 className='text-14 truncate font-semibold text-[#344054]'>
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className={`pl-2 pr-10 font-semibold ${
                                // isDebit || amount[0] === '-' ? "text-red-500" : "text-green-500"
                                isDebit || amount[0] === '-' ? "text-[#f04438]" : "text-[#039855]"
                                }`}>
                                {isDebit ? `-${amount}` : amount}
                            </TableCell>
                            <TableCell className="pl-2 pr-10 ">
                                <CategoryBadge category={status} />
                            </TableCell>
                            <TableCell className="pl-2 pr-10 min-w-32">
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>
                            <TableCell className="pl-2 pr-10 min-w-24 capitalize max-md:hidden">{t.paymentChannel}</TableCell>
                            <TableCell className="pl-2 pr-10 max-md:hidden">
                                <CategoryBadge category={t.category} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    )
}

export default TransactionsTable