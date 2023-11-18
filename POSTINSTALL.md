<!--
This file provides your users an overview of how to use your extension after they've installed it. All content is optional, but this is the recommended format. Your users will see the contents of this file in the Firebase console after they install the extension.

Include instructions for using the extension and any important functional details. Also include **detailed descriptions** for any additional post-installation setup required by the user.

Reference values for the extension instance using the ${param:PARAMETER_NAME} or ${function:VARIABLE_NAME} syntax.
Learn more in the docs: https://firebase.google.com/docs/extensions/alpha/create-user-docs#reference-in-postinstall

Learn more about writing a POSTINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/alpha/create-user-docs#writing-postinstall
-->

### See it in action

You can test out this extension right away!

1.  Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.

2.  If it doesn't already exist, create the collection you specified during installation: `${param:COLLECTION_PATH}`

3.  Create a document in the collection that contains any of the fields you specified as indexed fields during installation:

```js
`${param:INDEXED_FIELDS}`
```

4.  Go to the documents page of the Engine you created inside of your [Elastic Dashboard](${param:ELASTIC_URL}/as#/engines/${param:ELASTIC_INDEX_NAME}/documents). You should see the that document you just created listed on this page.

### Using the extension

Whenever a document is created, updated, imported, or deleted in the specified collection, this extension sends that update to Elastic. You can then run tull-text searches on this mirrored dataset.

After documents are indexed into Elastic, you'll have the complete Elastic [Search API](https://www.elastic.co/guide/en/app-search/current/search.html) available to you for searching.

Note that this extension only listens for document changes in the collection, but not changes in any subcollection.

### _(Optional)_ Backfill or import existing documents

This extension only sends the content of documents that have been changed -- it does not export your full dataset of existing documents into Elastic. So, to backfill your dataset with all the documents in your collection, you can run the import script provided by this extension.

Before running the script, first follow the instructions [here](https://firebase.google.com/docs/admin/setup#initialize-sdk) to "To generate a private key file for your service account". Download it and save it somewhere as `serviceAccountKey.json`.

```shell
GOOGLE_APPLICATION_CREDENTIALS= /path/to/your/serviceAccountKey.json \
COLLECTION_PATH=${param:COLLECTION_PATH} \
INDEXED_FIELDS=${param:INDEXED_FIELDS} \
ELASTIC_URL=${param:ELASTIC_URL} \
ELASTIC_API_KEY=${param:ELASTIC_API_KEY}  \
ELASTIC_API_SECRET=${param:ELASTIC_API_SECRET}  \
ELASTIC_INDEX=${param:ELASTIC_INDEX} \
npx @critical-match/elastic-firestore-extension import
```