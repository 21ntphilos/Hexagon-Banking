import AuthForm from "@/app/components/AuthForm"

const SignIn = () => {
  
  return (
    <div className="flex-center size-full max-sm:px-6"> 
    <AuthForm type={"signIn"} />
    </div>
  )
}

export default SignIn