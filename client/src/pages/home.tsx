import { useState, useRef, useEffect } from 'react';
import { BoxDimensions, FeatureType } from '@/types';
import { SvgCallAction } from '@/lib/svgCallAction';
import BoxControlForm from '@/components/BoxControlForm';
import BoxViewer from '@/components/BoxViewer';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

// Example SVG template from attached_assets/kutu_284.txt
const kartonKutuTemplate = `<g class="cmp04" title="cmp04 kompanent">
    <line x1="32.75" y1="112.25" x2="32.75" y2="262.25" stroke="#00ff00" style=""/>
    <line x1="32.75" y1="187.25" x2="20" y2="187.25" stroke="#ffffff" style="display: none;" class=" marker C" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker  C" x="26.375" y="182.25" size="12" fill="#ffffff" text="12,75" style=";display: none;">C  </text>
    <line x1="32.75" y1="112.25" x2="20" y2="115.666352203497" stroke="#ff0000" style=""/>
    <line x1="32.75" y1="262.25" x2="20" y2="258.833647796503" stroke="#ff0000" style=""/>
    <line x1="20" y1="115.666352203497" x2="20" y2="258.833647796503" stroke="#ff0000" style=""/>
</g>
<line x1="32.75" y1="187.25" x2="132.75" y2="187.25" stroke="#ffffff" style="display: block;" class=" markerParent A" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
<text class="markerParent  A (100)" x="67.75" y="182.25" size="12" fill="#ffffff" text="100" style=";display: block;">A (100)  </text>
<line x1="32.75" y1="262.25" x2="132.75" y2="262.25" stroke="#ff0000" style=""/>
<line x1="132.75" y1="187.25" x2="202.75" y2="187.25" stroke="#ffffff" style="display: block;" class=" markerParent B" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
<text class="markerParent  B (70)" x="152.75" y="182.25" size="12" fill="#ffffff" text="70" style=";display: block;">B (70)  </text>
<line x1="132.75" y1="262.25" x2="132.75" y2="112.25" stroke="#00ff00" style=""/>
<g class="cmp02" title="cmp01 kompanent">
    <line x1="132.75" y1="262.25" x2="133.75" y2="262.25" stroke="#ff0000" style=""/>
    <line x1="133.75" y1="262.25" x2="133.75" y2="268.2" stroke="#ff0000" style=""/>
    <line x1="136.725" y1="262.25" x2="136.725" y2="268.2" stroke="#ffffff" style="display: none;" class=" marker Z" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText Z" x="121.725" y="265.225" size="12" fill="#ffffff" text="5,94999999999999" style=";display: none;">Z  </text>
    <line x1="133.75" y1="268.2" x2="135.75" y2="270.2" stroke="#ff0000" style=""/>
    <line x1="135.75" y1="270.2" x2="144.640554204865" y2="303.38" stroke="#ff0000" style=""/>
    <line x1="133.75" y1="262.25" x2="202.75" y2="262.25" stroke="#00ff00" style=""/>
    <line x1="202.75" y1="262.25" x2="199.75" y2="265.25" stroke="#ff0000" style=""/>
    <line x1="199.75" y1="265.25" x2="197.75" y2="303.38" stroke="#ff0000" style=""/>
    <line x1="162.75" y1="303.38" x2="162.75" y2="262.25" stroke="#ffffff" style="display: none;" class=" marker G" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText G" x="167.75" y="282.815" size="12" fill="#ffffff" text="41,13" style=";display: none;">G  </text>
    <line x1="144.640554204865" y1="303.38" x2="197.75" y2="303.38" stroke="#ff0000" style=""/>
</g>
<line x1="202.75" y1="262.25" x2="202.75" y2="112.25" stroke="#00ff00" style=""/>
<line x1="202.75" y1="263.25" x2="302.75" y2="263.25" stroke="#00ff00" style=""/>
<line x1="202.75" y1="262.25" x2="202.75" y2="263.25" stroke="#ff0000" style=""/>
<line x1="302.75" y1="263.25" x2="302.75" y2="331.75" stroke="#ff0000" style=""/>
<g class="cmp03" title="cmp03 kompanent">
    <line x1="302.75" y1="331.75" x2="302.75" y2="332.5" stroke="#ff0000" style=""/>
    <line x1="302.75" y1="332.5" x2="301.75" y2="332.5" stroke="#ff0000" style=""/>
    <line x1="301.75" y1="332.5" x2="301.75" y2="339.25" stroke="#ff0000" style=""/>
    <path class="arcnew" rp1="0" rp2="5.25" rp3="-2.625" rp4="5.25" rp5="-5.25" rp6="5.25" x1="301.75" y1="339.25" x2="296.5" y2="344.5" r1="5.25" r2="5.25" r3="0" r4="0" rotate="1" d=" M 301.75 339.25  A   5.25  5.25  0  0  1 296.5 344.5 " stroke="#ff0000" fill="none"/>
    <line x1="301.75" y1="332.5" x2="294.8" y2="332.5" stroke="#ff0000" style=""/>
    <line x1="294.8" y1="332.5" x2="294.8" y2="331.75" stroke="#ff0000" style=""/>
    <line x1="294.8" y1="331.75" x2="210.7" y2="331.75" stroke="#00ff00" style=""/>
    <line x1="252.75" y1="344.5" x2="252.75" y2="331.75" stroke="#ffffff" style="display: none;" class=" marker F" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText F" x="257.75" y="338.125" size="12" fill="#ffffff" text="12,75" style=";display: none;">F  </text>
    <line x1="294.8" y1="331.75" x2="294.8" y2="330.25" stroke="#ff0000" style=""/>
    <line x1="202.75" y1="331.75" x2="202.75" y2="332.5" stroke="#ff0000" style=""/>
    <line x1="202.75" y1="332.5" x2="203.75" y2="332.5" stroke="#ff0000" style=""/>
    <line x1="203.75" y1="332.5" x2="203.75" y2="339.25" stroke="#ff0000" style=""/>
    <path class="arcnew" rp1="0" rp2="5.25" rp3="5.25" rp4="5.25" rp5="5.25" rp6="5.25" x1="203.75" y1="339.25" x2="209" y2="344.5" r1="5.25" r2="5.25" r3="0" r4="0" rotate="0" d=" M 203.75 339.25  A   5.25  5.25  0  0  0 209 344.5 " stroke="#ff0000" fill="none"/>
    <line x1="203.75" y1="332.5" x2="210.7" y2="332.5" stroke="#ff0000" style=""/>
    <line x1="210.7" y1="332.5" x2="210.7" y2="331.75" stroke="#ff0000" style=""/>
    <line x1="210.7" y1="331.75" x2="210.7" y2="330.25" stroke="#ff0000" style=""/>
    <line x1="296.5" y1="344.5" x2="209" y2="344.5" stroke="#ff0000" style=""/>
</g>
<line x1="202.75" y1="331.75" x2="202.75" y2="263.25" stroke="#ff0000" style=""/>
<line x1="302.75" y1="263.25" x2="302.75" y2="262.25" stroke="#ff0000" style=""/>
<line x1="302.75" y1="262.25" x2="302.75" y2="112.25" stroke="#00ff00" style=""/>
<line x1="325.75" y1="262.25" x2="325.75" y2="112.25" stroke="#ffffff" style="display: block;" class=" markerParent H" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
<text class="markerParent HorizantolText H (150)" x="335.75" y="172.25" size="12" fill="#ffffff" text="150" style=";display: block;">H (150)  </text>
<g class="cmp02" title="cmp01 kompanent">
    <line x1="371.75" y1="262.25" x2="371.75" y2="262.25" stroke="#ff0000" style=""/>
    <line x1="371.75" y1="262.25" x2="371.75" y2="268.2" stroke="#ff0000" style=""/>
    <line x1="368.775" y1="262.25" x2="368.775" y2="268.2" stroke="#ffffff" style="display: none;" class=" marker Z" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText Z" x="353.775" y="265.225" size="12" fill="#ffffff" text="5,94999999999999" style=";display: none;">Z  </text>
    <line x1="371.75" y1="268.2" x2="369.75" y2="270.2" stroke="#ff0000" style=""/>
    <line x1="369.75" y1="270.2" x2="360.859445795135" y2="303.38" stroke="#ff0000" style=""/>
    <line x1="371.75" y1="262.25" x2="302.75" y2="262.25" stroke="#00ff00" style=""/>
    <line x1="302.75" y1="262.25" x2="305.75" y2="265.25" stroke="#ff0000" style=""/>
    <line x1="305.75" y1="265.25" x2="307.75" y2="303.38" stroke="#ff0000" style=""/>
    <line x1="342.25" y1="303.38" x2="342.25" y2="262.25" stroke="#ffffff" style="display: none;" class=" marker G" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText G" x="347.25" y="282.815" size="12" fill="#ffffff" text="41,13" style=";display: none;">G  </text>
    <line x1="360.859445795135" y1="303.38" x2="307.75" y2="303.38" stroke="#ff0000" style=""/>
</g>
<line x1="371.75" y1="262.25" x2="371.75" y2="112.25" stroke="#ff0000" style=""/>
<g class="cmp02" title="cmp01 kompanent">
    <line x1="302.75" y1="112.25" x2="303.75" y2="112.25" stroke="#ff0000" style=""/>
    <line x1="303.75" y1="112.25" x2="303.75" y2="106.3" stroke="#ff0000" style=""/>
    <line x1="306.725" y1="112.25" x2="306.725" y2="106.3" stroke="#ffffff" style="display: none;" class=" marker Z" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText Z" x="311.725" y="109.275" size="12" fill="#ffffff" text="5,95" style=";display: none;">Z  </text>
    <line x1="303.75" y1="106.3" x2="305.75" y2="104.3" stroke="#ff0000" style=""/>
    <line x1="305.75" y1="104.3" x2="314.640554204865" y2="71.12" stroke="#ff0000" style=""/>
    <line x1="303.75" y1="112.25" x2="371.75" y2="112.25" stroke="#00ff00" style=""/>
    <line x1="371.75" y1="112.25" x2="368.75" y2="109.25" stroke="#ff0000" style=""/>
    <line x1="368.75" y1="109.25" x2="366.75" y2="71.12" stroke="#ff0000" style=""/>
    <line x1="332.25" y1="71.12" x2="332.25" y2="112.25" stroke="#ffffff" style="display: none;" class=" marker G" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText G" x="317.25" y="91.685" size="12" fill="#ffffff" text="41,13" style=";display: none;">G  </text>
    <line x1="314.640554204865" y1="71.12" x2="366.75" y2="71.12" stroke="#ff0000" style=""/>
</g>
<line x1="302.75" y1="112.25" x2="202.75" y2="112.25" stroke="#ff0000" style=""/>
<g class="cmp02" title="cmp01 kompanent">
    <line x1="202.75" y1="112.25" x2="201.75" y2="112.25" stroke="#ff0000" style=""/>
    <line x1="201.75" y1="112.25" x2="201.75" y2="106.3" stroke="#ff0000" style=""/>
    <line x1="198.775" y1="112.25" x2="198.775" y2="106.3" stroke="#ffffff" style="display: none;" class=" marker Z" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText Z" x="203.775" y="109.275" size="12" fill="#ffffff" text="5,95" style=";display: none;">Z  </text>
    <line x1="201.75" y1="106.3" x2="199.75" y2="104.3" stroke="#ff0000" style=""/>
    <line x1="199.75" y1="104.3" x2="190.859445795135" y2="71.12" stroke="#ff0000" style=""/>
    <line x1="201.75" y1="112.25" x2="132.75" y2="112.25" stroke="#00ff00" style=""/>
    <line x1="132.75" y1="112.25" x2="135.75" y2="109.25" stroke="#ff0000" style=""/>
    <line x1="135.75" y1="109.25" x2="137.75" y2="71.12" stroke="#ff0000" style=""/>
    <line x1="172.75" y1="71.12" x2="172.75" y2="112.25" stroke="#ffffff" style="display: none;" class=" marker G" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText G" x="157.75" y="91.685" size="12" fill="#ffffff" text="41,13" style=";display: none;">G  </text>
    <line x1="190.859445795135" y1="71.12" x2="137.75" y2="71.12" stroke="#ff0000" style=""/>
</g>
<line x1="132.75" y1="111.25" x2="32.75" y2="111.25" stroke="#00ff00" style=""/>
<line x1="32.75" y1="111.25" x2="32.75" y2="112.25" stroke="#ff0000" style=""/>
<line x1="32.75" y1="111.25" x2="32.75" y2="42.75" stroke="#ff0000" style=""/>
<g class="cmp03" title="cmp03 kompanent">
    <line x1="32.75" y1="42.75" x2="32.75" y2="42" stroke="#ff0000" style=""/>
    <line x1="32.75" y1="42" x2="33.75" y2="42" stroke="#ff0000" style=""/>
    <line x1="33.75" y1="42" x2="33.75" y2="35.25" stroke="#ff0000" style=""/>
    <path class="arcnew" rp1="0" rp2="-5.25" rp3="2.625" rp4="-5.25" rp5="5.25" rp6="-5.25" x1="33.75" y1="35.25" x2="39" y2="30" r1="5.25" r2="5.25" r3="0" r4="0" rotate="1" d=" M 33.75 35.25  A   5.25  5.25  0  0  1 39 30 " stroke="#ff0000" fill="none"/>
    <line x1="33.75" y1="42" x2="40.7" y2="42" stroke="#ff0000" style=""/>
    <line x1="40.7" y1="42" x2="40.7" y2="42.75" stroke="#ff0000" style=""/>
    <line x1="40.7" y1="42.75" x2="124.8" y2="42.75" stroke="#00ff00" style=""/>
    <line x1="82.75" y1="30" x2="82.75" y2="42.75" stroke="#ffffff" style="display: none;" class=" marker F" marker-start="url(#arrow_start)" marker-end="url(#arrow_end)"/>
    <text class="marker HorizantolText F" x="67.75" y="36.375" size="12" fill="#ffffff" text="12,75" style=";display: none;">F  </text>
    <line x1="40.7" y1="42.75" x2="40.7" y2="44.25" stroke="#ff0000" style=""/>
    <line x1="132.75" y1="42.75" x2="132.75" y2="42" stroke="#ff0000" style=""/>
    <line x1="132.75" y1="42" x2="131.75" y2="42" stroke="#ff0000" style=""/>
    <line x1="131.75" y1="42" x2="131.75" y2="35.25" stroke="#ff0000" style=""/>
    <path class="arcnew" rp1="0" rp2="-5.25" rp3="-5.25" rp4="-5.25" rp5="-5.25" rp6="-5.25" x1="131.75" y1="35.25" x2="126.5" y2="30" r1="5.25" r2="5.25" r3="0" r4="0" rotate="0" d=" M 131.75 35.25  A   5.25  5.25  0  0  0 126.5 30 " stroke="#ff0000" fill="none"/>
    <line x1="131.75" y1="42" x2="124.8" y2="42" stroke="#ff0000" style=""/>
    <line x1="124.8" y1="42" x2="124.8" y2="42.75" stroke="#ff0000" style=""/>
    <line x1="124.8" y1="42.75" x2="124.8" y2="44.25" stroke="#ff0000" style=""/>
    <line x1="39" y1="30" x2="126.5" y2="30" stroke="#ff0000" style=""/>
</g>
<line x1="132.75" y1="42.75" x2="132.75" y2="112.25" stroke="#ff0000" style=""/>`;

