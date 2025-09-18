"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface Episode {
  id: number
  title: string
  duration: string
}

interface Season {
  id: number
  title: string
  episodes: Episode[]
}

interface EpisodeListProps {
  seasons: Season[]
  currentEpisode?: number
  onEpisodeSelect: (seasonId: number, episodeId: number) => void
}

export function EpisodeList({ seasons, currentEpisode, onEpisodeSelect }: EpisodeListProps) {
  const [selectedSeason, setSelectedSeason] = useState(1)

  const currentSeason = seasons.find((s) => s.id === selectedSeason)

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 md:h-[72vh]">
      {/* Season Selector */}
      {seasons.length > 1 && (
        <div className="mb-4">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="w-full bg-slate-800 text-white rounded-md px-3 py-2 text-sm border border-slate-700 focus:border-purple-500 focus:outline-none"
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Episode List Header */}
      <div className="mb-4">
        <h2 className="text-white font-bold text-sm">List of episodes:</h2>
      </div>

      {/* Episodes */}
      <div className="space-y-1 h-4/5  overflow-y-auto">
        {currentSeason?.episodes.map((episode) => (
          <button
            key={episode.id}
            onClick={() => onEpisodeSelect(selectedSeason, episode.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors hover:bg-slate-800/50 ${
              currentEpisode === episode.id ? "bg-slate-800" : ""
            }`}
          >
            {/* Episode Number */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-medium">
              {episode.id}
            </div>

            {/* Episode Title */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{episode.title}</p>
              <p className="text-slate-400 text-xs">{episode.duration}</p>
            </div>

            {/* Play Button for Current Episode */}
            {currentEpisode === episode.id && (
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
