import { Button } from '@/components/ui/button';
import { exchangePublictoken, getPlaidToken } from '@/lib/actions/userAction';
import { useRouter } from 'next/navigation';
import  { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link"

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
        <Button className="plaid-link-button ghost">
              Connect Bank
            </Button>)
            : (
            <Button className="plaid-link-button">
              Connect Bank
            </Button>)  
               }
    </>
  )
}

export default PlaidLink