const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'public/posts');

function getAllPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
}

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return frontmatter;
}

function deletePostById(postId) {
  const postFiles = getAllPostFiles();
  
  for (const file of postFiles) {
    const filePath = path.join(POSTS_DIR, file);
    try {
      const frontmatter = parseFrontmatter(filePath);
      if (frontmatter && frontmatter.id === postId) {
        fs.unlinkSync(filePath);
        console.log(`Post deletado: ${file}`);
        return true;
      }
    } catch (error) {
      continue;
    }
  }
  
  console.log(`Post com ID "${postId}" nao encontrado`);
  return false;
}

const postId = process.argv[2];
if (!postId) {
  console.log('Uso: node scripts/delete-post.js "post_123456789"');
  process.exit(1);
}
deletePostById(postId);