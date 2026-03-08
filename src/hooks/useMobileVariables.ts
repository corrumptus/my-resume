import { useState } from "react";

export default function useMobileVariables() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedMenu, setSelectedMenu ] = useState<"files" | "chat" | "settings">("files");

    return [ isOpen, setIsOpen, selectedMenu, setSelectedMenu ] as const;
}