// components/ui/global-loader.tsx
"use client"

import { useLoadingStore } from "@/stores/loading"
import { Loader2 } from "lucide-react"
import FlowingLightStreaks from "./flowing-light-streaks"

export default function GlobalLoader() {
  const { isLoading } = useLoadingStore()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-lightdarkblue via-lightdarkblue to-lightdarkslate z-[9999]">
         <div className="fixed inset-0 overflow-hidden ">
                      <FlowingLightStreaks/>
                {/* Flowing Light Streaks */}
             
        
                {/* Enhanced Stars */}
              </div>
             
      {/* <Loader2 className="h-12 w-12 animate-spin text-white" /> */}
    </div>
  )
}
