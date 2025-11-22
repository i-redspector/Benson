
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
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Improved scaling logic for mobile readability
      const isMobile = width < 600;
      const baseSize = 600;
      const scaleFactor = Math.max(width, height) / baseSize; 
      // Constrain radius to fit container but maintain spacing
      const radius = Math.min(width, height) / 2 * (isMobile ? 0.9 : 0.85);
      
      // Clear previous
      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`);

      const mainGroup = svg.append("g");

      // CONFIGURATION
      const layers = [
        {
          id: 'stakeholders',
          r: radius * 1.0,
          items: ['HNW Families', 'Family Offices', 'Institutions', 'Athletes', 'Governments'],
          color: '#666',
          speed: 0.0005 // radians per tick
        },
        {
          id: 'services',
          r: radius * 0.7,
          items: ['Public Markets', 'Private Markets', 'Climate/Infra', 'Sports/Health', 'Real Estate', 'Regenerative'],
          color: '#D4AF37',
          speed: -0.0008
        },
        {
          id: 'partners',
          r: radius * 0.4,
          items: ['Victory Hill', 'NetZero Nexus', 'ITS', 'Falcon', 'TG4'],
          color: '#ffffff',
          speed: 0.001
        }
      ];

      // 1. Draw Static Rings (The tracks)
      const tracksGroup = mainGroup.append("g").attr("class", "tracks");
      layers.forEach(layer => {
         tracksGroup.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", layer.r)
            .attr("fill", "none")
            .attr("stroke", layer.color)
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.15)
            .attr("stroke-dasharray", "2 4");
            
         // Thin decorative line
         tracksGroup.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", layer.r - 5)
            .attr("fill", "none")
            .attr("stroke", layer.color)
            .attr("stroke-width", 0.5)
            .attr("stroke-opacity", 0.05);
      });

      // 2. Setup Nodes Group
      const nodesGroup = mainGroup.append("g").attr("class", "nodes");

      // Prepare node data with initial angles
      const allNodes: any[] = [];
      layers.forEach(layer => {
          const angleStep = (2 * Math.PI) / layer.items.length;
          layer.items.forEach((item, i) => {
              allNodes.push({
                  layerId: layer.id,
                  text: item,
                  angle: i * angleStep, // Current angle
                  r: layer.r,
                  color: layer.color,
                  speed: layer.speed
              });
          });
      });

      // Create Node Elements
      const nodeElements = nodesGroup.selectAll(".node")
          .data(allNodes)
          .enter()
          .append("g")
          .attr("class", "node")
          .style("cursor", "pointer");

      // Node Glow
      nodeElements.append("circle")
          .attr("r", Math.max(10, 15 * scaleFactor))
          .attr("fill", d => d.color)
          .attr("opacity", 0)
          .append("animate")
          .attr("attributeName", "opacity")
          .attr("values", "0;0.15;0")
          .attr("dur", "3s")
          .attr("repeatCount", "indefinite");

      // Node Core
      nodeElements.append("circle")
          .attr("r", Math.max(3, 4 * scaleFactor))
          .attr("fill", "#0B0B0B")
          .attr("stroke", d => d.color)
          .attr("stroke-width", 1.5);

      // Text Label - ALWAYS UPRIGHT
      nodeElements.append("text")
          .text(d => d.text)
          .attr("text-anchor", "middle")
          .attr("dy", Math.max(20, 25 * scaleFactor)) // Offset below node
          .attr("fill", d => d.color)
          .attr("font-size", `${Math.max(9, 11 * scaleFactor)}px`) // Clamp min font size
          .attr("font-family", "sans-serif")
          .attr("font-weight", "600")
          .attr("letter-spacing", "0.5px")
          .style("text-shadow", "0 2px 4px rgba(0,0,0,0.9)")
          .style("pointer-events", "none"); // Pass clicks through text

      // 3. Central Hub (BGWM) - Static Center
      const center = mainGroup.append("g")
         .attr("transform", `translate(${centerX}, ${centerY})`);
      
      // Center Glow
      const defs = svg.append("defs");
      const grad = defs.append("radialGradient").attr("id", "centerGradient");
      grad.append("stop").attr("offset", "0%").attr("stop-color", "#D4AF37").attr("stop-opacity", 0.3);
      grad.append("stop").attr("offset", "100%").attr("stop-color", "#0B0B0B").attr("stop-opacity", 0);

      center.append("circle")
        .attr("r", Math.max(30, 40 * scaleFactor))
        .attr("fill", "url(#centerGradient)");

      // Rotating dashed ring around center
      center.append("circle")
        .attr("r", Math.max(35, 45 * scaleFactor))
        .attr("fill", "none")
        .attr("stroke", "#D4AF37")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "1 3")
        .append("animateTransform")
        .attr("attributeName", "transform")
        .attr("type", "rotate")
        .attr("from", "0 0 0")
        .attr("to", "360 0 0")
        .attr("dur", "20s")
        .attr("repeatCount", "indefinite");

      center.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .text("BGWM")
        .attr("fill", "#D4AF37")
        .attr("font-family", "serif")
        .attr("font-weight", "bold")
        .attr("font-size", `${Math.max(14, 16 * scaleFactor)}px`)
        .attr("letter-spacing", "1px");

      // 4. Animation Loop using d3.timer
      const timer = d3.timer((elapsed) => {
          nodeElements.attr("transform", (d) => {
              // Update angle
              d.angle += d.speed; 
              
              // Calculate Cartesian Coordinates
              const x = centerX + Math.cos(d.angle) * d.r;
              const y = centerY + Math.sin(d.angle) * d.r;
              
              return `translate(${x}, ${y})`;
          });
      });

      return () => timer.stop();
    };

    // Initial Render
    const cleanup = updateDimensions();
    
    // Handle Resize
    const handleResize = () => {
        updateDimensions();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
        if(cleanup) cleanup();
        window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] md:min-h-[500px] relative flex items-center justify-center overflow-hidden">
       {/* Background Grid Effect */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05),_transparent_70%)] pointer-events-none"></div>
       <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default EcosystemDiagram;
