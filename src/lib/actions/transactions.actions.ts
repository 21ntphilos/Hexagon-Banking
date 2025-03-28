"use server";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { createAdminClient } from "../server/appWrite";

const {
	APPWRITE_DB_ID: DB_ID,
	APPWRITE_TRANSACTIONS_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const getTransactionsByBankId = async ({
	bankId,
}: getTransactionsByBankIdProps) => {
	try {
		const { databases } = await createAdminClient();

		const senderTransactions = await databases.listDocuments(
			DB_ID!,
			TRANSACTION_COLLECTION_ID!,
			[Query.equal("senderBankId", bankId)]
		);

		const receiverTransactions = await databases.listDocuments(
			DB_ID!,
			TRANSACTION_COLLECTION_ID!,
			[Query.equal("receiverBankId", bankId)]
		);

		const transactions = {
			total: senderTransactions.total + receiverTransactions.total,
			documents: [
				...senderTransactions.documents,
				...receiverTransactions.documents,
			],
		};

		return parseStringify(transactions);
	} catch (error) {
		console.log(error);
	}
};

export const createTransaction = async (
	transaction: CreateTransactionProps
) => {
	try {
		const { databases } = await createAdminClient();

		const newTransaction = await databases.createDocument(
			DB_ID!,
			TRANSACTION_COLLECTION_ID!,
			ID.unique(),
			{
				channel: "online",
				category: "Transfer",
				...transaction,
			}
		);
		return parseStringify(newTransaction);
	} catch (error) {
		console.log(error);
	}
};
