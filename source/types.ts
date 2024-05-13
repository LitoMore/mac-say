export type Voice = {
	name: string;
	languageCode: string;
	example: string;
};

export type Device = {
	id: string;
	name: string;
};

export type DataFormat = {
	format: string;
	description: string;
};

export type FileFormat = {
	format: string;
	description: string;
	extensions: string[];
	accFormats: string[];
};