export default function Home() {
  // Initial dimensions state
  const [dimensions, setDimensions] = useState<BoxDimensions>({
    a: 100,
    b: 70,
    h: 150,
    materialThickness: 1,
    modelType: 2,
    featureType: 'Normal' as FeatureType,
    z: 5.95, // Initially calculated as (A+B) * 0.035
    f: 12.75, // Initially calculated as (A+B) * 0.075
    g: 41.13, // Derived value
    c: 12.75, // Initially calculated as (A+B) * 0.075
    askiType: 2,
    dilType: 2,
    parmakType: 2,
    m1: 30,
    m4: 20
  });
  
  // Loading state for SVG generation
  const [isLoading, setIsLoading] = useState(false);
  
  // SVG Call Action instance
  const svgCallAction = useRef(new SvgCallAction()).current;
  
  // Initialize derived values
  useEffect(() => {
    // Calculate derived dimensions
    const { a, b } = dimensions;
    const derived = SvgCallAction.calculateDerivedDimensions(a, b);
    
    // Update g value based on f, b and material thickness
    const g = SvgCallAction.calculateGValue(
      derived.f,
      dimensions.b,
      dimensions.materialThickness
    );
    
    // Update dimensions with derived values
    setDimensions(prev => ({
      ...prev,
      ...derived,
      g
    }));
  }, []);
  
  // Handle dimensions change
  const handleDimensionsChange = (newDimensions: BoxDimensions) => {
    setDimensions(newDimensions);
  };
  
  // Save design mutation
  const saveDesignMutation = useMutation({
    mutationFn: async (designName: string) => {
      const svg = svgCallAction.getSvgString();
      const design = {
        name: designName,
        dimensions,
        svg
      };
      
      return await apiRequest('POST', '/api/designs', design);
    },
    onSuccess: () => {
      toast({
        title: "Tasarım kaydedildi",
        description: "Kutu tasarımınız başarıyla kaydedildi."
      });
    },
    onError: (error) => {
      toast({
        title: "Tasarım kaydedilemedi",
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
    svgCallAction.exportSvg(`kutu-${dimensions.a}x${dimensions.b}x${dimensions.h}`);
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
            <h1 className="text-xl font-semibold">Kutu Kesim Deseni Oluşturucu</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-primary-light transition-colors duration-200">Şablonlar</a>
            <a href="#" className="hover:text-primary-light transition-colors duration-200">Dışa Aktar</a>
            <a href="#" className="hover:text-primary-light transition-colors duration-200">Yardım</a>
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
          <div className="lg:w-1/3">
            <BoxControlForm 
              dimensions={dimensions}
              onDimensionsChange={handleDimensionsChange}
              onGeneratePattern={handleGeneratePattern}
            />
          </div>
          
          {/* Right Column - SVG Visualization */}
          <div className="lg:w-2/3">
            <BoxViewer 
              dimensions={dimensions}
              svgTemplate={kartonKutuTemplate}
              isLoading={isLoading}
              onExport={handleExportPattern}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-400 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Kutu Kesim Deseni Oluşturucu</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors duration-200">Kullanım Şartları</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Gizlilik</a>
              <a href="#" className="hover:text-white transition-colors duration-200">İletişim</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
