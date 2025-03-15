import AuthForm from "@/app/components/AuthForm"
import { getLoggedInUser } from "@/lib/actions/userAction";

const SignIn = async() => {
  const user = await getLoggedInUser();
  return (
    <div className="flex-center size-full max-sm:px-6"> 
      <AuthForm type={"signIn"}  />
    </div>
  )
}

export default SignIn