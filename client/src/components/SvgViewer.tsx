import { useState, useRef, useEffect } from "react";
import { BoxDimensions, TransformState } from "@/types";
import { SvgManipulator } from "@/lib/svgManipulator";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

interface SvgViewerProps {
  dimensions: BoxDimensions;
  svgGenerator: SvgManipulator;
  isLoading?: boolean;
}

export default function SvgViewer({ dimensions, svgGenerator, isLoading = false }: SvgViewerProps) {
  const [transform, setTransform] = useState<TransformState>({
    scale: 0.6,
    translateX: 200,
    translateY: 150
  });
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize SVG manipulator when SVG element is available
  useEffect(() => {
    if (svgRef.current) {
      svgGenerator.setSvgElement(svgRef.current);
      svgGenerator.setDimensions(dimensions);
    }
  }, [svgRef.current, svgGenerator]);
  
  // Update SVG when dimensions change
  useEffect(() => {
    if (svgRef.current) {
      svgGenerator.setDimensions(dimensions);
    }
  }, [dimensions, svgGenerator]);
  
  // Zoom controls
  const zoomIn = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.1, 2.0)
    }));
  };
  
  const zoomOut = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.1, 0.2)
    }));
  };
  
  const resetZoom = () => {
    setTransform({
      scale: 0.6,
      translateX: 200,
      translateY: 150
    });
  };
  
  // Format scale for display
  const scaleDisplay = `${Math.round(transform.scale * 100)}%`;
  
  return (
    <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-4 flex flex-col h-[750px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-neutral-800">Cutting Pattern</h2>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-md hover:bg-neutral-200 transition-colors"
            title="Zoom In"
            onClick={zoomIn}
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button 
            className="p-2 rounded-md hover:bg-neutral-200 transition-colors"
            title="Zoom Out"
            onClick={zoomOut}
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button 
            className="p-2 rounded-md hover:bg-neutral-200 transition-colors"
            title="Reset View"
            onClick={resetZoom}
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* SVG Container */}
      <div 
        ref={containerRef}
        className="flex-grow border border-neutral-300 rounded-md bg-neutral-100 overflow-hidden relative"
      >
        {/* SVG Viewing Area */}
        <div id="dasbord" className="w-full h-full overflow-auto flex items-center justify-center">
          <svg 
            width="800" 
            height="800" 
            id="SVGContainer" 
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg" 
            version="1.1" 
            className="swg"
          >
            <g 
              className="ParetSvgContentMain" 
              transform={`translate(${transform.translateX},${transform.translateY}) scale(${transform.scale})`}
            >
              <defs>
                <marker 
                  id="arrow_start" 
                  markerWidth="10" 
                  markerHeight="10" 
                  refX="0" 
                  refY="2" 
                  orient="auto" 
                  markerUnits="strokeWidth"
                >
                  <line x1="0" y1="2" x2="4" y2="4" stroke="#ffffff"></line>
                  <line x1="0" y1="2" x2="4" y2="0" stroke="#ffffff"></line>
                </marker>
                <marker 
                  id="arrow_end" 
                  markerWidth="10" 
                  markerHeight="10" 
                  refX="4" 
                  refY="2" 
                  orient="auto" 
                  markerUnits="strokeWidth"
                >
                  <line x1="4" y1="2" x2="0" y2="4" stroke="#ffffff"></line>
                  <line x1="4" y1="2" x2="0" y2="0" stroke="#ffffff"></line>
                </marker>
              </defs>

              {/* Box Template */}
              <rect x="20" y="30" className="rectParent" width="414.62" height="296.26"></rect>
              <g className="ParetSvgContent active">
                <g className="gbody" parentx="20" parenty="30" mx="1" my="1">
                  <rect x="20" y="30" width="414.62" height="296.26"></rect>
                  
                  {/* Main Structure Lines */}
                  {/* Top section */}
                  <line x1="35" y1="123.5" x2="155" y2="123.5" stroke="#00ff00" strokeDasharray="0"></line>
                  <line x1="155" y1="123.5" x2="235" y2="123.5" stroke="#00ff00" strokeDasharray="0"></line>
                  <line x1="235" y1="123.5" x2="355" y2="123.5" stroke="#00ff00" strokeDasharray="0"></line>
                  
                  {/* Vertical lines */}
                  <line x1="35" y1="123.5" x2="35" y2="274.26" stroke="#00ff00"></line>
                  <line x1="155" y1="123.5" x2="155" y2="274.26" stroke="#00ff00"></line>
                  <line x1="235" y1="123.5" x2="235" y2="274.26" stroke="#00ff00"></line>
                  <line x1="355" y1="123.5" x2="355" y2="274.26" stroke="#00ff00"></line>
                  
                  {/* Bottom section */}
                  <line x1="35" y1="274.26" x2="155" y2="274.26" stroke="#00ff00"></line>
                  <line x1="155" y1="274.26" x2="235" y2="274.26" stroke="#00ff00"></line>
                  <line x1="235" y1="274.26" x2="355" y2="274.26" stroke="#00ff00"></line>
                  
                  {/* Top flaps */}
                  <g className="cmp03" title="cmp03 kompanent">
                    <line x1="35" y1="45" x2="35" y2="44.25" stroke="#ff0000"></line>
                    <line x1="35" y1="44.25" x2="35.38" y2="44.25" stroke="#ff0000"></line>
                    <path className="arcnew" d="M 35.38 44.25 A 14.25 14.25 0 0 1 44.5397234380332 30" stroke="#ff0000" fill="none"></path>
                    <line x1="35.38" y1="44.25" x2="44" y2="44.25" stroke="#ff0000"></line>
                    <line x1="44" y1="44.25" x2="44" y2="45" stroke="#ff0000"></line>
                    <line x1="44" y1="45" x2="146" y2="45" stroke="#00ff00"></line>
                    <line x1="44" y1="45" x2="44" y2="46.5" stroke="#ff0000"></line>
                    <line x1="155" y1="45" x2="155" y2="44.25" stroke="#ff0000"></line>
                    <line x1="155" y1="44.25" x2="154.62" y2="44.25" stroke="#ff0000"></line>
                    <path className="arcnew" d="M 154.62 44.25 A 14.25 14.25 0 0 0 145.460276561967 30" stroke="#ff0000" fill="none"></path>
                    <line x1="154.62" y1="44.25" x2="146" y2="44.25" stroke="#ff0000"></line>
                    <line x1="146" y1="44.25" x2="146" y2="45" stroke="#ff0000"></line>
                    <line x1="146" y1="45" x2="146" y2="46.5" stroke="#ff0000"></line>
                    <line x1="44.5397234380332" y1="30" x2="145.460276561967" y2="30" stroke="#ff0000"></line>
                  </g>
                  
                  {/* Side flaps */}
                  <g className="cmp02" title="cmp01 kompanent">
                    <line x1="235" y1="123.88" x2="234.62" y2="123.88" stroke="#ff0000"></line>
                    <line x1="234.62" y1="123.88" x2="234.62" y2="116.88" stroke="#ff0000"></line>
                    <line x1="234.62" y1="116.88" x2="232.62" y2="114.88" stroke="#ff0000"></line>
                    <line x1="232.62" y1="114.88" x2="222.504917985725" y2="77.13" stroke="#ff0000"></line>
                    <line x1="234.62" y1="123.88" x2="155" y2="123.88" stroke="#00ff00"></line>
                    <line x1="155" y1="123.88" x2="155" y2="77.13" stroke="#ff0000"></line>
                    <line x1="222.504917985725" y1="77.13" x2="155" y2="77.13" stroke="#ff0000"></line>
                  </g>
                  
                  {/* Bottom flaps */}
                  <g className="cmp18" title="cmp18 component">
                    <line x1="35" y1="274.26" x2="39.5320986228782" y2="326.26" stroke="#ff0000"></line>
                    <line x1="35" y1="274.26" x2="155" y2="274.26" stroke="#00ff00"></line>
                    <line x1="155" y1="274.26" x2="147.928932188135" y2="281.331067811865" stroke="#ff0000"></line>
                    <line x1="147.928932188135" y1="281.331067811865" x2="153" y2="286.402135623731" stroke="#ff0000"></line>
                    <line x1="153" y1="286.402135623731" x2="153" y2="326.26" stroke="#ff0000"></line>
                    <line x1="147.928932188135" y1="281.331067811865" x2="115" y2="314.26" stroke="#00ff00"></line>
                    <line x1="115" y1="314.26" x2="95" y2="314.26" stroke="#ff0000"></line>
                    <line x1="115" y1="314.26" x2="127" y2="326.26" stroke="#ff0000"></line>
                    <line x1="127" y1="326.26" x2="153" y2="326.26" stroke="#ff0000"></line>
                    <line x1="95" y1="314.26" x2="95" y2="318.26" stroke="#ff0000"></line>
                    <line x1="95" y1="318.26" x2="87" y2="326.26" stroke="#ff0000"></line>
                    <line x1="87" y1="326.26" x2="39.5320986228782" y2="326.26" stroke="#ff0000"></line>
                  </g>
                  
                  {/* Middle flaps */}
                  <g className="cmp19" title="cmp19 component">
                    <line x1="155" y1="274.26" x2="155.01" y2="274.26" stroke="#ff0000"></line>
                    <line x1="155.01" y1="274.26" x2="173.6623063262" y2="314.26" stroke="#ff0000"></line>
                    <line x1="155.01" y1="274.26" x2="234.99" y2="274.26" stroke="#00ff00"></line>
                    <line x1="234.99" y1="274.26" x2="235" y2="274.26" stroke="#ff0000"></line>
                    <line x1="234.99" y1="274.26" x2="194.99" y2="314.26" stroke="#ff0000"></line>
                    <line x1="194.99" y1="314.26" x2="173.6623063262" y2="314.26" stroke="#ff0000"></line>
                  </g>
                  
                  {/* Special feature component */}
                  <g className="cmp04" title="cmp04 kompanent">
                    <line x1="35" y1="123.88" x2="35" y2="273.88" stroke="#00ff00"></line>
                    <line x1="35" y1="123.88" x2="20" y2="127.899237886467" stroke="#ff0000"></line>
                    <line x1="35" y1="273.88" x2="20" y2="258.88" stroke="#ff0000"></line>
                    <line x1="20" y1="127.899237886467" x2="20" y2="258.88" stroke="#ff0000"></line>
                  </g>
                  
                  {/* Dimension lines */}
                  <line x1="35" y1="198.88" x2="155" y2="198.88" stroke="#ffffff" className="markerParent A" markerStart="url(#arrow_start)" markerEnd="url(#arrow_end)"></line>
                  <text className="markerParent A" x="80" y="193.88" fill="#ffffff" fontSize="12">A ({dimensions.a})</text>
                  
                  <line x1="155" y1="199.26" x2="235" y2="199.26" stroke="#ffffff" className="markerParent B" markerStart="url(#arrow_start)" markerEnd="url(#arrow_end)"></line>
                  <text className="markerParent B" x="180" y="194.26" fill="#ffffff" fontSize="12">B ({dimensions.b})</text>
                  
                  <line x1="381.54" y1="274.26" x2="381.54" y2="124.26" stroke="#ffffff" className="markerParent H" markerStart="url(#arrow_start)" markerEnd="url(#arrow_end)"></line>
                  <text className="markerParent H" x="391.54" y="184.26" fill="#ffffff" fontSize="12" transform="rotate(90, 391.54, 184.26)">H ({dimensions.h})</text>
                </g>
              </g>
              
              {/* Footer text */}
              <g className="fotterG">
                <text className="info" x="40" y="356.26" fill="#ffffff" fontSize="12">
                  Dikkat ! Bu malzeme {svgGenerator.getMaterialName(dimensions.materialThickness)} : {dimensions.materialThickness} göre çizilmistir
                </text>
                <text className="info" x="196.26" y="377.26" fill="#ffffff" fontSize="12">boxpatterngenerator.com</text>
              </g>
            </g>
          </svg>
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
              <p>Generating pattern...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-neutral-600">
        <div>
          <span className="inline-block w-3 h-3 bg-[#00ff00] mr-1"></span> Cut Lines
          <span className="inline-block w-3 h-3 bg-[#ff0000] ml-4 mr-1"></span> Fold Lines
        </div>
        <div>Scale: <span id="current-scale">{scaleDisplay}</span></div>
      </div>
    </div>
  );
}
