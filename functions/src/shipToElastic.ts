import * as functions from "firebase-functions";

import { getElasticClient } from "./utils";
import { Client } from "@elastic/elasticsearch";

const elasticClient = getElasticClient();

const firestoreCollection = process.env.COLLECTION_PATH;
const elasticEngine = process.env.ELASTIC_INDEX;

if (!elasticEngine || !firestoreCollection) {
	throw new Error("Elasticsearch configuration is incomplete. Please check the environment variables.");
}

// We separate and curry this function from shipToElastic so we can test with less mocking
export const handler = (client: Client) => {

	return async (
		change: functions.Change<functions.firestore.DocumentSnapshot>
	) => {
		functions.logger.info(`Received request to send to Elastic`, {
			change,
		});
		if (change.before.exists === false) {
			functions.logger.info(`Creating document`, { id: change.after.id });
			try {
				client.index({
					id: change.after.id,
					index: elasticEngine,
					body: {...change.after.data()}
				});
			} catch (e) {
				functions.logger.error(`Error while creating document`, {
					id: change.after.id,
				});
				throw e;
			}
		} else if (change.after.exists === false) {
			functions.logger.info(`Deleting document`, { id: change.before.id });
			try {
				client.delete({
					id: change.before.id,
					index: elasticEngine
				});
			} catch (e) {
				functions.logger.error(`Error while deleting document`, {
					id: change.before.id,
				});
				throw e;
			}
		} else {
			functions.logger.info(`Updating document`, { id: change.after.id });
			try {
				client.index({
					id: change.after.id,
					index: elasticEngine,
					body: {...change.after.data()}
				});
			} catch (e) {
				functions.logger.error(`Error while updating document`, {
					id: change.after.id,
				});
				throw e;
			}
		}
		return change.after;
	};
};

export const shipToElastic = functions.firestore.document(firestoreCollection).onWrite(handler(elasticClient));