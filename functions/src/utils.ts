import { Client } from "@elastic/enterprise-search";
import * as admin from "firebase-admin";

export const getElasticClient = () => {
	const url = process.env.APP_SEARCH_URL;
	const username = process.env.APP_SEARCH_API_KEY;
	const password = process.env.APP_SEARCH_API_SECRET;

	if (!url || !username || !password) {
		throw new Error("Elasticsearch configuration is incomplete. Please check the environment variables.");
	}

	return new Client({
		url: url,
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
