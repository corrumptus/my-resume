import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { MAX_MOBILE_WIDTH, type AvailableOrientations, type File } from "../main";

export default function useNonMobileVariables(width: number, setWidth: (width: number) => void) {
    const [ orientation, setOrientation ] = useState<AvailableOrientations>("backwards");
    const [ modal, setModal ] = useState<"settings" | "newFile" | "options">();
    const lastModalRef = useRef<"settings" | "newFile" | "options">(undefined);
    const [ selectedSideBar, setSelectedSideBar ] = useState<"files" | "chat">("files");
    const [ settingsPosition, setSettingsPosition ] = useState<{ x: number, y: number }>();
    const [ option, setOption ] = useState<{ x: number, y: number, file: File, index: number }>();

    useEffect(() => {
        const ro = new ResizeObserver(() => {
            setWidth(window.innerWidth);

            const diff = window.innerWidth - width;

            setSettingsPosition(prev => {
                if (prev === undefined)
                    return undefined;

                if (orientation === "forwards")
                    return prev;

                return {
                    x: prev.x + diff,
                    y: prev.y
                };
            });
        });

        ro.observe(document.body);

        return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, orientation, settingsPosition?.x, settingsPosition?.y]);

    useEffect(() => {
        const ro = new ResizeObserver(() => {
            setWidth(window.innerWidth);

            const diff = window.innerWidth - width;

            setOption(prev => {
                if (prev === undefined) {
                    if (width <= MAX_MOBILE_WIDTH && modal === "options")
                        setModal(undefined);

                    return undefined;
                }

                if (orientation === "forwards")
                    return prev;

                return {
                    ...prev,
                    x: prev.x + diff
                };
            });
        });

        ro.observe(document.body);

        return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, orientation, settingsPosition?.x, settingsPosition?.y]);

    useEffect(() => {
        if (modal === undefined)
            return;

        function onClick(e: MouseEvent) {
            const willCloseModal = {
                "settings": () => (e.target as Element).closest(".settings") === null,
                "newFile": () => (e.target as Element).closest("#newFileInput") === null,
                "options": () => (e.target as Element).closest(`#options button`) !== null
                    ||
                    (e.target as Element).closest(`#options`) === null
            }[modal!]();

            if (willCloseModal)
                setModal(undefined);
        }

        function onAuxClick(e: MouseEvent) {
            const willCloseModal = {
                "settings": () => (e.target as Element).closest(".settings") === null,
                "newFile": () => (e.target as Element).closest("#newFileInput") === null,
                "options": () => {
                    if (lastModalRef.current === "newFile")
                        return (e.target as Element).closest("aside") === null;

                    return (e.target as Element).closest("aside ul li:not(:first-child)") === null;
                }
            }[modal!]();

            if (willCloseModal)
                setModal(undefined);
        }

        window.addEventListener("click", onClick);
        window.addEventListener("auxclick", onAuxClick);

        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("auxclick", onAuxClick);
        };
    }, [modal]);

    function updateModal(...args: Parameters<typeof setModal>) {
        lastModalRef.current = modal;
        setModal(args[0]);
    }

    return [ orientation, setOrientation, modal, updateModal as Dispatch<SetStateAction<"settings" | "newFile" | "options" | undefined>>, selectedSideBar, setSelectedSideBar, settingsPosition, setSettingsPosition, option, setOption ] as const;
}