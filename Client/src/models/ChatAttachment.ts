export default interface ChatAttachment {
	Id: number;
	Name: string;
	UploadDate: Date;
	Url: string;
	Type: AttachmentTypes;
}

export type AttachmentTypes = "File" | "Image" | "Video";
