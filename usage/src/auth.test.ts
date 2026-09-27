import assert from "node:assert/strict";
import { test } from "node:test";
import {
	credentialToApiKey,
	credentialToAccountId,
	hasCredentialAuth,
} from "./auth.ts";

test("api_key credentials resolve to their stored key", () => {
	const credential = { type: "api_key", key: "sk-test" };
	assert.equal(credentialToApiKey(credential), "sk-test");
	assert.equal(hasCredentialAuth(credential), true);
});

test("oauth credentials resolve to their access token and account id", () => {
	const credential = {
		type: "oauth",
		access: "oauth-access-token",
		accountId: "chatgpt-account-id",
	};
	assert.equal(credentialToApiKey(credential), "oauth-access-token");
	assert.equal(credentialToAccountId(credential), "chatgpt-account-id");
	assert.equal(hasCredentialAuth(credential), true);
});

test("missing or malformed credentials are treated as unauthenticated", () => {
	assert.equal(credentialToApiKey(undefined), undefined);
	assert.equal(credentialToApiKey({ type: "oauth" }), undefined);
	assert.equal(credentialToAccountId({ type: "api_key", key: "sk-test" }), undefined);
	assert.equal(hasCredentialAuth(undefined), false);
	assert.equal(hasCredentialAuth({ type: "api_key" }), false);
});
