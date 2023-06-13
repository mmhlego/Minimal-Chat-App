export interface ResponseWrapper<K, T = "Success" | "Error"> {
	Status: T;
	Data: K;
}
