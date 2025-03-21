import Headbox from './../../components/Headbox'
import { getLoggedInUser } from '@/lib/actions/userAction'
import {  getAccounts } from '@/lib/actions/bank.action'
import PaymentTransferForm from '@/app/components/PaymentTransferForm'

const PayTransfer = async() => {
   const loggedInUser = await getLoggedInUser()
    const accounts = await getAccounts({ userId: loggedInUser.$id })
    if (!accounts) return
  return (
    <section className='payment-transfer'>
      <Headbox title="Payment Transfer" subtext="Please provide any specific details or notes relatd to the payment transfer" />
     
     <section className="size-full pt-5">
        <PaymentTransferForm  accounts={accounts?.data}/>
     </section>
      </section>
  )
}

export default PayTransfer