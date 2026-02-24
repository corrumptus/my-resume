import { createRoot } from "react-dom/client";
import App from "./App";

export type File = {
	name: string,
	content: string,
	canDelete: boolean,
	isOpen: boolean,
	canClose: boolean,
	isSelected: boolean
};

export type Theme = {
	primaryBgColor: string,
	secondaryBgColor: string,
	folderFileNameColor: string,
	folderSelectedFileBgColor: string,
	selectedFileNameColor: string,
	standbyFileNameColor: string,
	selectedFileColor: string,
	tagName: string,
	tagBracket: string,
	attrName: string,
	attrAssign: string,
	attrValue: string,
	text: string,
	comment: string
};

export const MAX_MOBILE_WIDTH = 800;

createRoot(document.body).render(<App />);