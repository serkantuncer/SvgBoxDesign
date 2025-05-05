import { useState, useEffect } from "react";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { TabsCustom, TabContent } from "@/components/ui/tabs-custom";
import { BoxDimensions, FeatureType, MaterialOption } from "@/types";
import { SvgCallAction } from "@/lib/svgCallAction";
import { RefreshCw } from "lucide-react";

interface BoxControlFormProps {
  dimensions: BoxDimensions;
  onDimensionsChange: (dimensions: BoxDimensions) => void;
  onGeneratePattern: () => void;
}

// Material options
const materialOptions: MaterialOption[] = [
  { label: "Standart 1 mm", value: 1 },
  { label: "Standart 1.5 mm", value: 1.5 },
  { label: "Standart 2 mm", value: 2 },
  { label: "Krome 225 gr : 0.38", value: 0.38 },
  { label: "Krome 250 gr : 0.41", value: 0.41 },
  { label: "Krome 300 gr : 0.45", value: 0.45, id: "krome-300" },
  { label: "Krome 350 gr : 0.51", value: 0.51 },
  { label: "Krome 400 gr : 0.65", value: 0.65, id: "krome-400" },
  { label: "Krome 450 gr : 0.71", value: 0.71 },
  { label: "Bristol 180 gr: 0.33", value: 0.33 },
  { label: "Bristol 200 gr: 0.35", value: 0.35 },
  { label: "Bristol 220 gr: 0.37", value: 0.37 },
  { label: "Bristol 240 gr: 0.39", value: 0.39 },
  { label: "Bristol 280 gr: 0.45", value: 0.45, id: "bristol-280" },
  { label: "Bristol 300 gr: 0.53", value: 0.53 },
  { label: "Bristol 330 gr: 0.60", value: 0.6 },
  { label: "Bristol 350 gr: 0.65", value: 0.65, id: "bristol-350" },
  { label: "Bristol 380 gr: 0.70", value: 0.7 }
];

// Tab definitions
const tabs = [
  { id: "main-dimensions", label: "Ana Ölçüler" },
  { id: "additional-features", label: "Ek Özellikler" },
  { id: "hidden-dimensions", label: "Gizli Ölçüler" }
];

