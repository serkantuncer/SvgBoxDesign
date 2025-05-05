import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { boxDesignSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = '/api';
  
  // Get all designs
  app.get(`${apiPrefix}/designs`, async (req, res) => {
    try {
      const designs = await storage.getAllDesigns();
      return res.json(designs);
    } catch (error) {
      console.error('Error fetching designs:', error);
      return res.status(500).json({ error: 'Failed to fetch designs' });
    }
  });
  
  // Get design by ID
  app.get(`${apiPrefix}/designs/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid design ID' });
      }
      
      const design = await storage.getDesignById(id);
      
      if (!design) {
        return res.status(404).json({ error: 'Design not found' });
      }
      
      return res.json(design);
    } catch (error) {
      console.error('Error fetching design:', error);
      return res.status(500).json({ error: 'Failed to fetch design' });
    }
  });
  
  // Create new design
  app.post(`${apiPrefix}/designs`, async (req, res) => {
    try {
      const validationResult = boxDesignSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid design data', 
          details: validationResult.error.errors 
        });
      }
      
      const design = await storage.createDesign(validationResult.data);
      return res.status(201).json(design);
    } catch (error) {
      console.error('Error creating design:', error);
      return res.status(500).json({ error: 'Failed to create design' });
    }
  });
  
  // Update design
  app.put(`${apiPrefix}/designs/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid design ID' });
      }
      
      const validationResult = boxDesignSchema.partial().safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid design data', 
          details: validationResult.error.errors 
        });
      }
      
      const existingDesign = await storage.getDesignById(id);
      
      if (!existingDesign) {
        return res.status(404).json({ error: 'Design not found' });
      }
      
      const updatedDesign = await storage.updateDesign(id, validationResult.data);
      return res.json(updatedDesign);
    } catch (error) {
      console.error('Error updating design:', error);
      return res.status(500).json({ error: 'Failed to update design' });
    }
  });
  
  // Delete design
  app.delete(`${apiPrefix}/designs/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid design ID' });
      }
      
      const existingDesign = await storage.getDesignById(id);
      
      if (!existingDesign) {
        return res.status(404).json({ error: 'Design not found' });
      }
      
      const deletedDesign = await storage.deleteDesign(id);
      return res.json(deletedDesign);
    } catch (error) {
      console.error('Error deleting design:', error);
      return res.status(500).json({ error: 'Failed to delete design' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
