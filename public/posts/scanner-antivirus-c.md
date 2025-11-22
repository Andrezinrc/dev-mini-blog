---
id: "post_1762367228791"
title: "Desenvolvendo um Scanner de Antivírus em C"
description: "Conheça meu projeto de scanner de antivírus desenvolvido em C com detecção por assinatura e suporte a EICAR"
author: "André Moreira"
github: "Andrezinrc"
date: "2025-11-22"
image: "/assets/images/posts/scanner-antivirus-c/illustration.jpeg"
category: "projetos"
tags: ["c", "segurança", "antivirus", "programação", "scanner"]
published: true
---

# Desenvolvendo um Scanner de Antivírus em C

Estou desenvolvendo um scanner de antivírus em C como projeto para aprender mais sobre segurança cibernética e detecção de malwares. O projeto utiliza detecção por assinatura para identificar ameaças conhecidas.

## Como funciona

O scanner analisa arquivos procurando por padrões específicos (assinaturas) que identificam malware. A implementação inclui:

- **Sistema de regras**: Carrega assinaturas de malware de um arquivo de configuração
- **Detecção EICAR**: Suporte ao arquivo de teste padrão da indústria
- **Scanner recursivo**: Varre diretórios completos de forma eficiente
- **Filtros inteligentes**: Ignora diretórios desnecessários e foca em extensões suspeitas

## Características principais

```c
// Exemplo de assinatura EICAR para testes
uint8_t eicar_signature[EICAR_SIZE] = {
    0x58,0x35,0x4F,0x21,0x50,0x25,0x40,0x41,
    // ... padrão completo do EICAR
};
```

Funcionalidades implementadas

· Carregamento dinâmico de regras: Suporte a múltiplas assinaturas de malware
· Otimização de performance: Leitura em chunks com overlap para detectar padrões que cruzam blocos
· Diretórios ignorados: Evita scanear node_modules, .git, e outras pastas irrelevantes
· Extensões focadas: Analisa apenas arquivos com extensões potencialmente perigosas

Estrutura do projeto

O scanner é organizado em funções especializadas:

· load_signatures() - Carrega regras de detecção
· scan_file_rules() - Analisa arquivo individual
· scan_directory() - Varre diretórios recursivamente
· should_scan_file() - Filtra extensões relevantes

Próximos passos

Estou planejando adicionar:

· Suporte a arquivos compactados (ZIP, RAR)
· Detecção heurística básica
· Logging mais detalhado
· Interface de linha de comando mais amigável

Testando o scanner

O projeto inclui um sistema de testes com arquivos de exemplo, incluindo o padrão EICAR para validação do funcionamento.

É um projeto em andamento que tem sido excelente para aprender sobre baixo nível, segurança e processamento de arquivos em C!

---

O código completo está disponível no meu GitHub. Contribuições e sugestões são bem-vindas!