export default interface ChatAttachment {
	id: number;
	name: string;
	uploadDate: Date;
	url: string;
	type: AttachmentTypes;
}

export type AttachmentTypes = "File" | "Image" | "Video";
