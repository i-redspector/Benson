import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Hub {
  id: string;
  lat: number;
  lng: number;
  role: string;
  status: string;
}

interface GlobalNetworkVizProps {
  onHoverHub: (hub: Hub | null) => void;
}

const HUBS: Hub[] = [
  { id: "Toronto", lat: 43.6532, lng: -79.3832, role: "HQ / North America", status: "Operational" },
  { id: "New York", lat: 40.7128, lng: -74.0060, role: "Capital Markets", status: "Active" },
  { id: "London", lat: 51.5074, lng: -0.1278, role: "EMEA Hub", status: "Active" },
  { id: "Doha", lat: 25.2854, lng: 51.5310, role: "Middle East / TG4", status: "High Activity" },
  { id: "Accra", lat: 5.6037, lng: -0.1870, role: "West Africa", status: "Growth" },
  { id: "Windhoek", lat: -22.5609, lng: 17.0658, role: "Energy Infra", status: "Development" },
  { id: "Johannesburg", lat: -26.2041, lng: 28.0473, role: "Southern Africa", status: "Active" },
];

const GlobalNetworkViz: React.FC<GlobalNetworkVizProps> = ({ onHoverHub }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{x: number, y: number, data: Hub, containerWidth: number} | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const renderMap = () => {
        if (!containerRef.current || !svgRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight || 600;
        
        // Clear previous render
        d3.select(svgRef.current).selectAll("*").remove();
    
        const svg = d3.select(svgRef.current)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .style("background", "transparent");
    
        // 1. Setup Projection (Mercator centered on Atlantic/Africa/Europe)
        const projection = d3.geoMercator()
          .center([10, 20]) // Center roughly on Africa/Europe
          .scale(width / 2.8)
          .translate([width / 2, height / 2]);
    
        // 2. Draw "Fintech Grid" Background
        const gridGroup = svg.append("g").attr("class", "grid-layer");
        
        // Vertical lines (Longitudes)
        for (let x = 0; x < width; x += 40) {
          gridGroup.append("line")
            .attr("x1", x).attr("y1", 0)
            .attr("x2", x).attr("y2", height)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 0.03);
        }
        // Horizontal lines (Latitudes)
        for (let y = 0; y < height; y += 40) {
          gridGroup.append("line")
            .attr("x1", 0).attr("y1", y)
            .attr("x2", width).attr("y2", y)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 0.03);
        }
    
        // 3. Process Data Points
        const projectedHubs = HUBS.map(hub => {
          const coords = projection([hub.lng, hub.lat]);
          return { ...hub, x: coords ? coords[0] : 0, y: coords ? coords[1] : 0 };
        });
    
        // 4. Draw Curved Connections (Great Circle Arcs simulation)
        const linksGroup = svg.append("g").attr("class", "links-layer");
        
        const connections = [
            ["New York", "London"],
            ["New York", "Toronto"],
            ["London", "Doha"],
            ["London", "Accra"],
            ["Doha", "Johannesburg"],
            ["Accra", "Johannesburg"],
            ["Windhoek", "Johannesburg"],
            ["Accra", "Windhoek"] 
        ];
    
        connections.forEach(([sourceId, targetId]) => {
            const source = projectedHubs.find(h => h.id === sourceId);
            const target = projectedHubs.find(h => h.id === targetId);
            
            if (source && target) {
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                
                const pathData = d3.path();
                pathData.moveTo(source.x, source.y);
                const cx = (source.x + target.x) / 2 - dy * 0.15; 
                const cy = (source.y + target.y) / 2 + dx * 0.15;
                pathData.quadraticCurveTo(cx, cy, target.x, target.y);
    
                const path = linksGroup.append("path")
                    .attr("d", pathData.toString())
                    .attr("fill", "none")
                    .attr("stroke", "#D4AF37")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.15);
    
                // Animate Particle along path
                const animateParticle = () => {
                    const particle = linksGroup.append("circle")
                        .attr("r", 1.5)
                        .attr("fill", "#ffffff")
                        .attr("opacity", 0); // Start invisible
                    
                    // Phase 1: Fade In
                    particle.transition()
                        .duration(300)
                        .attr("opacity", 0.8)
                        .transition()
                        // Phase 2: Move
                        .duration(2500 + Math.random() * 1500)
                        .ease(d3.easeLinear) // Keep linear for consistent flow look
                        .attrTween("transform", function() {
                            const node = path.node();
                            if (!node) return () => "";
                            const len = node.getTotalLength();
                            return function(t) {
                                const p = node.getPointAtLength(t * len);
                                return `translate(${p.x},${p.y})`;
                            };
                        })
                        // Phase 3: Fade Out
                        .transition()
                        .duration(300)
                        .attr("opacity", 0)
                        .on("end", () => {
                            particle.remove();
                            animateParticle(); // Loop
                        });
                };
                // Stagger start times
                setTimeout(animateParticle, Math.random() * 2000);
            }
        });
    
        // 5. Draw Hub Nodes
        const hubsGroup = svg.append("g").attr("class", "hubs-layer");
    
        const nodes = hubsGroup.selectAll(".hub-node")
            .data(projectedHubs)
            .enter()
            .append("g")
            .attr("class", "hub-node")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("cursor", "pointer")
            .on("mouseenter", (event, d) => {
                d3.select(event.currentTarget).selectAll("circle.core").attr("fill", "#D4AF37");
                d3.select(event.currentTarget).selectAll("text").attr("fill", "#D4AF37").attr("font-weight", "bold");
                
                // Update React States
                onHoverHub(d);
                setTooltip({
                    x: d.x,
                    y: d.y,
                    data: d,
                    containerWidth: width
                });
            })
            .on("mouseleave", (event, d) => {
                d3.select(event.currentTarget).selectAll("circle.core").attr("fill", "#0B0B0B");
                d3.select(event.currentTarget).selectAll("text").attr("fill", "#666").attr("font-weight", "normal");
                
                onHoverHub(null);
                setTooltip(null);
            });
    
        // Outer Ripple
        nodes.append("circle")
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "#D4AF37")
            .attr("stroke-opacity", 0.3)
            .attr("stroke-width", 1)
            .append("animate")
            .attr("attributeName", "r")
            .attr("from", "8")
            .attr("to", "24")
            .attr("dur", "3s")
            .attr("repeatCount", "indefinite");
    
        nodes.append("circle")
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "#D4AF37")
            .attr("stroke-opacity", 0.3)
            .attr("stroke-width", 1)
            .append("animate")
            .attr("attributeName", "opacity")
            .attr("from", "0.5")
            .attr("to", "0")
            .attr("dur", "3s")
            .attr("repeatCount", "indefinite");
    
        // Core Dot
        nodes.append("circle")
            .attr("class", "core")
            .attr("r", 4)
            .attr("fill", "#0B0B0B")
            .attr("stroke", "#D4AF37")
            .attr("stroke-width", 1.5);
    
        // Labels
        nodes.append("text")
            .attr("x", 12)
            .attr("y", 4)
            .text(d => d.id.toUpperCase())
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "#666")
            .attr("letter-spacing", "1px")
            .attr("opacity", 0.8)
            .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)");
    
        // 6. Radar Sweep Effect (Subtle)
        const radarGroup = svg.append("g")
            .attr("transform", `translate(${width/2}, ${height/2})`)
            .attr("opacity", 0.1); // Reduced overall group opacity
        
        const radarGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "radar-grad")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "100%").attr("y2", "0%");
        radarGradient.append("stop").attr("offset", "0%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0");
        // Reduced stop opacity for much subtler tail
        radarGradient.append("stop").attr("offset", "100%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0.15"); 
    
        radarGroup.append("path")
            .attr("d", d3.arc()({
                innerRadius: 0,
                outerRadius: Math.max(width, height),
                startAngle: 0,
                endAngle: Math.PI/4
            }) || "")
            .attr("fill", "url(#radar-grad)")
            .append("animateTransform")
            .attr("attributeName", "transform")
            .attr("type", "rotate")
            .attr("from", "0 0 0")
            .attr("to", "360 0 0")
            .attr("dur", "12s") // Slower sweep
            .attr("repeatCount", "indefinite");
    }

    renderMap();
    window.addEventListener('resize', renderMap);
    return () => window.removeEventListener('resize', renderMap);

  }, [onHoverHub]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden bg-[#030303] relative group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.02),_transparent_70%)] pointer-events-none"></div>
        <svg ref={svgRef} className="w-full h-full" />
        
        {/* HUD Popover */}
        {tooltip && (
             <div 
                style={{ 
                    left: tooltip.x > tooltip.containerWidth / 2 ? tooltip.x - 210 : tooltip.x + 20, 
                    top: tooltip.y - 20 
                }} 
                className="absolute z-30 bg-black/80 backdrop-blur-md border border-bg-gold/30 p-4 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] animate-fade-in pointer-events-none w-48"
             >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bg-gold"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-bg-gold"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-bg-gold"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bg-gold"></div>
                
                <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
                    <h4 className="text-white font-serif text-sm tracking-wide">{tooltip.data.id.toUpperCase()}</h4>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                
                <div className="space-y-2">
                    <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Role</span>
                        <span className="text-xs text-bg-gold font-medium">{tooltip.data.role}</span>
                    </div>
                    <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Status</span>
                        <span className="text-xs text-gray-300">{tooltip.data.status}</span>
                    </div>
                    <div className="pt-2 mt-1 border-t border-white/5 flex justify-between items-center">
                         <span className="text-[9px] text-gray-500 uppercase">Latency</span>
                         <span className="text-[9px] text-green-400 font-mono">12ms</span>
                    </div>
                </div>
             </div>
        )}

        {/* Legend / Decor */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none opacity-40 transition-opacity group-hover:opacity-100">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-bg-gold"></div>
                 <span className="text-[9px] text-bg-gold font-mono uppercase tracking-widest">Operational Hub</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-2 h-[1px] bg-bg-gold"></div>
                 <span className="text-[9px] text-bg-gold font-mono uppercase tracking-widest">Capital Flow</span>
             </div>
        </div>
    </div>
  );
};

export default GlobalNetworkViz;