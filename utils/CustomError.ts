class CustomError extends Error {
	httpStatus: number;
	responseStatus: string;
	isOperational: boolean;
	constructor(public message: string, httpStatus: number) {
		super(message);
		this.httpStatus = httpStatus;
		this.responseStatus = String(this.httpStatus).startsWith('4')
			? 'fail'
			: 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default CustomError;
