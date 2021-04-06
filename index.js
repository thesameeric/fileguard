const mercury = {
	error: false,
	errorMessage: [],
	data: null,
	mimetypes: ['image/jpeg'],
	file(uImage) {
		if (uImage) {
			this.data = uImage;
			this.error = false;
			this.errorMessage = [];
		} else {
			this.errorHandler(100);
		}
		return this;
	},
	type(uTypes) {
		if (this.data) {
			if (Object.prototype.toString.call(uTypes) === '[object Array]') {
				const file = this.data;
				// eslint-disable-next-line no-bitwise
				const fileext = file.originalname.slice((file.originalname.lastIndexOf('.') - 1 >>> 0) + 2);
				if (fileext && !uTypes.includes(fileext)) {
					this.errorHandler(300);
				}
			} else {
				this.errorHandler(400);
			}
		} else {
			this.errorHandler(100);
		}
		return this;
	},
	size(usize) {
		if (this.data) {
			if (parseInt(usize, 10)) {
				if ((this.data.size / (1024 * 1024)) > parseInt(usize, 10)) {
					this.errorHandler(200);
				}
			}
		}
		return this;
	},
	errorHandler(code) {
		const errorMessages = {
			100: 'Invalid request body',
			200: 'File too large',
			300: 'Invalid file type',
			400: 'Invalid file format',
		};
		if (typeof code === 'number') {
			if (!this.errorMessage.includes(errorMessages[code])) {
				this.error = true;
				this.errorMessage.push(errorMessages[code]);
			}
		}
	},
};

export default mercury;
