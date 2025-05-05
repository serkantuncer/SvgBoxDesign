import { BoxDimensions } from "@/types";

/**
 * SvgManipulator - Class to handle SVG pattern generation and manipulation
 */
export class SvgManipulator {
  private svgElement: SVGElement | null = null;
  private dimensions: BoxDimensions | null = null;
  
  constructor(svgElement?: SVGElement) {
    if (svgElement) {
      this.svgElement = svgElement;
    }
  }
  
  /**
   * Set the SVG element to manipulate
   */
  setSvgElement(svgElement: SVGElement) {
    this.svgElement = svgElement;
  }
  
  /**
   * Set dimensions and update the SVG
   */
  setDimensions(dimensions: BoxDimensions) {
    this.dimensions = dimensions;
    if (this.svgElement) {
      this.updateSvg();
    }
  }
  
  /**
   * Get material name from thickness value
   */
  getMaterialName(thickness: number): string {
    const materials: Record<number, string> = {
      0.38: "Krome 225 gr",
      0.41: "Krome 250 gr",
      0.45: "Krome 300 gr",
      0.51: "Krome 350 gr",
      0.65: "Krome 400 gr",
      0.71: "Krome 450 gr",
      0.33: "Bristol 180 gr",
      0.35: "Bristol 200 gr",
      0.37: "Bristol 220 gr",
      0.39: "Bristol 240 gr",
      0.53: "Bristol 300 gr",
      0.6: "Bristol 330 gr",
      0.7: "Bristol 380 gr"
    };
    return materials[thickness] || `Material: ${thickness}mm`;
  }
  
  /**
   * Update SVG elements based on current dimensions
   */
  private updateSvg() {
    if (!this.svgElement || !this.dimensions) return;
    
    // Update dimension labels
    this.updateDimensionLabels();
    
    // Update box pattern elements
    this.updateBoxPattern();
    
    // Update material info text
    this.updateMaterialInfo();
  }
  
  /**
   * Update dimension labels in the SVG
   */
  private updateDimensionLabels() {
    if (!this.svgElement || !this.dimensions) return;
    
    // A dimension
    const aText = this.svgElement.querySelector('.markerParent.A + text');
    if (aText) {
      aText.textContent = `A (${this.dimensions.a})`;
    }
    
    // B dimension
    const bText = this.svgElement.querySelector('.markerParent.B + text');
    if (bText) {
      bText.textContent = `B (${this.dimensions.b})`;
    }
    
    // H dimension
    const hText = this.svgElement.querySelector('.markerParent.H + text');
    if (hText) {
      hText.textContent = `H (${this.dimensions.h})`;
    }
  }
  
  /**
   * Update box pattern with new dimensions
   */
  private updateBoxPattern() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { a, b, h } = this.dimensions;
    
    // Update the rectangle dimensions
    const rect = this.svgElement.querySelector('.gbody rect');
    if (rect) {
      // Calculate total width and height of the pattern
      const width = a * 3 + b * 2 + 40; // 40 is padding
      const height = h + 150; // 150 is padding
      
      rect.setAttribute('width', width.toString());
      rect.setAttribute('height', height.toString());
    }
    
    // Update the parent rect
    const parentRect = this.svgElement.querySelector('.rectParent');
    if (parentRect) {
      const width = a * 3 + b * 2 + 40;
      const height = h + 150;
      
      parentRect.setAttribute('width', width.toString());
      parentRect.setAttribute('height', height.toString());
    }
    
    // Update main horizontal lines
    this.updateHorizontalLines();
    
    // Update main vertical lines
    this.updateVerticalLines();
    
