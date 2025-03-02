'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appWrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signUp = async (data:SignUpParams)=>{
    const {firstName, lastName, email, password} = data
    console.log("got HEre")

    try {
         const { account } = await createAdminClient();

            const newUser = await account.create(
							ID.unique(),
							email,
							password,
							`${firstName} ${lastName}`
						);
            const session = await account.createEmailPasswordSession(
                email,
                password
            );

            (await cookies()).set("ssXERART", session.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });
            console.log("NEW USERS ",parseStringify(newUser));
            return parseStringify(newUser);
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async({email, password}:signInProps) => {
	try {
            const { account } = await createAdminClient();
            const response = await account.createEmailPasswordSession(email,password);
         
        return parseStringify(response)

	} catch (error) {
          console.log(error);
    }
};

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
        const user = await account.get();
		return parseStringify(user)
	} catch (error) {
		return null;
	}
}

export async function LogoutAccount(){
    try {
        const { account } = await createSessionClient();
        (await cookies()).delete("ssXERART");
        await account.deleteSession("current");
        return true;
        } catch (error) {
            return false;
            }

}