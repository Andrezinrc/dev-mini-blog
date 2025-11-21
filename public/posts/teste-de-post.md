---
id: "post_1762367228789"
title: "Olá Mundo - Meu Primeiro Post"
description: "Primeiro post de teste do blog estático com markdown e JSON"
author: "André Moreira"
github: "Andrezinrc"
date: "2025-11-20"
category: "tutorial"
tags: ["blog", "markdown"]
published: true
---

# Olá Mundo - Meu Primeiro Post

Este é o primeiro post de teste
## Como funciona

- Posts escritos em **markdown** com frontmatter
- Scripts JavaScript geram **JSON estático**
- Deploy na **Vercel** como site estático

## Exemplo de código

```javascript
// Script que gera os JSONs
function generateBlogData() {
  const posts = getAllMarkdownPosts();
  return { posts, lastUpdated: new Date() };
}