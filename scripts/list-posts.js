const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'public/posts');

function listPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('Nenhum post encontrado.');
    return;
  }
  
  const postFiles = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  
  if (postFiles.length === 0) {
    console.log('Nenhum post encontrado.');
    return;
  }
  
  console.log('\nPosts disponíveis:');
  postFiles.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const idMatch = content.match(/id:\s*"([^"]+)"/);
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      
      if (idMatch && titleMatch) {
        console.log(`  ${idMatch[1]} - ${titleMatch[1]} (${file})`);
      }
    } catch (error) {
      console.log(`  Erro ao ler: ${file}`);
    }
  });
}
listPosts();