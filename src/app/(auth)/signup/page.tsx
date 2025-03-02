import AuthForm from "@/app/components/AuthForm"
import { getLoggedInUser } from "@/lib/actions/userAction";


const SignUp = async () => {
  const user = await getLoggedInUser();
  console.log(user)

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type={"signUp"} />
      </section>
  )
}

export default SignUp