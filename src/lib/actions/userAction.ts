'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appWrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
const {
  APPWRITE_DB_ID:DB_ID,
  APPWRITE_BANKS_COLLECTION_ID: BANK_COLLECTION_ID,
  APPWRITE_USERS_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env

export const signUp = async ({password, ...data}:SignUpParams)=>{
    const {firstName, lastName, email} = data
    
    let newUserAccount

    try {
         const { account, databases } = await createAdminClient();
         
             newUserAccount = await account.create(
							ID.unique(),
							email,
							password,
							`${firstName} ${lastName}`
						);
           

            if(!newUserAccount) throw new Error("Error Creating User");

            const dwollaCustomerUrl = await createDwollaCustomer({
                ...data,
                type: "personal"
            })

            if(!dwollaCustomerUrl) throw new Error("Error Creating Dwolla Account");

            const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

            const newUser = await databases.createDocument(
                DB_ID!,
                USER_COLLECTION_ID!,
                ID.unique(),
                {
                    ...data,
                    userId: newUserAccount.$id,
                    dwollaCustomerId,
                    dwollaCustomerUrl
                }
            )
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
    
            return parseStringify(newUser);
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async({email, password}:signInProps) => {
	try {
            const { account } = await createAdminClient();
            const response = await account.createEmailPasswordSession(email,password);
            (await cookies()).set("ssXERART", response.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });
            console.log(response)
         
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
        console.error(error)
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

export const getPlaidToken = async (user:User)=>{
    try {
        const tokenParams = {
					user: {
						client_user_id: user.$id,
					},
					client_name: `${user.firstName} ${user.lastName}`,
					products: ["auth"] as Products[],
					country_codes: ["US"] as CountryCode[],
					language: "en",
				};

        const response = await plaidClient.linkTokenCreate(tokenParams)
    
        return parseStringify({linkToken: response.data.link_token})
    } catch (error: any) {
        console.log(error.response)
    }

} 

export const createBankAccount = async({userId,
bankId,
accountId,
accessToken,
fundingSourceUrl,
shareableId}:createBankAccountProps)=>{
    try {
        const {databases} = await createAdminClient();

        console.log("Came To Create Account")
        const bankAccount = await databases.createDocument(
             DB_ID!, 
             BANK_COLLECTION_ID!,
             ID.unique(),
             {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
             } 
            )
            return parseStringify(bankAccount)
        
    } catch (error) {
        console.log(error)
    }
}

export const exchangePublictoken = async ({
	publicToken,user
}: exchangePublicTokenProps) => {
	try {
		// Excahnge public token for access token
		const response = await plaidClient.itemPublicTokenExchange({
			public_token: publicToken,
		});
		const accessToken = response.data.access_token;
		const item_id = response.data.item_id;

		// Get account info from plaid using access token
		const accountResponse = await plaidClient.accountsGet({
			access_token: accessToken,
		});
		
		const accountData = accountResponse.data.accounts[0];
		console.log("ACC DATA",accountData);

		//generate a process token for dwolla
		const request: ProcessorTokenCreateRequest = {
			access_token: accessToken,
			account_id: accountData.account_id,
			// processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum.Dwolla,
			processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla,
		};

		const processTokenResponse = await plaidClient.processorTokenCreate(
			request
		);

            
		const processorToken = processTokenResponse.data.processor_token;

		// Create a funding source URL for the Account using Dwolla Customer ID, proccess token, bank name
		const fundingSourceUrl = await addFundingSource({
			dwollaCustomerId: user.dwollaCustomerId,
			processorToken,
			bankName: accountData.name,
		});
		if (!fundingSourceUrl) throw Error;

       const shareableId = encryptId(accountData.account_id);

		await createBankAccount({
			userId: user.$id,
			bankId: item_id,
			accountId: accountData.account_id,
			accessToken,
			fundingSourceUrl,
			shareableId
		});

		revalidatePath("/");
		return parseStringify({ publicTokenExchange: "complete" });
	} catch (error) {
		console.log(error);
        console.trace()
	}
};