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

3.  Create a document in the collection

4.  Go to the documents page of the Engine you created inside of your [Elastic Dashboard](${param:ELASTIC_URL}/as#/engines/${param:ELASTIC_INDEX_NAME}/documents). You should see the that document you just created listed on this page.

### Using the extension

Whenever a document is created, updated, imported, or deleted in the specified collection, this extension sends that update to Elastic. You can then run tull-text searches on this mirrored dataset.

After documents are indexed into Elastic, you'll have the complete Elastic [Search API](https://www.elastic.co/guide/en/app-search/current/search.html) available to you for searching.

Note that this extension only listens for document changes in the collection, but not changes in any subcollection.

### Backfill or import existing documents

This extension also allows to backfill data from a Firestore collection into Elastic. This backfill action gets triggered when a Firestore document with the path `elastic_sync/backfill` has the contents of `trigger: true`.