export interface Environment
	extends Record<string, undefined | string | DurableObjectNamespace | Fetcher | KVNamespace | R2Bucket> {
	adminSecret?: string
	hashSecret?: string
	privateSecret?: string
	userNamespace?: DurableObjectNamespace
	ASSETS?: Fetcher
	ui?: string
	store?: KVNamespace
	bucket?: R2Bucket
}
