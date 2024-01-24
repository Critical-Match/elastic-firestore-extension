import * as functions from "firebase-functions";

import { getFirestore, getElasticClient, batchArray } from "./utils";

const elasticClient = getElasticClient();
const firestore = getFirestore();

const firestoreCollection = process.env.COLLECTION_PATH;
const elasticIndex = process.env.ELASTIC_INDEX;
const batchSize = 50;

if (!firestoreCollection || !elasticIndex) {
	throw new Error("Firestore and Elasticsearch configuration is incomplete. Please check the environment variables.");
}

export const bulkImportToElastic = async () => {
	const querySnapshot = await firestore.collection(firestoreCollection).get();
	const documents = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));

	const documentBatches = batchArray(documents, batchSize);

	for (const [index, documentBatch] of documentBatches.entries()) {
		const bulkBody = documentBatch.flatMap(doc => [
			{ index: { _index: elasticIndex, _id: doc.id } },
			doc
		]);

		await elasticClient.bulk({ body: bulkBody });

		functions.logger.info(`Successfully submitted batch ${index} to Elasticsearch index ${elasticIndex}`);
	}
};

export const triggerBulkImport = functions.firestore.document('elastic_sync/backfill')
	.onUpdate(async (change, context) => {
		const beforeData = change.before.data();
		const afterData = change.after.data();

		if (beforeData.trigger === false && afterData.trigger === true) {
			functions.logger.info('Triggering bulk import to Elasticsearch.');
			try {
				await bulkImportToElastic();
				functions.logger.info('Successfully completed bulk import.');
			} catch (error) {
				functions.logger.error('Error during bulk import', error);
				throw error;
			}
		}
	});