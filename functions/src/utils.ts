import * as admin from "firebase-admin";
import { Client } from "@elastic/elasticsearch";

export const getElasticClient = () => {
	const url = process.env.ELASTIC_URL; // URL of the Elasticsearch instance
	const username = process.env.ELASTIC_API_KEY; // Username for basic auth
	const password = process.env.ELASTIC_API_SECRET; // Password for basic auth

	// Check if all required environment variables are set
	if (!url || !username || !password) {
		throw new Error("Elasticsearch configuration is incomplete. Please check the environment variables.");
	}

	// Create a new Elasticsearch client
	return new Client({
		node: url, // Set the node URL
		auth: {
			username: username,
			password: password
		}
	});
};

export const getFirestore = (): FirebaseFirestore.Firestore => {
	admin.initializeApp({
		credential: admin.credential.applicationDefault(),
	});
	return admin.firestore();
};

export const parseIndexedFields = (indexedFields: string = ""): string[] => {
	return indexedFields.split(",").map((f) => f.trim());
};

export const batchArray = <T extends any>(
	array: Array<T>,
	size: number
): Array<Array<T>> => {
	const batches = [];
	let index = 0;

	while (index < array.length) {
		batches.push(array.slice(index, index + size));
		index += size;
	}

	return batches;
};