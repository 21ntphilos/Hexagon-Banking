'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Fullscreen } from 'lucide-react'
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'

// export const authformSchema = z.object({
//     email: z.string().email(),
// })

const AuthForm = ({type}:{type:string}) => {
const [user, setUser] = useState(null)

    // 1. Define your form.
    const form = useForm<z.infer<typeof authformSchema>>({
        resolver: zodResolver(authformSchema),
        defaultValues: {
            email: "",
            password:""
        },
    })   
    function onSubmit(values: z.infer<typeof authformSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
              <Link
                  href='/'
                  className=" cursor-pointer flex items-center gap-1">
                  <Image
                      src="/icons/logo.svg"
                      width={34}
                      height={34}
                      alt="LOGO" />
                  <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Hexagon</h1>
              </Link>
              <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user ? "Link Account": 
                    type === "signIn"? "Sign In" 
                        :"Sign Up"}
                </h1>
              </div>
        </header>
        {user? (
            <div className="flex flex-col gap-4">
            {/* Plaid Link here  */}
        </div>)
        :(
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>

                                </FormLabel>
                                    <div className='flex flex-col w-full'>
                                    <FormControl>
                                        <Input
                                        placeholder='Enter your email'
                                        className='input-class'
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message">

                                    </FormMessage>

                            </div>
                            </div>

                            )}
                        /> */}
                        <CustomInput name={"email"} placeholder={"Enter your email"} label={"Email"} type={"email"} control={form.control} />
                        <CustomInput name={"password"} placeholder={"Enter your password"} label={"Password"} type={"password"} control={form.control} />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </>
        )}
    </section>
  )
}

export default AuthForm