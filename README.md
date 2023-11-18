# ElasticSearch (v7.x) extension for Firestore

**IMPORTANT:** This extension is only compatible with ElasticSearch v7.x versions

This extension syncs data from Google's [Cloud Firestore](https://firebase.google.com/products/firestore) to [Elastic Search](https://www.elastic.co).

Out-of-the-box, Cloud Firestore provides no mechanism for full-text search on data. Syncing your Cloud Firestore data to Elastic Search not only gives you a mechanism for full-text search on your data, it also lets you enjoy Elastic's powerful relevance tuning features and search analytics data.

## Install

### From the web

Visit the following link: https://console.firebase.google.com/project/_/extensions/install?ref=critical-match/elastic-firestore-extension@7.13.0

### From source

After pulling this project source locally, follow these steps:

```shell
npm install -g firebase-tools
npm install
firebase login
firebase ext:install . --project=<ID of your project>
```

## Contributing

Plan to pull this code and run it locally? See [CONTRIBUTING.md](CONTRIBUTING.md).
