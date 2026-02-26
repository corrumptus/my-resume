import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css";

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
	focusedTabFileBgColor: string,
	standbyTabFileBgColor: string,
	focusedTabFileNameColor: string,
	standbyTabFileNameColor: string,
	closeTabButtonBgColor: string, 
	selectedThing: string,
	componentSeparatorBorderColor: string,
	caretColor: string,
	iconColor: "0" | "1",
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