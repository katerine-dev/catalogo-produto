// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { ProdutoCard } from "../components/ProdutoCard";

export default function Home() {
  // estados principais
  const [produtos, setProdutos] = useState([]); // lista de produtos
  const [loading, setLoading] = useState(true); // feedback de carregamento

  // estados do formulário controlado
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  // base da sua API e recurso
  const API_BASE = "https://crudcrud.com/api/1668bf15baca4bb7ad3ec5be2c5b16cf";
  const RESOURCE = "products";

  // useEffect para simular GET /products
  useEffect(() => {
    fetch(`${API_BASE}/${RESOURCE}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        return res.json();
      })
      .then((data) => {
        setProdutos(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Não foi possível carregar os produtos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // handler do submit do form: POST + atualização de estado
  function handleSubmit(e) {
    e.preventDefault(); // evita reload

    // validação simples
    if (!nome.trim() || !preco || !descricao.trim()) {
      return alert("Por favor, preencha nome, preço e descrição");
    }

    const novoProduto = {
      nome,
      preco: parseFloat(preco),
      descricao,
      // imagem opcional — se quiser, adicione campo no form
      imagem: "/assets/placeholder.png",
    };

    // POST na API
    fetch(`${API_BASE}/${RESOURCE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao criar produto");
        return res.json();
      })
      .then((created) => {
        // adiciona o produto retornado (com _id) na lista local
        setProdutos((prev) => [...prev, created]);
        // limpa campos do form
        setNome("");
        setPreco("");
        setDescricao("");
      })
      .catch((err) => {
        console.error(err);
        alert("Não foi possível adicionar o produto");
      });
  }

  if (loading) {
    return <p>Carregando catálogo…</p>;
  }

  return (
    <div className="home">
      <h1>Catálogo de Produtos</h1>

      {/* Formulário controlado para adicionar produto */}
      <form onSubmit={handleSubmit} className="home__form">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      {/* Grade de produtos */}
      <div className="home__grid">
        {produtos.map((prod) => (
          <ProdutoCard
            key={prod._id} // CrudCrud usa _id
            nome={prod.nome}
            preco={prod.preco}
            descricao={prod.descricao}
            imagem={prod.imagem}
          />
        ))}
      </div>
    </div>
  );
}
