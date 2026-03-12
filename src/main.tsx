import { createRoot } from "react-dom/client";
import App from "./App";
import "./monaco-setup";
import "./utils/setup";
import "./main.css";

export type AvailableLangs = "pt-br" | "en";

export type AvailableOrientations = "backwards" | "forwards";

export type File = {
	name: string,
	content: string,
	isOpen: boolean
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

export type AvailableThemes = "default" | "light" | "dark" | "monokai" | "dracula";

export const MAX_MOBILE_WIDTH = 800;



createRoot(document.body).render(<App />);