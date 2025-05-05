import { useState, useRef, useEffect } from "react";
import { BoxDimensions, TransformState } from "@/types";
import { SvgCallAction } from "@/lib/svgCallAction";
import { ZoomIn, ZoomOut, Maximize, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoxViewerProps {
  dimensions: BoxDimensions;
  svgTemplate: string;
  isLoading?: boolean;
  onExport?: () => void;
}

export default function BoxViewer({ 
  dimensions, 
  svgTemplate,
  isLoading = false,
  onExport
}: BoxViewerProps) {
  const [transform, setTransform] = useState<TransformState>({
    scale: 0.8,
    translateX: 150,
    translateY: 100
  });
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgActionRef = useRef<SvgCallAction>(new SvgCallAction());
  
  // Initialize SVG manipulator when SVG element is available
  useEffect(() => {
    if (svgRef.current) {
      svgActionRef.current.setSvgElement(svgRef.current);
      
      // Apply the SVG template
      if (svgTemplate) {
        svgActionRef.current.applySvgTemplate(svgTemplate);
      }
      
      // Update with initial dimensions
      svgActionRef.current.setDimensions(dimensions);
    }
  }, [svgRef.current, svgTemplate]);
  
  // Update SVG when dimensions change
  useEffect(() => {
    if (svgRef.current) {
      svgActionRef.current.setDimensions(dimensions);
    }
  }, [dimensions]);
  
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
      scale: 0.8,
      translateX: 150,
      translateY: 100
    });
  };
  
  // Handle export
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      svgActionRef.current.exportSvg(`kutu-${dimensions.a}x${dimensions.b}x${dimensions.h}`);
    }
  };
  
  // Format scale for display
  const scaleDisplay = `${Math.round(transform.scale * 100)}%`;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-neutral-800">Kutu Kesim Deseni</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            title="Zoom In"
            onClick={zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Zoom Out"
            onClick={zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Reset View"
            onClick={resetZoom}
          >
            <Maximize className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            title="Export SVG"
            onClick={handleExport}
            className="ml-2"
          >
            <Download className="w-4 h-4 mr-1" />
            <span>Export</span>
          </Button>
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
              <rect x="20" y="30" className="rectParent"></rect>
              <g className="ParetSvgContent active">
                {/* Content will be dynamically inserted here */}
              </g>
              
              {/* Footer text */}
              <g className="fotterG">
                <text className="info" x="40" y="356.26" fill="#ffffff" fontSize="12">
                  Dikkat ! Bu malzeme göre çizilmistir
                </text>
                <text className="info" x="196.26" y="377.26" fill="#ffffff" fontSize="12">
                  boxpatterngenerator.com
                </text>
              </g>
            </g>
          </svg>
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
              <p>Desen oluşturuluyor...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-neutral-600">
        <div>
          <span className="inline-block w-3 h-3 bg-[#00ff00] mr-1"></span> Kesim Çizgileri
          <span className="inline-block w-3 h-3 bg-[#ff0000] ml-4 mr-1"></span> Katlama Çizgileri
        </div>
        <div>Ölçek: <span id="current-scale">{scaleDisplay}</span></div>
      </div>
    </div>
  );
}