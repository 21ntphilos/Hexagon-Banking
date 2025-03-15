'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/userAction'
import PlaidLink from './PlaidLink'




const AuthForm = ({ type}: { type: string}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const formSchema = authformSchema(type)

    // //posibble remove 
    // useEffect(()=>{
    //     (async()=>{
    //     const u = await getLoggedInUser()
    //     setUser(u)
    //     })()
    // },[])

    console.log("User==", user)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",

        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        console.log("Submitted")

        try {
            // signup with appwrite and create pliad token
            if (type === "signUp") {

                const userData = {
                    firstName: values.firstName!,
                    lastName: values.lastName!,
                    address1: values.address1!,
                    city: values.city!,
                    state: values.state!,
                    postalCode: values.postalCode!,
                    dateOfBirth: values.dateOfBirth!,
                    ssn: values.ssn!,
                    email: values.email,
                    password: values.password,
                }

                const newUser = await signUp(userData)
                console.log(JSON.stringify(newUser))
                setUser(newUser)
            }

            if (type === "signIn") {
                const response = await signIn({
                    email: values.email,
                    password: values.password,
                })
                if (response) router.push('/') // navigate to the homw page
                setUser(response)
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

        console.log(values)
        // setLoading(false)
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
                        {user ? "Link Account" :
                            type === "signIn" ? "Sign In"
                                : "Sign Up"}
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>  
                    </h1>
                </div>
            </header>
            {user? (
            <div className="flex flex-col gap-4">
                <PlaidLink user={user} variant={"primary"} />
            </div>
             ):( 
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === "signUp" && (
                            <>
                                        <div className="flex gap-4">

                                    <CustomInput name={"firstName"} placeholder={"John"} label={"First Name"} control={form.control} />
                                    <CustomInput name={"lastName"} placeholder={"ex: Doe"} label={"Last Name"} control={form.control} />
                                </div>
                                <CustomInput name={"address1"} placeholder={"Enter your specific address"} label={"Address"} control={form.control} />
                                <CustomInput name={"city"} placeholder={"Enter your specific city"} label={"City"} control={form.control} />
                                <div className="flex justify-between">
                                    <CustomInput name={"state"} placeholder={"ex: NY"} label={"State"} control={form.control} />
                                    <CustomInput name={"postalCode"} placeholder={"ex: 11101"} label={"Postal Code"} control={form.control} />
                                </div>
                                <div className="flex justify-between">
                                    <CustomInput name={"dateOfBirth"} placeholder={"yyyy-mm-dd"} label={"Date of Birth"} control={form.control} />
                                    <CustomInput name={"ssn"} placeholder={"ex: 1234"} label={"SSN"} control={form.control} />
                                </div>
                            </>
                        )
                        }
                        <CustomInput name={"email"} placeholder={"Enter your email"} label={"Email"} type={"email"} control={form.control} />
                        <CustomInput name={"password"} placeholder={"Enter your password"} label={"Password"} type={"password"} control={form.control} />

                        <div className="flex flex-col gap-4">
                            <Button type="submit" className='form-btn'
                                disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2

                                            size={20}
                                            className='animate-spin' /> &nbsp;
                                        Loading...
                                    </>

                                ) :
                                    (
                                        type === "signIn" ? "Sign In" : "Sign Up"
                                    )}

                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                        {type === "signIn" ? "Don't have an account?" : "Already have an account?"}
                    </p >
                    <Link className="form-link" href={type === "signIn" ? "/signup" : "/signin"}>
                        {type === "signIn" ? "Sign Up" : "Sign In"}
                    </Link>
                </footer>
            </>
            )} 
        </section>
    )
}

export default AuthForm