import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Share, Download, Cloud, Server, CloudCog } from "lucide-react"
import { Show } from "@/types"
import { formatDate } from "@/lib/utils"

interface Movie {
  title: string
  year: number
  duration: string
  rating: number
  genre: string[]
  director: string
  cast: string[]
  description: string
}

interface MovieDetailsProps {
   show?: Show;
    setUrl: React.Dispatch<React.SetStateAction<string>>
    id : string;
}

export function MovieDetails( {show,setUrl,id} : MovieDetailsProps ) {
const formatRating = (rating: number) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Movie Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold font-montserrat mb-4 text-balance">{show?.title}</h1>

          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <span>{formatDate(show?.release_date || show?.first_air_date!)}</span>
            <span>•</span>
            <span>{show?.runtime}</span>
            <span>•</span>
             {show?.vote_average && (
                   <div className="flex items-center gap-1">
                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                     <span>{formatRating(show.vote_average)}</span>
                   </div>
                 )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
             <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-400">Genres:</span>
            {show?.genres.map((genre) => genre.name).join(', ')}
          </div>
          </div>

          <p className="text-lg leading-relaxed mb-8 text-pretty">{show?.overview}</p>

         
        </div>

        {/* Action Buttons */}
        <div className="lg:w-64">
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add to Watchlist
            </Button>

            <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={() => {console.log("server1");setUrl(`https://vidsrc.cc/v2/embed/movie/${id}`)}}>
              <Server className="w-5 h-5 mr-2" />
              Server 1
            </Button>

            <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={() => setUrl(`https://vidsrc.su/movie/${id}`)}>
              <Server className="w-5 h-5 mr-2" />
              Server 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
