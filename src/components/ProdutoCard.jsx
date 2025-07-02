import React from "react";

/**
 * Componente que exibe nome, preço, descrição de um produto.
 * Recebe todas as infos via props para ser reutilizável.
 */
export function ProdutoCard({ nome, preco, descricao }) {
  return (
    <div className="produto-card">
      {/* Exibe a imagem do produto */}
      <h2 className="produto-card__nome">{nome}</h2>
      <p className="produto-card__descricao">{descricao}</p>
      <p className="produto-card__preco">R$ {preco.toFixed(2)}</p>
    </div>
  );
}
