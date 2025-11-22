const fs = require('fs');
const path = require('path');

function generateId() {
  return `post_${Date.now()}`;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function createNewPost(title) {
  try {
    const id = generateId();
    const slug = generateSlug(title);
    const filename = `${slug}.md`;
    const filePath = path.join(process.cwd(), 'public/posts', filename);
    
    //console.log('Tentando criar post...');
    //console.log('Titulo:', title);
    //console.log('Slug:', slug);
    //console.log('Caminho completo:', filePath);
    
    const frontmatter = `---
      id: "${id}"
      title: "${title}"
      slug: "${slug}"
      description: "Descricao breve do post..."
      author: "Seu nome"
      github: "Usuario-github"
      date: "${new Date().toISOString().split('T')[0]}"
      image: "/ima/posts/${slug}/exemplo.jpg"
      category: "tutorial"
      tags: ["exemplo"]
      published: false
    ---
      
    # ${title}
    
    ![Imagem de capa](/images/posts/${slug}/exemplo.jpg)
      
    Comece a escrever seu post aqui...
    
    ## Recursos Úteis
    
    - [Documentação do React](https://reactjs.org)
    - [MDN Web Docs](https://developer.mozilla.org)
    
    ---
      
    *Post criado em ${new Date().toLocaleDateString('pt-BR')}*
    `;
   
    const postsDir = path.dirname(filePath);
    console.log('Diretorio dos posts:', postsDir);
    
    if (!fs.existsSync(postsDir)) {
      console.log('Criando diretorio...');
      fs.mkdirSync(postsDir, { recursive: true });
      console.log('Diretorio criado com sucesso');
    } else {
      console.log('Diretorio ja existe');
    }
    
    console.log('Escrevendo arquivo...');
    fs.writeFileSync(filePath, frontmatter, 'utf8');
    console.log('Arquivo escrito com sucesso');
   
    if (fs.existsSync(filePath)) {
      console.log('SUCESSO: Post criado:', filename);
      console.log('Localizacao: public/posts/', filename);
      console.log('\n Lembrete: Atualize os campos:');
      console.log('   - author: "Seu Nome Real"');
      console.log('   - github: "seu-username"');
      console.log('   - description: "Descrição atrativa"');
      console.log('   - published: true (quando estiver pronto)');
    } else {
      console.log('ERRO: Arquivo nao foi criado');
    }
    
    return id;
    
  } catch (error) {
    console.log('Erro durante criacao do post:');
    console.log('Mensagem:', error.message);
    console.log('Stack:', error.stack);
    throw error;
  }
}

const title = process.argv[2];
if (!title) {
  console.log('Erro: Titulo do post nao fornecido');
  console.log('Uso: node scripts/create-post.js "Meu Titulo do Post"');
  process.exit(1);
}

try {
  console.log('Iniciando criacao do post...');
  createNewPost(title);
  console.log('Processo finalizado');
} catch (error) {
  console.log('Falha ao executar script');
  process.exit(1);
}