import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ZoomIn, ZoomOut, MoveHorizontal } from 'lucide-react';
import { BoxDimensions, TransformState } from '@/types';

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
    scale: 1,
    translateX: 0,
    translateY: 0
  });
  
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [svgDimensions, setSvgDimensions] = useState({ width: 800, height: 600 });
  
  // Effect to apply SVG dimensions and template
  useEffect(() => {
    if (svgContainerRef.current) {
      // Size the SVG container to parent dimensions
      const container = svgContainerRef.current.parentElement;
      if (container) {
        setSvgDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    }
  }, []);
  
  // Handle zoom in
  const handleZoomIn = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.1, 3) // Max zoom = 3x
    }));
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.1, 0.5) // Min zoom = 0.5x
    }));
  };
  
  // Handle reset view
  const handleResetView = () => {
    setTransform({
      scale: 1,
      translateX: 0,
      translateY: 0
    });
  };
  
  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - transform.translateX,
      y: e.clientY - transform.translateY
    });
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setTransform(prev => ({
      ...prev,
      translateX: e.clientX - dragStart.x,
      translateY: e.clientY - dragStart.y
    }));
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle mouse leave to end dragging
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Update SVG text elements based on dimensions
  const updateSvgWithDimensions = (svgString: string): string => {
    // Replace dimensions in the SVG text elements
    let updatedSvg = svgString;
    
    // Update A dimension text
    updatedSvg = updatedSvg.replace(
      /<text class="markerParent\s+A \([^)]*\)"[^>]*>A \([^<]*\)<\/text>/,
      `<text class="markerParent A (${dimensions.a})" x="67.75" y="182.25" size="12" fill="#000000" text="${dimensions.a}" style=";display: block;">A (${dimensions.a})  </text>`
    );
    
    // Update B dimension text
    updatedSvg = updatedSvg.replace(
      /<text class="markerParent\s+B \([^)]*\)"[^>]*>B \([^<]*\)<\/text>/,
      `<text class="markerParent B (${dimensions.b})" x="152.75" y="182.25" size="12" fill="#000000" text="${dimensions.b}" style=";display: block;">B (${dimensions.b})  </text>`
    );
    
    // Update H dimension text
    updatedSvg = updatedSvg.replace(
      /<text class="markerParent HorizantolText H \([^)]*\)"[^>]*>H \([^<]*\)<\/text>/,
      `<text class="markerParent HorizantolText H (${dimensions.h})" x="335.75" y="172.25" size="12" fill="#000000" text="${dimensions.h}" style=";display: block;">H (${dimensions.h})  </text>`
    );
    
    // Change white text to black for better visibility
    updatedSvg = updatedSvg.replace(/fill="#ffffff"/g, 'fill="#000000"');
    
    // Change display:none to display:block for all markers to make them visible
    updatedSvg = updatedSvg.replace(/style=";display: none;"/g, 'style=";display: block;"');
    
    // Make marker lines visible
    updatedSvg = updatedSvg.replace(/<line([^>]*) style="display: none;"([^>]*)>/g, '<line$1 style="display: block;"$2>');
    
    // Make stroke colors more visible
    updatedSvg = updatedSvg.replace(/stroke="#00ff00"/g, 'stroke="#008800"');
    updatedSvg = updatedSvg.replace(/stroke="#ff0000"/g, 'stroke="#ff0000"');
    
    // Add stroke-width to make lines more visible
    updatedSvg = updatedSvg.replace(/<line/g, '<line stroke-width="1.5"');
    
    // Add stroke-linecap for better line endings
    updatedSvg = updatedSvg.replace(/<line/g, '<line stroke-linecap="round"');
    
    return updatedSvg;
  };
  
  // Final SVG string with dimensions applied
  const finalSvgString = updateSvgWithDimensions(svgTemplate);
  
  return (
    <Card className="relative h-full flex flex-col shadow-lg overflow-hidden">
      <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
        <h2 className="text-lg font-medium text-neutral-800">Kutu Kesim Deseni</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Yakınlaştır">
            <ZoomIn size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Uzaklaştır">
            <ZoomOut size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleResetView} title="Görünümü Sıfırla">
            <MoveHorizontal size={18} />
          </Button>
          {onExport && (
            <Button variant="ghost" size="icon" onClick={onExport} title="SVG İndir">
              <Download size={18} />
            </Button>
          )}
        </div>
      </div>
      <CardContent className="p-0 flex-grow relative bg-neutral-100" style={{ minHeight: '65vh' }}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 bg-opacity-80">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div 
            ref={svgContainerRef}
            className="absolute inset-0 overflow-hidden cursor-move flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
                transformOrigin: 'center',
                transition: 'transform 0.1s ease-out',
                width: '90%',
                height: '90%',
                maxWidth: '800px',
                maxHeight: '800px',
                border: '1px dashed #ccc',
                padding: '20px',
                backgroundColor: '#f8f8f8'
              }}
              className="flex items-center justify-center"
            >
              <svg 
                width="100%" 
                height="100%" 
                viewBox="10 20 380 360" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
                preserveAspectRatio="xMidYMid meet"
                dangerouslySetInnerHTML={{ __html: finalSvgString }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <div className="p-3 border-t border-neutral-200 text-xs text-neutral-500">
        <div className="flex justify-between">
          <span>Model: MB-17-284</span>
          <span>Boyut: {dimensions.a} × {dimensions.b} × {dimensions.h} mm</span>
          <span>Malzeme: {dimensions.materialThickness} mm</span>
        </div>
      </div>
    </Card>
  );
}