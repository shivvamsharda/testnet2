
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users, PlayCircle } from 'lucide-react';

interface StreamCardProps {
  id: string;
  title: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnail: string;
  viewerCount: number;
  isLive: boolean;
  category?: string;
}

const StreamCard = ({
  id,
  title,
  creator,
  thumbnail,
  viewerCount,
  isLive,
  category
}: StreamCardProps) => {
  return (
    <Link to={`/stream/${id}`} className="stream-card block animate-fade-in">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span>LIVE</span>
          </div>
        )}
        
        {/* Viewer count */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          <Users size={12} />
          <span>{viewerCount.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Stream info */}
      <div className="p-3">
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/222/666?text=U';
              }}
            />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-white font-medium text-sm truncate">{title}</h3>
            <div className="text-white/70 text-xs mt-1">{creator.name}</div>
            {category && (
              <div className="mt-1">
                <span className="bg-solana/20 text-solana text-xs px-2 py-0.5 rounded">
                  {category}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StreamCard;
