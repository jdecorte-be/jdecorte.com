import { MongoClient } from "mongodb";

// Cache the client on globalThis so `next dev` hot reloads don't
// open a new connection pool on every recompile.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export function getMongoClient(): MongoClient {
	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error("MONGODB_URI is not set");
	if (!globalForMongo._mongoClient) {
		globalForMongo._mongoClient = new MongoClient(uri);
	}
	return globalForMongo._mongoClient;
}

export function getCommentsCollection() {
	return getMongoClient().db("jdecorte").collection("comments");
}
