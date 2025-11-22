
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { getLatestSocialUpdate, SocialUpdate } from '../services/socialService';

interface Props {
  platform: 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube';
  Icon: LucideIcon;
  colorClass?: string;
  placement?: 'top' | 'bottom';
}

const SocialIconWithFeed: React.FC<Props> = ({ platform, Icon, colorClass = "text-gray-400", placement = 'bottom' }) => {
  const [update, setUpdate] = useState<SocialUpdate | null>(null);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = async () => {
    setHovered(true);
    setLoading(true);
    try {
      const data = await getLatestSocialUpdate(platform);
      setUpdate(data);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div 
      className="relative group z-50 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a 
        href={`https://${platform}.com/bensonglobal`} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${colorClass} hover:text-bg-gold hover:scale-110 transition-all duration-300 block p-3 rounded-full hover:bg-white/5 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]`}
      >
        <Icon className="w-5 h-5" />
      </a>

      {/* Feed Popover */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-[340px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 transition-all duration-500 pointer-events-none z-50 ${
            hovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } ${placement === 'top' ? 'bottom-full mb-4' : 'top-full mt-4'}`}
      >
          {/* Subtle Gold Gradient Border Overlay */}
          <div className="absolute inset-0 rounded-2xl border border-bg-gold/10 pointer-events-none"></div>

          {/* Tooltip Arrow */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-black/80 border-r border-b border-white/10 backdrop-blur-2xl transform rotate-45 ${
                placement === 'top' 
                ? 'bottom-[-9px] border-t-0 border-l-0 border-r border-b' 
                : 'top-[-9px] border-b-0 border-r-0 border-l border-t'
            }`}
          ></div>
          
          {/* Header: Platform & Live Indicator */}
          <div className="flex justify-between items-center mb-4 relative z-10 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-white/5 rounded-full">
                    <Icon className="w-3 h-3 text-bg-gold" />
                 </div>
                 <span className="text-[10px] font-bold text-bg-gold uppercase tracking-[0.2em]">{platform}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-green-900/20 px-2 py-1 rounded-full border border-green-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span className="text-[9px] font-medium text-green-400 uppercase tracking-wider leading-none">Live Feed</span>
              </div>
          </div>

          {/* Content Area */}
          {loading || !update ? (
             <div className="space-y-3 animate-pulse relative z-10">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-white/10 shrink-0"></div>
                    <div className="space-y-2 w-full">
                        <div className="h-2 bg-white/10 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-full"></div>
                        <div className="h-2 bg-white/10 rounded w-5/6"></div>
                    </div>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5 mt-2">
                    <div className="h-2 bg-white/5 rounded w-16"></div>
                    <div className="h-2 bg-white/5 rounded w-12"></div>
                </div>
             </div>
          ) : (
            <div className="relative z-10 animate-fade-in">
               <div className="flex items-start gap-4 mb-4">
                   {update.image ? (
                       <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                           <img src={update.image} alt="Post" className="w-full h-full object-cover" />
                       </div>
                   ) : (
                       <div className="w-10 h-10 shrink-0 rounded-full bg-bg-gold/10 flex items-center justify-center border border-bg-gold/20">
                           <Icon className="w-5 h-5 text-bg-gold" />
                       </div>
                   )}
                   <div>
                       <div className="flex items-center gap-2 mb-1">
                           <span className="text-xs font-semibold text-white">{update.handle}</span>
                           <span className="text-[10px] text-gray-500">• {update.date}</span>
                       </div>
                       <p className="text-xs text-gray-300 leading-relaxed font-light line-clamp-3">
                         {update.content}
                       </p>
                   </div>
               </div>
               
               <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium mt-3 pt-3 border-t border-white/5">
                  <span className="text-gray-400 flex items-center gap-1">
                      <span className="w-1 h-1 bg-bg-gold rounded-full"></span>
                      Latest Update
                  </span>
                  <span className="text-bg-gold bg-bg-gold/5 px-2 py-0.5 rounded border border-bg-gold/10">{update.stats}</span>
               </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SocialIconWithFeed;
