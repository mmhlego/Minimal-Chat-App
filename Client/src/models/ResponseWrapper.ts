export type ResponseWrapper<K = string> =
	| {
			status: "success";
			data: K;
	  }
	| ErrorWrapper;

export type ErrorWrapper = {
	status: "error";
	data: string;
};
