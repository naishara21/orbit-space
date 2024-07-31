import { Eye, EyeOff } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { useAppStore } from "@/(store)/App"
import { useEffect } from "react"

export function ToggleHide({ disabled }: { disabled: boolean }) {
    const hideSettings = useAppStore((state) => state.hideAllSettings)
    const setHideSettings = useAppStore((state) => state.setHideAllSettings)

    const user = useAppStore((state) => state.user)

    const handleHideSettings = () => {
        setHideSettings(!hideSettings)
    }

    useEffect(() => {
        if (!user.name) setHideSettings(false);
    })

    return (
        <Toggle disabled={disabled} onClick={handleHideSettings} variant="outline" aria-label="Toggle italic" className="bg-black/20 backdrop-blur-sm rounded-lg group w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-black/20 data-[state=on]:bg-primary/20">
            {!hideSettings ? (
                <Eye size={20} className="text-white group-hover:scale-110 duration-300 min-w-5 min-h-5 " />
            ) : (
                <EyeOff size={20} className="text-white group-hover:scale-110 duration-300 min-w-5 min-h-5 " />
            )}
        </Toggle>
    )
}
