export default interface ChatAttachment {
	id: string;
	name: string;
	uploadDate: Date;
	url: string;
	type: AttachmentTypes;
}

export type AttachmentTypes = "File" | "Image" | "Video";