    // Update components based on feature type
    this.updateFeatureComponents();
  }
  
  /**
   * Update horizontal lines in the pattern
   */
  private updateHorizontalLines() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { a, b } = this.dimensions;
    
    // Get horizontal lines
    const hLines = this.svgElement.querySelectorAll('line[y1="123.5"][y2="123.5"]');
    
    // First line (from left, width a)
    if (hLines[0]) {
      hLines[0].setAttribute('x2', (35 + a).toString());
    }
    
    // Second line (middle, width b)
    if (hLines[1]) {
      hLines[1].setAttribute('x1', (35 + a).toString());
      hLines[1].setAttribute('x2', (35 + a + b).toString());
    }
    
    // Third line (right, width a)
    if (hLines[2]) {
      hLines[2].setAttribute('x1', (35 + a + b).toString());
      hLines[2].setAttribute('x2', (35 + a + b + a).toString());
    }
  }
  
  /**
   * Update vertical lines in the pattern
   */
  private updateVerticalLines() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { a, b, h } = this.dimensions;
    
    // Get vertical lines
    const vLines = this.svgElement.querySelectorAll('line[x1="35"][x2="35"], line[x1="155"][x2="155"], line[x1="235"][x2="235"], line[x1="355"][x2="355"]');
    
    // Update positions based on a and b
    if (vLines[1]) { // Second vertical line
      vLines[1].setAttribute('x1', (35 + a).toString());
      vLines[1].setAttribute('x2', (35 + a).toString());
    }
    
    if (vLines[2]) { // Third vertical line
      vLines[2].setAttribute('x1', (35 + a + b).toString());
      vLines[2].setAttribute('x2', (35 + a + b).toString());
    }
    
    if (vLines[3]) { // Fourth vertical line
      vLines[3].setAttribute('x1', (35 + a + b + a).toString());
      vLines[3].setAttribute('x2', (35 + a + b + a).toString());
    }
    
    // Update heights based on h
    vLines.forEach(line => {
      const y1 = parseFloat(line.getAttribute('y1') || "0");
      if (y1 < 200) { // Only for top section lines
        line.setAttribute('y2', (123.5 + h).toString());
      }
    });
  }
  
  /**
   * Update components specific to feature type (Normal, Aski, Dil, Parmak)
   */
  private updateFeatureComponents() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { featureType } = this.dimensions;
    
    // Hide all feature components first
    const components = this.svgElement.querySelectorAll('.cmp02, .cmp03, .cmp04, .cmp18, .cmp19');
    components.forEach(comp => {
      (comp as SVGElement).style.display = 'none';
    });
    
    // Show components based on feature type
    switch (featureType) {
      case 'Normal':
        // Show normal components
        this.svgElement.querySelectorAll('.cmp03, .cmp18').forEach(comp => {
          (comp as SVGElement).style.display = 'block';
        });
        break;
      case 'Aski':
        // Show hanger components
        this.svgElement.querySelectorAll('.cmp03, .cmp18, .cmp02').forEach(comp => {
          (comp as SVGElement).style.display = 'block';
        });
        this.updateAskiComponent();
        break;
      case 'Dil':
        // Show tongue components
        this.svgElement.querySelectorAll('.cmp03, .cmp18, .cmp19').forEach(comp => {
          (comp as SVGElement).style.display = 'block';
        });
        this.updateDilComponent();
        break;
      case 'Parmak':
        // Show finger components
        this.svgElement.querySelectorAll('.cmp03, .cmp18, .cmp04').forEach(comp => {
          (comp as SVGElement).style.display = 'block';
        });
        this.updateParmakComponent();
        break;
    }
  }
  
  /**
   * Update hanger specific component
   */
  private updateAskiComponent() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { askiType, m1, m4 } = this.dimensions;
    if (!askiType) return;
    
    // Get hanger elements
    const askiElements = this.svgElement.querySelectorAll('.cmp02 path');
    
    // Set paths based on askiType and m1/m4 dimensions
    // This would be implementation-specific based on the actual SVG structure
  }
  
  /**
   * Update tongue specific component
   */
  private updateDilComponent() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { dilType, d } = this.dimensions;
    if (!dilType) return;
    
    // Get tongue elements
    const dilElements = this.svgElement.querySelectorAll('.cmp19 path');
    
    // Set paths based on dilType and d dimension
    // This would be implementation-specific based on the actual SVG structure
  }
  
  /**
   * Update finger specific component
   */
  private updateParmakComponent() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { parmakType, r1 } = this.dimensions;
    if (!parmakType) return;
    
    // Get finger elements
    const parmakElements = this.svgElement.querySelectorAll('.cmp04 path');
    
    // Set paths based on parmakType and r1 dimension
    // This would be implementation-specific based on the actual SVG structure
  }
  
  /**
   * Update material info text
   */
  private updateMaterialInfo() {
    if (!this.svgElement || !this.dimensions) return;
    
    const materialName = this.getMaterialName(this.dimensions.materialThickness);
    const infoText = this.svgElement.querySelector('.fotterG .info');
    
    if (infoText) {
      infoText.textContent = `Dikkat ! Bu malzeme ${materialName} : ${this.dimensions.materialThickness} göre çizilmistir`;
    }
  }
  
  /**
   * Calculate derived dimensions based on main dimensions
   */
  static calculateDerivedDimensions(a: number, b: number): { z: number, f: number, g: number, c: number, r1: number, d: number } {
    // Z = (A+B) * 0.035
    const z = parseFloat(((a + b) * 0.035).toFixed(2));
    
    // F = (A+B) * 0.075
    const f = parseFloat(((a + b) * 0.075).toFixed(2));
    
    // C = (A+B) * 0.075
    const c = parseFloat(((a + b) * 0.075).toFixed(2));
    
    // R1 = (A+B) / 12
    const r1 = parseFloat(((a + b) / 12).toFixed(2));
    
    // D = A / 3.5
    const d = parseFloat((a / 3.5).toFixed(2));
    
    // G is calculated elsewhere with material thickness
    // Default to a value derived from f
    const g = parseFloat((f * 3).toFixed(2));
    
    return { z, f, g, c, r1, d };
  }
  
  /**
   * Calculate G value based on F, B and material thickness
   */
  static calculateGValue(f: number, b: number, materialThickness: number): number {
    const e = b - 1.5; // This is from the original code
    return parseFloat(((f + e + materialThickness) / 2).toFixed(2));
  }
  
  /**
   * Export the current SVG as a string
   */
  getSvgString(): string {
    if (!this.svgElement) return '';
    
    const clonedSvg = this.svgElement.cloneNode(true) as SVGElement;
    return new XMLSerializer().serializeToString(clonedSvg);
  }
  
  /**
   * Export the current SVG as a downloadable file
   */
  exportSvg(filename: string = 'box-pattern'): void {
    if (!this.svgElement) return;
    
    const svgString = this.getSvgString();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
