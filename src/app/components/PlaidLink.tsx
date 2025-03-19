import { Button } from '@/components/ui/button';
import { exchangePublictoken, getPlaidToken } from '@/lib/actions/userAction';
import { useRouter } from 'next/navigation';
import  { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link"
import Image from "next/image"
const PlaidLink = ({user, variant}:PlaidLinkProps) => {
 const [token, setToken] = useState('');
  const router = useRouter()

  useEffect(() => {
  (async()=>{
    const data = await getPlaidToken(user);
    setToken(data?.linkToken);
  })()
 }, [user]); // to get the token early
 
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token:string)=>{
    await exchangePublictoken({
      publicToken: public_token,
      user
    })
    router.push('/')

  }, [user]) // use callback to be called only when the user has chnaged ie the fuction is memoized
  
  const config : PlaidLinkOptions = {
      token,
    onSuccess: onSuccess
  }

  const  {ready, open} = usePlaidLink(config) //optimise to prvent unecessary rerenders
  
  return (
    <>
      {
        variant === "primary"?(
        <Button className="plaidlink-primary"
        onClick={() => open()}
        disabled={!ready}
        >
          Connect Bank
        </Button>)
        :variant === "ghost"? (
        <Button 
              onClick={() => open()}
              variant="ghost"
        className="plaidlink-ghost">
              <Image src="./icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
              <p className="hidden xl:block text-16 font-semibold text-black-2">Connect Bank</p>

            </Button>)
            : (
              <Button onClick={() => open()}
               className="plaidlink-default">
                <Image src="./icons/connect-bank.svg" alt="connect bank" width={24} height={24} />
                <p className="text-16 font-semibold text-black-2">Connect Bank</p>
            </Button>)  
               }
    </>
  )
}

export default PlaidLink