import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUOTES_FILE = path.join(process.cwd(), "quotes.json");

// Helper to load quotes from local JSON file
function loadQuotes(): any[] {
  try {
    if (fs.existsSync(QUOTES_FILE)) {
      const data = fs.readFileSync(QUOTES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading quotes.json, falling back to empty:", error);
  }
  return [];
}

// Helper to save quotes to local JSON file
function saveQuotes(quotes: any[]) {
  try {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing quotes.json:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Seed default quotes if file is empty or missing, so the admin dashboard has some demo data to start with!
  const currentQuotes = loadQuotes();
  if (currentQuotes.length === 0) {
    const seedQuotes = [
      {
        id: "quote_seed_1",
        name: "Carlos Mendoza",
        email: "carlos.m@example.com",
        phone: "5512345678",
        services: ["Diseño de Logotipo", "Página Web (5 pág.)"],
        parameters: { pagesCount: 5, itemsCount: 20, userRoleCount: 3 },
        total: 5700,
        message: "Hola, me interesa iniciar con la identidad y el sitio web de mi nueva veterinaria.",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: "Contactado"
      },
      {
        id: "quote_seed_2",
        name: "Sofía Rodríguez",
        email: "sofia.rod@example.com",
        phone: "5698765432",
        services: ["Tienda en Línea (30 prod.)"],
        parameters: { pagesCount: 5, itemsCount: 30, userRoleCount: 3 },
        total: 6000,
        message: "Quiero vender ropa artesanal en línea, necesito pasarela de pagos integrada.",
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        status: "Nuevo"
      }
    ];
    saveQuotes(seedQuotes);
  }

  // API Route: Admin login
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "harold.anguiano" && password === "Hdfk#1970") {
      res.json({ success: true, token: "admin_token_appdesign_2026" });
    } else {
      res.status(401).json({ success: false, error: "Credenciales incorrectas" });
    }
  });

  // API Route: Submit new quote request
  app.post("/api/quotes", (req, res) => {
    try {
      const { name, email, phone, services, parameters, total, message } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Nombre y Correo son obligatorios" });
      }

      const quotes = loadQuotes();
      const newQuote = {
        id: "quote_" + Math.random().toString(36).substring(2, 11),
        name,
        email,
        phone: phone || "",
        services: services || [],
        parameters: parameters || {},
        total: Number(total) || 0,
        message: message || "",
        date: new Date().toISOString(),
        status: "Nuevo"
      };

      quotes.unshift(newQuote); // Put newest on top
      saveQuotes(quotes);

      res.status(201).json({ success: true, quote: newQuote });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Get all quotes
  app.get("/api/quotes", (req, res) => {
    try {
      const quotes = loadQuotes();
      res.json(quotes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Update quote status
  app.patch("/api/quotes/:id/status", (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const quotes = loadQuotes();
      const idx = quotes.findIndex((q) => q.id === id);
      if (idx !== -1) {
        quotes[idx].status = status;
        saveQuotes(quotes);
        return res.json({ success: true, quote: quotes[idx] });
      }
      res.status(404).json({ error: "Cotización no encontrada" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Delete a quote
  app.delete("/api/quotes/:id", (req, res) => {
    try {
      const { id } = req.params;
      const quotes = loadQuotes();
      const filtered = quotes.filter((q) => q.id !== id);
      
      if (filtered.length !== quotes.length) {
        saveQuotes(filtered);
        return res.json({ success: true });
      }
      res.status(404).json({ error: "Cotización no encontrada" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware setup for dev vs prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
