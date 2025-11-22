
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const EcosystemDiagram: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current || !svgRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 600;
      const radius = Math.min(width, height) / 2 * 0.85;
      
      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Data Layers
      const layers = [
        {
          id: 'stakeholders',
          radius: radius * 1.0,
          items: ['HNW Families', 'Family Offices', 'Institutions', 'Athletes', 'Governments'],
          color: '#666',
          direction: 1, // Clockwise
          speed: 40
        },
        {
          id: 'services',
          radius: radius * 0.7,
          items: ['Public Markets', 'Private Markets', 'Climate/Infra', 'Sports/Health', 'Real Estate', 'Regenerative'],
          color: '#D4AF37',
          direction: -1, // Counter-Clockwise
          speed: 30
        },
        {
          id: 'partners',
          radius: radius * 0.4,
          items: ['Victory Hill', 'NetZero Nexus', 'ITS', 'Falcon', 'TG4'],
          color: '#ffffff',
          direction: 1,
          speed: 25
        }
      ];

      // Create Ring Groups
      layers.forEach((layer) => {
        const ringGroup = svg.append("g")
          .attr("class", `ring-${layer.id}`);

        // Orbital Path (Visible Ring)
        ringGroup.append("circle")
          .attr("r", layer.radius)
          .attr("fill", "none")
          .attr("stroke", layer.color)
          .attr("stroke-width", 1)
          .attr("stroke-opacity", 0.15)
          .attr("stroke-dasharray", "2 4");
        
        // Decorator for Ring (Thin solid line)
        ringGroup.append("circle")
            .attr("r", layer.radius - 5)
            .attr("fill", "none")
            .attr("stroke", layer.color)
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 0.05);

        // Animate Rotation
        ringGroup.append("animateTransform")
          .attr("attributeName", "transform")
          .attr("type", "rotate")
          .attr("from", layer.direction === 1 ? "0 0 0" : "360 0 0")
          .attr("to", layer.direction === 1 ? "360 0 0" : "0 0 0")
          .attr("dur", `${layer.speed}s`)
          .attr("repeatCount", "indefinite");

        // Add Nodes
        const angleStep = (2 * Math.PI) / layer.items.length;
        
        layer.items.forEach((item, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = Math.cos(angle) * layer.radius;
          const y = Math.sin(angle) * layer.radius;

          const nodeGroup = ringGroup.append("g")
            .attr("transform", `translate(${x},${y})`)
            .style("cursor", "pointer");
            
          // Node Glow
          nodeGroup.append("circle")
            .attr("r", 15)
            .attr("fill", layer.color)
            .attr("opacity", 0)
            .append("animate")
            .attr("attributeName", "opacity")
            .attr("values", "0;0.2;0")
            .attr("dur", "3s")
            .attr("repeatCount", "indefinite");

          // Node Core
          nodeGroup.append("circle")
            .attr("r", 4)
            .attr("fill", "#0B0B0B")
            .attr("stroke", layer.color)
            .attr("stroke-width", 1.5);
            
          // Text Label (Counter-rotated to stay upright)
          // We need to counter-rotate the text so it stays legible while the group rotates
          // HOWEVER, simplistic counter-rotation inside a rotating group is complex in SVG.
          // Simplified approach: Text rotates with the ring.
          // To make it readable, we align it radially.
          
          const textAngle = (angle * 180 / Math.PI) + 90; // Degrees
          const isLowerHalf = textAngle > 90 && textAngle < 270;
          
          // We will render text slightly differently to keep it somewhat readable
          // Actually, let's keep text simple: Fixed relative to node, it will rotate. 
          // For a "High Tech" radar look, rotating text is acceptable.
          
          nodeGroup.append("text")
            .attr("x", 0)
            .attr("y", isLowerHalf ? 15 : -15)
            .attr("text-anchor", "middle")
            .attr("transform", `rotate(${isLowerHalf ? 180 : 0})`) // Flip text if upside down relative to center? 
            // Visual simplicity: Just let it rotate. It looks like a HUD.
            .text(item)
            .attr("fill", layer.color)
            .attr("font-size", "9px")
            .attr("font-family", "sans-serif")
            .attr("font-weight", "600")
            .attr("letter-spacing", "0.5px")
            .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)");

          // Connect to Center (Spokes) - Optional visual clutter reduction
          // ringGroup.append("line")... (omitted for cleaner look)
        });
      });

      // Central Hub (BGWM)
      const center = svg.append("g");
      
      // Pulsing Core
      center.append("circle")
        .attr("r", 30)
        .attr("fill", "url(#centerGradient)")
        .attr("opacity", 0.8);
        
      // Definitions
      const defs = svg.append("defs");
      const grad = defs.append("radialGradient")
        .attr("id", "centerGradient");
      grad.append("stop").attr("offset", "0%").attr("stop-color", "#D4AF37").attr("stop-opacity", 0.3);
      grad.append("stop").attr("offset", "100%").attr("stop-color", "#0B0B0B").attr("stop-opacity", 0);

      center.append("circle")
        .attr("r", 35)
        .attr("fill", "none")
        .attr("stroke", "#D4AF37")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "1 3")
        .append("animateTransform")
        .attr("attributeName", "transform")
        .attr("type", "rotate")
        .attr("from", "0 0 0")
        .attr("to", "360 0 0")
        .attr("dur", "10s")
        .attr("repeatCount", "indefinite");

      center.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .text("BGWM")
        .attr("fill", "#D4AF37")
        .attr("font-family", "serif")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        .attr("letter-spacing", "1px");
        
      // Connection Lines (Dynamic)
      // Draw static lines that fade in/out connecting layers to create "web" effect
      // To avoid complex math with rotating groups, we use a separate static group for some background noise lines
      const connectionGroup = svg.append("g").attr("class", "connections");
      for (let i=0; i<12; i++) {
         connectionGroup.append("line")
            .attr("x1", 0).attr("y1", 0)
            .attr("x2", radius * Math.cos(i * Math.PI/6))
            .attr("y2", radius * Math.sin(i * Math.PI/6))
            .attr("stroke", "#D4AF37")
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.1);
      }

    };

    updateDimensions();
    
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] relative flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05),_transparent_70%)] pointer-events-none"></div>
       <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default EcosystemDiagram;
