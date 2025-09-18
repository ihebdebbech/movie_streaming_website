"use client"

import { useState } from "react"
import EmbedPlayer from "@/components/watch/embed-player"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import MovieService from "@/services/MovieService"
import { KeyWord, MediaType, Show, ShowWithGenreAndVideo } from "@/types"
import { type } from "os"
import { getIdFromSlug } from "@/lib/utils"
import React from "react"
import { useModalStore } from '@/stores/modal';
import { AxiosResponse } from "axios"
import { MovieDetails } from "@/components/ui/movie-details-section"
import FlowingLightStreaks from "@/components/flowing-light-streaks"
import { useLoadingStore } from "@/stores/loading"
import { EpisodeList } from "@/components/episodes-list"


interface Server {
  name: string
  url: string
  quality: string
  isWorking: boolean
}

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split("-").pop()
   console.log(params.slug);
   const [show ,setShow] = useState<Show | undefined>(undefined);
    const [url ,setUrl] = useState<string>(`https://vidsrc.cc/v2/embed/movie/${id}`);
     
  const handleGetData = async () => {
    console.log("test");
     const movieId: number = getIdFromSlug(params.slug);
    // const data: Show =   await MovieService.findCurrentMovie(movieId, params.slug);
     const response: AxiosResponse<Show> = await MovieService.findMovie(movieId);
     setShow(response.data)
      useLoadingStore.getState().hide();
console.log("test");

    console.log(response.data)

  //  console.log(show);
  };
  const [selectedServer, setSelectedServer] = useState(0)
  const episodeData = [
    {
      id: 1,
      title: "Season 1",
      episodes: [
        { id: 1, title: "Superman", duration: "24m" },
      ],
    },
  ]
  // Available streaming servers
  const servers: Server[] = [
    {
      name: "VidSrc",
      url: `https://vidsrc.cc/v2/embed/movie/${id}`,
      quality: "HD",
      isWorking: true,
    },
    {
      name: "VidSrc Pro",
      url: `https://vidsrc.pro/embed/movie/${id}`,
      quality: "HD",
      isWorking: true,
    },
    {
      name: "SuperEmbed",
      url: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
      quality: "HD",
      isWorking: true,
    },
    {
      name: "EmbedSu",
      url: `https://embed.su/embed/movie/${id}`,
      quality: "HD",
      isWorking: false,
    },
  ]
  const handleEpisodeSelect = (seasonId: number, episodeId: number) => {
    console.log(`[v0] Selected season ${seasonId}, episode ${episodeId}`)
    // In a real app, you'd update the video source here
  }
  React.useEffect(() => {
    
    void handleGetData();
  }, []);
  return (
    <div className="  text-white">
      <div className=" min-h-screen     ">
        <div className=" mx-14  mt-10  ">
          {/* Movie Player */}
          <div className="flex flex-col lg:flex-row gap-6">
           
          <div className="flex-1">
          <div className="  w-full max-w-5xl  aspect-video md:h-[72vh] ">
               <EmbedPlayer url={url} />
          </div>

               <div className=" mx-1  py-8">
          <MovieDetails show={show} setUrl={setUrl} id= {id!}/>
          
        </div>
        </div>
         <div className="lg:w-80">
            <EpisodeList seasons={episodeData} currentEpisode={17} onEpisodeSelect={handleEpisodeSelect} />
          </div>
        </div>

              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {servers.map((server, index) => (
                  <Button
                    key={index}
                    variant={selectedServer === index ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center gap-2 ${
                      selectedServer === index
                        ? "bg-blue-600 hover:bg-blue-700 border-blue-500"
                        : "bg-slate-800 hover:bg-slate-700 border-slate-600 text-white"
                    } ${!server.isWorking ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => server.isWorking && setSelectedServer(index)}
                    disabled={!server.isWorking}
                  >
                    <div className="font-semibold">{server.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${server.isWorking ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                      >
                        {server.isWorking ? "Online" : "Offline"}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-500 text-slate-300">
                        {server.quality}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-300">
                  Currently watching from:{" "}
                  <span className="text-white font-semibold">{servers[selectedServer].name}</span>
                </div>
                {!servers[selectedServer].isWorking && (
                  <div className="text-red-400 text-sm mt-1">⚠️ This server may not be working properly</div>
                )}
              </div> */}
           
        </div>
      </div>
    </div>
  )
}
