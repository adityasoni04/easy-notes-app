import prisma from '../config/db.js';
import { generateEmbedding } from '../services/aiService.js';

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const vector = await generateEmbedding(`${title} ${content}`);
    const note = await prisma.note.create({
      data: {
        title,
        content,
        embedding: vector,
        userId: req.user.id
      }
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({ 
      where: { userId: req.user.id },
      select: { 
        id: true, 
        title: true, 
        content: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const searchNotes = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Search query required" });

  try {
    const queryVector = await generateEmbedding(q);
    const results = await prisma.note.aggregateRaw({
      pipeline: [
        {
          "$vectorSearch": {
            "index": "vector_index",
            "path": "embedding",
            "queryVector": queryVector,
            "numCandidates": 100,
            "limit": 5
          }
        },
        { "$match": { "userId": { "$oid": req.user.id } } },
        { "$project": { "embedding": 0 } }
      ]
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "AI search failed" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const vector = await generateEmbedding(`${title} ${content}`);

    const updatedNote = await prisma.note.update({
      where: { 
        id: id,
        userId: req.user.id
      },
      data: {
        title,
        content,
        embedding: vector
      }
    });

    res.json(updatedNote);
  } catch (err) {
    res.status(404).json({ error: "Note not found or unauthorized" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.note.delete({
      where: { 
        id: id,
        userId: req.user.id
      }
    });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "Note not found or unauthorized" });
  }
};