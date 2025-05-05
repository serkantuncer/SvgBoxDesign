import { useState, useRef, useEffect } from 'react';
import { BoxDimensions, FeatureType } from '@/types';
import { SvgManipulator } from '@/lib/svgManipulator';
import BoxFormPanel from '@/components/BoxFormPanel';
import SvgViewer from '@/components/SvgViewer';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  // Initial dimensions state
  const [dimensions, setDimensions] = useState<BoxDimensions>({
    a: 120,
    b: 80,
    h: 150,
    materialThickness: 0.38,
    modelType: 1,
    featureType: 'Normal' as FeatureType,
    z: 7, // Initially calculated as (A+B) * 0.035
    f: 15, // Initially calculated as (A+B) * 0.075
    g: 46.75, // Derived value
    c: 15, // Initially calculated as (A+B) * 0.075
    askiType: 2,
    dilType: 2,
    parmakType: 2,
    m1: 30,
    m4: 20
  });
  
  // Loading state for SVG generation
  const [isLoading, setIsLoading] = useState(false);
  
  // SVG manipulator instance
  const svgManipulator = useRef(new SvgManipulator()).current;
  
  // Initialize derived values
  useEffect(() => {
    // Calculate derived dimensions
    const { a, b } = dimensions;
    const derived = SvgManipulator.calculateDerivedDimensions(a, b);
    
    // Update g value based on f, b and material thickness
    derived.g = SvgManipulator.calculateGValue(
      derived.f,
      dimensions.b,
      dimensions.materialThickness
    );
    
    // Update dimensions with derived values
    setDimensions(prev => ({
      ...prev,
      ...derived
    }));
  }, []);
  
  // Handle dimensions change
  const handleDimensionsChange = (newDimensions: BoxDimensions) => {
    setDimensions(newDimensions);
  };
  
  // Save design mutation
  const saveDesignMutation = useMutation({
    mutationFn: async (designName: string) => {
      const svg = svgManipulator.getSvgString();
      const design = {
        name: designName,
        dimensions,
        svg
      };
      
      return await apiRequest('POST', '/api/designs', design);
    },
    onSuccess: () => {
      toast({
        title: "Design saved",
        description: "Your box design has been saved successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving design",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // Generate pattern handler
  const handleGeneratePattern = () => {
    setIsLoading(true);
    
    // Simulate a delay for visual feedback
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  // Export pattern handler
  const handleExportPattern = () => {
    svgManipulator.exportSvg(`box-pattern-${dimensions.a}x${dimensions.b}x${dimensions.h}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <h1 className="text-xl font-semibold">Box Cutting Pattern Generator</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-primary-light transition-colors duration-200">Templates</a>
            <a href="#" className="hover:text-primary-light transition-colors duration-200">Export</a>
            <a href="#" className="hover:text-primary-light transition-colors duration-200">Help</a>
          </div>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Controls */}
          <BoxFormPanel 
            dimensions={dimensions}
            onDimensionsChange={handleDimensionsChange}
            onGeneratePattern={handleGeneratePattern}
            onExportPattern={handleExportPattern}
          />
          
          {/* Right Column - SVG Visualization */}
          <SvgViewer 
            dimensions={dimensions}
            svgGenerator={svgManipulator}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-400 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2023 Box Cutting Pattern Generator</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
