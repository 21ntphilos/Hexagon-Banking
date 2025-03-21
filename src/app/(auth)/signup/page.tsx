import AuthForm from "@/app/components/AuthForm"
import { getLoggedInUser } from "@/lib/actions/userAction";
import { encryptId } from "@/lib/utils";


const SignUp = async () => {

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type={"signUp"} />
    </section>
  )
}

export default SignUp