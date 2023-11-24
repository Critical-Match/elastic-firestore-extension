## Running this script

This script uses environment variables that correspond to the configuration that you've set in your installed extension.

See the POSTINSTALL.md for instructions on running this script to backfill and reindex data from a Firestore colletion to an App Search engine.

## Developing

### Building the script

All setup must be run from the directory `/app-search-firestore-extension/functions`

Typescript must be compiled before we can run this script

```
npm run build
```

If you are developing the script you can add a `-- -w` flag to watch it

```
npm run build -- -w
```

## Running the script

All scripts must be run from the directory `/app-search-firestore-extension/functions`, and only after building the script

To run against a local Firebase emulator:

```
FIRESTORE_EMULATOR_HOST=localhost:8081 \
GCLOUD_PROJECT=nationalparks \
INDEXED_FIELDS=title,description,visitors,acres,location,date_established \
ELASTIC_URL=http://localhost:3002 \
ELASTIC_API_KEY=private-asfdsaafdsagfsgfd \
ELASTIC_API_SECRET=secret-asfdsaafdsagfsgfd \
ELASTIC_INDEX=nationalparks \
node ./lib/bin/import.js
```

To run against a cloud Firebase instance:

```
GOOGLE_APPLICATION_CREDENTIALS=~/Downloads/app-search-extension-testing-firebase-adminsdk-asdfsa-fdasfdsa.json \
GCLOUD_PROJECT=nationalparks \
COLLECTION_PATH=nationalparks \
INDEXED_FIELDS=title,description,visitors,acres,location,date_established \
ELASTIC_URL=http://localhost:3002 \
ELASTIC_API_KEY=private-asfdsaafdsagfsgfd \
ELASTIC_API_SECRET=secret-asfdsaafdsagfsgfd \
ELASTIC_INDEX=nationalparks \
node ./lib/bin/import.js
```