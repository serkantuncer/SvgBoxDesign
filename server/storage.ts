import { db } from '@db';
import { designs } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { BoxDesign } from '@/types';

export const storage = {
  // Create a new design
  async createDesign(design: BoxDesign) {
    try {
      const [createdDesign] = await db.insert(designs).values({
        name: design.name,
        dimensions: design.dimensions,
        svg: design.svg,
      }).returning();
      
      return createdDesign;
    } catch (error) {
      console.error('Error creating design:', error);
      throw error;
    }
  },
  
  // Get all designs
  async getAllDesigns() {
    try {
      const allDesigns = await db.select().from(designs).orderBy(designs.createdAt);
      return allDesigns;
    } catch (error) {
      console.error('Error fetching designs:', error);
      throw error;
    }
  },
  
  // Get design by ID
  async getDesignById(id: number) {
    try {
      const design = await db.select().from(designs).where(eq(designs.id, id)).limit(1);
      return design[0] || null;
    } catch (error) {
      console.error('Error fetching design by ID:', error);
      throw error;
    }
  },
  
  // Update design
  async updateDesign(id: number, design: Partial<BoxDesign>) {
    try {
      const [updatedDesign] = await db.update(designs)
        .set({
          ...design,
          updatedAt: new Date(),
        })
        .where(eq(designs.id, id))
        .returning();
      
      return updatedDesign;
    } catch (error) {
      console.error('Error updating design:', error);
      throw error;
    }
  },
  
  // Delete design
  async deleteDesign(id: number) {
    try {
      const [deletedDesign] = await db.delete(designs)
        .where(eq(designs.id, id))
        .returning();
      
      return deletedDesign;
    } catch (error) {
      console.error('Error deleting design:', error);
      throw error;
    }
  }
};
