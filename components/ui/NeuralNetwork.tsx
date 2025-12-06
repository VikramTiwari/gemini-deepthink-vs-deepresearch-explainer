import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface NeuralNetworkProps {
  mode: 'linear' | 'parallel' | 'complex';
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ mode }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const svg = d3.select(svgRef.current);
    
    svg.selectAll("*").remove(); // Cleanup

    // Data generation based on mode
    let nodes: any[] = [];
    let links: any[] = [];

    if (mode === 'linear') {
      // Chain of thoughts
      for (let i = 0; i < 6; i++) {
        nodes.push({ id: i, group: 1, x: (width / 7) * (i + 1), y: height / 2 });
        if (i > 0) links.push({ source: i - 1, target: i });
      }
    } else if (mode === 'parallel' || mode === 'complex') {
      // Tree structure
      const root = { id: 0, group: 1, fx: width / 2, fy: 50 };
      nodes.push(root);
      
      const layers = mode === 'complex' ? 4 : 3;
      let nodeId = 1;
      let prevLayerNodes = [root];

      for (let l = 0; l < layers; l++) {
        const currentLayerNodes = [];
        const count = mode === 'complex' ? 3 + l : 2 + l; // Increasing breadth
        
        for (const parent of prevLayerNodes) {
           for(let k=0; k < (mode === 'complex' ? 3 : 2); k++) {
              const node = { id: nodeId++, group: 2 };
              nodes.push(node);
              links.push({ source: parent.id, target: node.id });
              currentLayerNodes.push(node);
           }
        }
        prevLayerNodes = currentLayerNodes;
      }
    }

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(50))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05));
      
      if (mode === 'linear') {
         simulation.stop(); // Static layout for linear
      }

    const link = svg.append("g")
      .attr("stroke", mode === 'linear' ? "#ef4444" : "#9B87F5") // Red for linear, Purple for parallel
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 6)
      .attr("fill", mode === 'linear' ? "#ef4444" : "#4DA6FF");

    if (mode === 'linear') {
         // Manually set positions for linear to look like a timeline
         node.attr("cx", (d:any) => d.x).attr("cy", (d:any) => d.y);
         link.attr("x1", (d:any) => nodes[d.source].x)
             .attr("y1", (d:any) => nodes[d.source].y)
             .attr("x2", (d:any) => nodes[d.target].x)
             .attr("y2", (d:any) => nodes[d.target].y);
    } else {
        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);
        
            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        });
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [mode]);

  return (
    <svg ref={svgRef} width="100%" height="400" className="overflow-visible" />
  );
};