export default function BoxControlForm({ 
  dimensions, 
  onDimensionsChange,
  onGeneratePattern
}: BoxControlFormProps) {
  const [activeTab, setActiveTab] = useState("main-dimensions");
  
  // Handle dimension change
  const handleDimensionChange = (key: keyof BoxDimensions, value: number | string) => {
    // Convert string values to numbers if needed
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // If the value is NaN or other falsy but not 0, ignore it
    if (!numValue && numValue !== 0) return;
    
    const newDimensions = { ...dimensions, [key]: numValue };
    
    // Calculate derived values if A or B dimensions change
    if (key === 'a' || key === 'b') {
      const { a, b } = newDimensions;
      const derived = SvgCallAction.calculateDerivedDimensions(a, b);
      Object.assign(newDimensions, derived);
      
      // Recalculate G value with material thickness
      newDimensions.g = SvgCallAction.calculateGValue(
        derived.f, 
        newDimensions.b, 
        newDimensions.materialThickness
      );
    }
    
    // Recalculate G if material thickness changes
    if (key === 'materialThickness' || key === 'f') {
      newDimensions.g = SvgCallAction.calculateGValue(
        newDimensions.f, 
        newDimensions.b, 
        newDimensions.materialThickness
      );
    }
    
    onDimensionsChange(newDimensions);
  };
  
  // Handle feature type change
  const handleFeatureTypeChange = (featureType: FeatureType) => {
    onDimensionsChange({ ...dimensions, featureType });
  };
  
  // Format for display with 2 decimal places
  const formatNumber = (num: number) => {
    return num.toFixed(2);
  };
  
  return (
    <div className="space-y-6">
      {/* Model Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-neutral-800">Model Bilgisi</h2>
            <span className="px-3 py-1 bg-primary/30 text-primary rounded-full text-sm font-medium">
              Karton Kutular
            </span>
          </div>
          <div className="flex items-center text-neutral-700">
            <span className="mr-2 font-medium">Model No:</span>
            <span>MB-17-284</span>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Container */}
      <Card className="overflow-hidden">
        {/* Tabs */}
        <TabsCustom 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        
        {/* Main Dimensions Tab */}
        <TabContent id="main-dimensions" activeTab={activeTab}>
          {/* A Dimension */}
          <div className="space-y-1">
            <Label htmlFor="a_cmd">A (Genişlik):</Label>
            <div className="flex">
              <Input
                id="a_cmd"
                type="number"
                value={dimensions.a}
                onChange={(e) => handleDimensionChange('a', e.target.value)}
                min={10}
                max={1000}
                step={0.01}
                className="flex-grow rounded-r-none text-right"
              />
              <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                mm
              </span>
            </div>
          </div>

          {/* B Dimension */}
          <div className="space-y-1">
            <Label htmlFor="b_cmd">B (Uzunluk):</Label>
            <div className="flex">
              <Input
                id="b_cmd"
                type="number"
                value={dimensions.b}
                onChange={(e) => handleDimensionChange('b', e.target.value)}
                min={10}
                max={1000}
                step={0.01}
                className="flex-grow rounded-r-none text-right"
              />
              <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                mm
              </span>
            </div>
          </div>

          {/* H Dimension */}
          <div className="space-y-1">
            <Label htmlFor="h_cmd">H (Yükseklik):</Label>
            <div className="flex">
              <Input
                id="h_cmd"
                type="number"
                value={dimensions.h}
                onChange={(e) => handleDimensionChange('h', e.target.value)}
                min={10}
                max={1000}
                step={0.01}
                className="flex-grow rounded-r-none text-right"
              />
              <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                mm
              </span>
            </div>
          </div>

          {/* Material Selection */}
          <div className="space-y-1">
            <Label htmlFor="material">Malzeme:</Label>
            <Select 
              value={dimensions.materialThickness.toString()} 
              onValueChange={(val) => handleDimensionChange('materialThickness', parseFloat(val))}
            >
              <SelectTrigger id="material">
                <SelectValue placeholder="Malzeme seçin" />
              </SelectTrigger>
              <SelectContent>
                {materialOptions.map((option) => (
                  <SelectItem 
                    key={option.id || `material-${option.value}`} 
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={onGeneratePattern}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Deseni Oluştur
          </Button>
        </TabContent>
        
        {/* Additional Features Tab */}
        <TabContent id="additional-features" activeTab={activeTab}>
          {/* Model Type */}
          <div className="space-y-1">
            <Label htmlFor="modelType">Model Tipi:</Label>
            <Select 
              value={dimensions.modelType.toString()} 
              onValueChange={(val) => handleDimensionChange('modelType', parseInt(val))}
            >
              <SelectTrigger id="modelType">
                <SelectValue placeholder="Model tipi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Düz Tip</SelectItem>
                <SelectItem value="2">Oval Tip</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Feature Type */}
          <div className="space-y-2">
            <Label>Ek Özellikler:</Label>
            <div className="grid grid-cols-2 gap-2 border border-neutral-300 rounded-md p-3">
              <RadioGroup 
                value={dimensions.featureType} 
                onValueChange={(value) => handleFeatureTypeChange(value as FeatureType)}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Normal" id="normal-feature" />
                  <Label htmlFor="normal-feature" className="cursor-pointer">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Aski" id="aski-feature" />
                  <Label htmlFor="aski-feature" className="cursor-pointer">Askılık</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Dil" id="dil-feature" />
                  <Label htmlFor="dil-feature" className="cursor-pointer">Dil</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Parmak" id="parmak-feature" />
                  <Label htmlFor="parmak-feature" className="cursor-pointer">Parmak</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Feature specific options */}
          {dimensions.featureType === 'Aski' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="askiType">Askılık Tipi:</Label>
                <Select 
                  value={dimensions.askiType?.toString() || "1"} 
                  onValueChange={(val) => handleDimensionChange('askiType', parseInt(val))}
                >
                  <SelectTrigger id="askiType">
                    <SelectValue placeholder="Askılık tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Askılık Yok</SelectItem>
                    <SelectItem value="2">Yukarı Askılık</SelectItem>
                    <SelectItem value="3">Aşağı Askılık</SelectItem>
                    <SelectItem value="4">Çift Askılık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="m1_cmd">M1:</Label>
                <div className="flex">
                  <Input
                    id="m1_cmd"
                    type="number"
                    value={dimensions.m1 || 30}
                    onChange={(e) => handleDimensionChange('m1', e.target.value)}
                    min={5}
                    max={100}
                    step={0.01}
                    className="flex-grow rounded-r-none text-right"
                  />
                  <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                    mm
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="m4_cmd">M4:</Label>
                <div className="flex">
                  <Input
                    id="m4_cmd"
                    type="number"
                    value={dimensions.m4 || 20}
                    onChange={(e) => handleDimensionChange('m4', e.target.value)}
                    min={5}
                    max={100}
                    step={0.01}
                    className="flex-grow rounded-r-none text-right"
                  />
                  <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                    mm
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {dimensions.featureType === 'Dil' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="dilType">Dil Tipi:</Label>
                <Select 
                  value={dimensions.dilType?.toString() || "1"} 
                  onValueChange={(val) => handleDimensionChange('dilType', parseInt(val))}
                >
                  <SelectTrigger id="dilType">
                    <SelectValue placeholder="Dil tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dil Yok</SelectItem>
                    <SelectItem value="2">Yukarı Dilli</SelectItem>
                    <SelectItem value="3">Aşağı Dilli</SelectItem>
                    <SelectItem value="4">Çift Dilli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="d_cmd">D:</Label>
                <div className="flex">
                  <Input
                    id="d_cmd"
                    type="number"
                    value={formatNumber(dimensions.d || 0)}
                    readOnly
                    className="flex-grow rounded-r-none text-right bg-neutral-100"
                  />
                  <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                    mm
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">A / 3.5 olarak otomatik hesaplanır</p>
              </div>
            </div>
          )}
          
          {dimensions.featureType === 'Parmak' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="parmakType">Parmak Tipi:</Label>
                <Select 
                  value={dimensions.parmakType?.toString() || "1"} 
                  onValueChange={(val) => handleDimensionChange('parmakType', parseInt(val))}
                >
                  <SelectTrigger id="parmakType">
                    <SelectValue placeholder="Parmak tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Parmak Yok</SelectItem>
                    <SelectItem value="2">Üst Parmak</SelectItem>
                    <SelectItem value="3">Alt Parmak</SelectItem>
                    <SelectItem value="4">Çift Parmak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="r1_cmd">R1:</Label>
                <div className="flex">
                  <Input
                    id="r1_cmd"
                    type="number"
                    value={formatNumber(dimensions.r1 || 0)}
                    readOnly
                    className="flex-grow rounded-r-none text-right bg-neutral-100"
                  />
                  <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                    mm
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">(A+B) / 12 olarak otomatik hesaplanır</p>
              </div>
            </div>
          )}
        </TabContent>
        
        {/* Hidden Dimensions Tab */}
        <TabContent id="hidden-dimensions" activeTab={activeTab}>
          <div className="space-y-4">
            {/* Z Dimension */}
            <div className="space-y-1">
              <Label htmlFor="z_cmd">Z:</Label>
              <div className="flex">
                <Input
                  id="z_cmd"
                  type="number"
                  value={formatNumber(dimensions.z)}
                  readOnly
                  className="flex-grow rounded-r-none text-right bg-neutral-100"
                />
                <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                  mm
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">(A+B) * 0.035 olarak otomatik hesaplanır</p>
            </div>
            
            {/* F Dimension */}
            <div className="space-y-1">
              <Label htmlFor="f_cmd">F:</Label>
              <div className="flex">
                <Input
                  id="f_cmd"
                  type="number"
                  value={formatNumber(dimensions.f)}
                  readOnly
                  className="flex-grow rounded-r-none text-right bg-neutral-100"
                />
                <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                  mm
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">(A+B) * 0.075 olarak otomatik hesaplanır</p>
            </div>
            
            {/* G Dimension */}
            <div className="space-y-1">
              <Label htmlFor="g_cmd">G:</Label>
              <div className="flex">
                <Input
                  id="g_cmd"
                  type="number"
                  value={formatNumber(dimensions.g)}
                  readOnly
                  className="flex-grow rounded-r-none text-right bg-neutral-100"
                />
                <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                  mm
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">(F + (B-1.5) + malzeme) / 2 olarak otomatik hesaplanır</p>
            </div>
            
            {/* C Dimension */}
            <div className="space-y-1">
              <Label htmlFor="c_cmd">C:</Label>
              <div className="flex">
                <Input
                  id="c_cmd"
                  type="number"
                  value={formatNumber(dimensions.c)}
                  readOnly
                  className="flex-grow rounded-r-none text-right bg-neutral-100"
                />
                <span className="bg-neutral-200 px-3 py-2 rounded-r-md border border-l-0 border-neutral-300 flex items-center text-neutral-700">
                  mm
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">(A+B) * 0.075 olarak otomatik hesaplanır</p>
            </div>
          </div>
        </TabContent>
      </Card>
    </div>
  );
}