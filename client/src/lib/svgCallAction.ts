import { BoxDimensions, FeatureType } from "@/types";

/**
 * SVG Call Action - A utility to handle SVG manipulation for box patterns
 * Based on the original JavaScript functions from the reference site
 */
export class SvgCallAction {
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
    const materials: Record<string, string> = {
      "1": "Standart 1 mm",
      "1.5": "Standart 1.5 mm", 
      "2": "Standart 2 mm",
      "0.38": "Krome 225 gr",
      "0.41": "Krome 250 gr",
      "0.45": "Krome 300 gr",
      "0.51": "Krome 350 gr",
      "0.65": "Krome 400 gr",
      "0.71": "Krome 450 gr",
      "0.33": "Bristol 180 gr",
      "0.35": "Bristol 200 gr",
      "0.37": "Bristol 220 gr",
      "0.39": "Bristol 240 gr",
      "0.53": "Bristol 300 gr",
      "0.6": "Bristol 330 gr",
      "0.7": "Bristol 380 gr"
    };
    return materials[thickness.toString()] || `Material: ${thickness}mm`;
  }

  /**
   * Main function to update SVG based on dimensions
   * This is similar to the svgCall function in the original JavaScript
   */
  private updateSvg() {
    if (!this.svgElement || !this.dimensions) return;
    
    // Update dimension labels
    this.updateDimensionLabels();
    
    // Update SVG components based on dimensions
    this.updateSvgComponents();
    
    // Update feature-specific components
    this.updateFeatureComponents();
    
    // Update material info text
    this.updateMaterialInfo();
  }

  /**
   * Update dimension labels in the SVG
   */
  private updateDimensionLabels() {
    if (!this.svgElement || !this.dimensions) return;
    
    // A dimension
    const aText = this.svgElement.querySelector('text.markerParent.A');
    if (aText) {
      aText.textContent = `A (${this.dimensions.a})`;
    }
    
    // B dimension
    const bText = this.svgElement.querySelector('text.markerParent.B');
    if (bText) {
      bText.textContent = `B (${this.dimensions.b})`;
    }
    
    // H dimension
    const hText = this.svgElement.querySelector('text.markerParent.H');
    if (hText) {
      hText.textContent = `H (${this.dimensions.h})`;
    }
  }

  /**
   * Update SVG components based on dimensions
   */
  private updateSvgComponents() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { a, b, h } = this.dimensions;
    const gbody = this.svgElement.querySelector('g.gbody');
    
    if (gbody) {
      // Update rectangle width and height
      const rect = gbody.querySelector('rect');
      if (rect) {
        const width = a + b + a + 102; // Adjusted based on original pattern
        const height = h + 132;       // Adjusted based on original pattern
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
      }
      
      // Update the parent rect dimensions as well
      const parentRect = this.svgElement.querySelector('rect.rectParent');
      if (parentRect) {
        const width = a + b + a + 102;
        const height = h + 132;
        parentRect.setAttribute('width', width.toString());
        parentRect.setAttribute('height', height.toString());
      }
      
      // Update A dimension line position and length
      this.updateALine(a);
      
      // Update B dimension line position and length
      this.updateBLine(a, b);
      
      // Update H dimension line position and height
      this.updateHLine(a, b, h);
      
      // Update vertical lines positions
      this.updateVerticalLines(a, b);
      
      // Update horizontal lines lengths
      this.updateHorizontalLines(a, b);
    }
  }

  /**
   * Update A dimension line
   */
  private updateALine(a: number) {
    if (!this.svgElement) return;
    
    // Find the A dimension line
    const aLine = this.svgElement.querySelector('line.markerParent.A');
    if (aLine) {
      const x1 = 32.75;
      const x2 = x1 + a;
      const y = 187.25;
      
      aLine.setAttribute('x1', x1.toString());
      aLine.setAttribute('y1', y.toString());
      aLine.setAttribute('x2', x2.toString());
      aLine.setAttribute('y2', y.toString());
      
      // Also update A text position
      const aText = this.svgElement.querySelector('text.markerParent.A');
      if (aText) {
        aText.setAttribute('x', (x1 + a/2 - 15).toString());
        aText.setAttribute('y', (y - 5).toString());
      }
    }
  }

  /**
   * Update B dimension line
   */
  private updateBLine(a: number, b: number) {
    if (!this.svgElement) return;
    
    // Find the B dimension line
    const bLine = this.svgElement.querySelector('line.markerParent.B');
    if (bLine) {
      const x1 = 32.75 + a;
      const x2 = x1 + b;
      const y = 187.25;
      
      bLine.setAttribute('x1', x1.toString());
      bLine.setAttribute('y1', y.toString());
      bLine.setAttribute('x2', x2.toString());
      bLine.setAttribute('y2', y.toString());
      
      // Also update B text position
      const bText = this.svgElement.querySelector('text.markerParent.B');
      if (bText) {
        bText.setAttribute('x', (x1 + b/2 - 15).toString());
        bText.setAttribute('y', (y - 5).toString());
      }
    }
  }

  /**
   * Update H dimension line
   */
  private updateHLine(a: number, b: number, h: number) {
    if (!this.svgElement) return;
    
    // Find the H dimension line
    const hLine = this.svgElement.querySelector('line.markerParent.H');
    if (hLine) {
      const x = 32.75 + a + b + a + 25; // Position to the right of the pattern
      const y1 = 112.25;
      const y2 = y1 + h;
      
      hLine.setAttribute('x1', x.toString());
      hLine.setAttribute('y1', y1.toString());
      hLine.setAttribute('x2', x.toString());
      hLine.setAttribute('y2', y2.toString());
      
      // Also update H text position
      const hText = this.svgElement.querySelector('text.markerParent.H');
      if (hText) {
        hText.setAttribute('x', (x + 10).toString());
        hText.setAttribute('y', (y1 + h/2).toString());
      }
    }
  }

  /**
   * Update vertical lines positions
   */
  private updateVerticalLines(a: number, b: number) {
    if (!this.svgElement) return;
    
    // Left edge line
    const leftLine = this.svgElement.querySelector('line[x1="32.75"][x2="32.75"][stroke="#00ff00"]');
    if (leftLine) {
      // Position remains the same at x=32.75
    }
    
    // First vertical divider
    const firstDivider = this.svgElement.querySelector('line[x1="132.75"][x2="132.75"][stroke="#00ff00"]');
    if (firstDivider) {
      const x = 32.75 + a;
      firstDivider.setAttribute('x1', x.toString());
      firstDivider.setAttribute('x2', x.toString());
    }
    
    // Second vertical divider
    const secondDivider = this.svgElement.querySelector('line[x1="202.75"][x2="202.75"][stroke="#00ff00"]');
    if (secondDivider) {
      const x = 32.75 + a + b;
      secondDivider.setAttribute('x1', x.toString());
      secondDivider.setAttribute('x2', x.toString());
    }
    
    // Right edge line
    const rightLine = this.svgElement.querySelector('line[x1="302.75"][x2="302.75"][stroke="#00ff00"]');
    if (rightLine) {
      const x = 32.75 + a + b + a;
      rightLine.setAttribute('x1', x.toString());
      rightLine.setAttribute('x2', x.toString());
    }
  }

  /**
   * Update horizontal lines lengths
   */
  private updateHorizontalLines(a: number, b: number) {
    if (!this.svgElement) return;
    
    // Top horizontal line
    const topLine = this.svgElement.querySelector('line[y1="112.25"][y2="112.25"][stroke="#ff0000"]');
    if (topLine) {
      const x1 = 32.75;
      const x2 = x1 + a + b + a;
      topLine.setAttribute('x1', x1.toString());
      topLine.setAttribute('x2', x2.toString());
    }
    
    // Bottom horizontal line
    const bottomLine = this.svgElement.querySelector('line[y1="262.25"][y2="262.25"][stroke="#ff0000"]');
    if (bottomLine) {
      const x1 = 32.75;
      const x2 = x1 + a + b + a;
      bottomLine.setAttribute('x1', x1.toString());
      bottomLine.setAttribute('x2', x2.toString());
    }
  }

  /**
   * Update components for feature types (Normal, Aski, Dil, Parmak)
   */
  private updateFeatureComponents() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { featureType } = this.dimensions;
    
    // Hide all feature components first
    const components = this.svgElement.querySelectorAll('.cmp02, .cmp03, .cmp04');
    components.forEach(comp => {
      (comp as SVGElement).style.display = 'none';
    });
    
    // Show common components that appear in all versions
    this.svgElement.querySelectorAll('.cmp02, .cmp03').forEach(comp => {
      (comp as SVGElement).style.display = 'block';
    });
    
    // Show feature-specific components
    switch (featureType) {
      case 'Normal':
        // Default components are already shown
        break;
        
      case 'Aski':
        // Show hanger components
        this.updateAskiComponent();
        break;
        
      case 'Dil':
        // Show tongue components
        this.updateDilComponent();
        break;
        
      case 'Parmak':
        // Show finger components
        this.svgElement.querySelectorAll('.cmp04').forEach(comp => {
          (comp as SVGElement).style.display = 'block';
        });
        this.updateParmakComponent();
        break;
    }
  }

  /**
   * Update hanger (Aski) specific components
   */
  private updateAskiComponent() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { askiType, m1 = 30, m4 = 20 } = this.dimensions;
    if (!askiType || askiType === 1) return; // No hanger
    
    // Implementation would depend on the specific SVG structure for hangers
    // This would need to be customized based on the actual SVG components
  }

  /**
   * Update tongue (Dil) specific components
   */
  private updateDilComponent() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { dilType, d = 0 } = this.dimensions;
    if (!dilType || dilType === 1) return; // No tongue
    
    // Implementation would depend on the specific SVG structure for tongues
    // This would need to be customized based on the actual SVG components
  }

  /**
   * Update finger (Parmak) specific components
   */
  private updateParmakComponent() {
    if (!this.svgElement || !this.dimensions) return;
    
    const { parmakType, r1 = 0 } = this.dimensions;
    if (!parmakType || parmakType === 1) return; // No finger
    
    // Display finger component (.cmp04)
    const fingerComponent = this.svgElement.querySelector('.cmp04');
    if (fingerComponent) {
      (fingerComponent as SVGElement).style.display = 'block';
    }
  }

  /**
   * Update material info text
   */
  private updateMaterialInfo() {
    if (!this.svgElement || !this.dimensions) return;
    
    const materialName = this.getMaterialName(this.dimensions.materialThickness);
    const infoText = this.svgElement.querySelector('.fotterG .info');
    
    if (infoText) {
      infoText.textContent = `Dikkat ! Bu malzeme ${materialName} göre çizilmistir`;
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
    const e = b - 1.5; // This is from the original JS code
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
   * Apply an SVG template to the current SVG element
   */
  applySvgTemplate(svgTemplate: string) {
    if (!this.svgElement) return;
    
    // Find the content group where the template should be inserted
    const contentGroup = this.svgElement.querySelector('g.ParetSvgContent');
    if (!contentGroup) return;
    
    // Create a temporary div to parse the SVG template
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgTemplate;
    
    // Clear existing content
    while (contentGroup.firstChild) {
      contentGroup.removeChild(contentGroup.firstChild);
    }
    
    // Create the gbody wrapper
    const gbodyWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gbodyWrapper.classList.add('gbody');
    gbodyWrapper.setAttribute('parentx', '20');
    gbodyWrapper.setAttribute('parenty', '30');
    gbodyWrapper.setAttribute('mx', '1');
    gbodyWrapper.setAttribute('my', '1');
    
    // Create the base rectangle
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '20');
    rect.setAttribute('y', '30');
    rect.setAttribute('width', '351.75');
    rect.setAttribute('height', '314.5');
    gbodyWrapper.appendChild(rect);
    
    // Move all template elements to the gbody wrapper
    while (tempDiv.firstChild) {
      gbodyWrapper.appendChild(tempDiv.firstChild);
    }
    
    // Add the gbody wrapper to the content group
    contentGroup.appendChild(gbodyWrapper);
    
    // Update the SVG with current dimensions
    if (this.dimensions) {
      this.updateSvg();
    }
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