import React from "react";
import styles from "./Projects.module.css";

const projects = [
  {
    title: "adr86 — Emulador x86 em C",
    description: "Emulador de CPU x86 com execução de instruções, flags e ciclo fetch–decode–execute.",
    github: "https://github.com/Andrezinrc/adr86"
  },
  {
    title: "huffman — Compressão",
    description: "Implementação completa do algoritmo de Huffman com encode/decode e formato .adr",
    github: "https://github.com/Andrezinrc/huffman"
  },
  {
    title: "adr_scan — Scanner de Assinaturas",
    description: "Scanner de segurança para detectar padrões binários suspeitos via regras customizadas.",
    github: "https://github.com/Andrezinrc/adr_scan"
  },
  {
    title: "mycrypt — Criptografia modular (XOR-like) para aprendizado",
    description: "Criptografia de arquivos com cabeçalho e geração de chave.",
    github: "https://github.com/Andrezinrc/mycrypt"
  }
];

export default function Projects() {
  return (
    <div className={styles.container}>
      {projects.map((p, idx) => (
        <div className={styles.projectItem} key={idx}>
          <div className={styles.title}>{p.title}</div>
          <div className={styles.description}>{p.description}</div>
          <a className={styles.button} href={p.github} target="_blank" rel="noopener noreferrer">
            Ver no GitHub
          </a>
        </div>
      ))}
    </div>
  );
}