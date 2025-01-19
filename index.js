const express = require("express");
const bodyParser = require("body-parser");

const app = express;
const port = 3000;

app.request(bodyParser.json());

let temas = [];
let categorias = [];

// 3. /autor retorna HTML ou JSON com base no cabeçalho "accept".
app.get("/autor", (req, res) => {
  if (req.headers.accept === "application/json") {
    res.json({ autor: "Ataslan Monteiro", descricao: "Desenvolvedor Web" });
  } else {
    res.send(`
      <html>
        <body>
          <h1>Autor: Ataslan Monteiro</h1>
          <p>Descrição: Desenvolvedor Web</p>
        </body>
      <html>
    `);
  }
});

// 4. Endpoints RESTful para "tema".
app.get("/tema", (req, res) => res.json(temas));
app.post("/tema", (req, res) => {
  const tema = req.body;
  temas.push(tema);
  res.status(201).json(tema);
});
app.put("/tema/:id", (req, res) => {
  const { id } = req.params;
  const temaIndex = temas.findIndex((t) => t.id === parseInt(id));
  if (temaIndex >= 0) {
    temas[temaIndex] = req.body;
    res.json(temas[temaIndex]);
  } else {
    res.status(404).json({ error: "Tema não encontrado" });
  }
});
app.delete("/tema/:id", (req, res) => {
  const { id } = req.params;
  temas = temas.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

// 5. Endpoints RESTful para "categorias".
app.get("/categorias", (req, res) => res.json(categorias));
app.post("/categorias", (req, res) => {
  const categoria = req.body;
  categorias.push(categoria);
  res.status(201).json(categoria);
});
app.put("/categorias/:id", (req, res) => {
  const { id } = req.params;
  const categoriaIndex = categorias.findIndex((c) => c.id === parseInt(id));
  if (categoriaIndex >= 0) {
    categorias[categoriaIndex] = req.body;
    res.json(categorias[categoriaIndex]);
  } else {
    res.status(404).json({ error: "Categoria não encontrada" });
  }
});
app.delete("/categorias/:id", (req, res) => {
  const { id } = req.params;
  categorias = categorias.filter((c) => c.id !== parseInt(id));
  res.status(204).send();
});

// Inicia o servidor.
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
