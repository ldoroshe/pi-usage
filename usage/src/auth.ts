export type StoredCredential = unknown;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function stringField(value: Record<string, unknown>, field: string): string | undefined {
	const out = value[field];
	return typeof out === "string" && out.length > 0 ? out : undefined;
}

/** Return the bearer/API token from a Pi-stored credential. */
export function credentialToApiKey(
	credential: StoredCredential | undefined,
): string | undefined {
	if (!isRecord(credential)) return undefined;
	if (credential.type === "api_key") return stringField(credential, "key");
	if (credential.type === "oauth") return stringField(credential, "access");
	return undefined;
}

/** Return ChatGPT account id when present on an OAuth credential. */
export function credentialToAccountId(
	credential: StoredCredential | undefined,
): string | undefined {
	if (!isRecord(credential) || credential.type !== "oauth") return undefined;
	return stringField(credential, "accountId");
}

/** True when the stored credential contains usable auth material. */
export function hasCredentialAuth(credential: StoredCredential | undefined): boolean {
	return credentialToApiKey(credential) !== undefined;
}
