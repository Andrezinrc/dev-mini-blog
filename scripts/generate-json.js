const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(process.cwd(), 'public/posts');

function getAllPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    return [];
  }
  return fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
}

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(filePath, '.md');
  
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error(`Formato markdown invalido: ${filePath}`);
  }
  
  const frontmatterRaw = match[1];
  const postContent = match[2];
  
  const frontmatter = {};
  frontmatterRaw.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
     
      if (value === 'true' || value === 'false') {
        frontmatter[key.trim()] = value === 'true';
      } else if (!isNaN(Number(value)) && value !== '') {
        frontmatter[key.trim()] = Number(value);
      } else if (key.trim() === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        
        try {
          frontmatter[key.trim()] = JSON.parse(value);
        } catch (error) {
          frontmatter[key.trim()] = value;
        }
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  });
  
  return {
    frontmatter,
    content: postContent.trim(),
    slug
  };
}

function generateBlogData() {
  const postFiles = getAllPostFiles();
  const posts = [];
  
  postFiles.forEach(file => {
    try {
      const filePath = path.join(POSTS_DIR, file);
      const post = parseMarkdownFile(filePath);
      
      if (post.frontmatter.published !== false) {
        posts.push(post);
      }
    } catch (error) {
      console.warn(`Aviso: Erro ao processar ${file}:`, error.message);
    }
  });
  
  posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
  
  return {
    posts,
    lastUpdated: new Date().toISOString(),
    totalPosts: posts.length
  };
}

// Gera todos os arquivos JSON
function generateAllJsonFiles() {
  const blogData = generateBlogData();
  const outputDir = path.join(process.cwd(), 'public', 'data');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'blog.json'),
    JSON.stringify(blogData, null, 2)
  );
  
  blogData.posts.forEach(post => {
    const postId = post.frontmatter.id || post.slug;
    const cleanId = postId.replace(/"/g, '');
    
    fs.writeFileSync(
      path.join(outputDir, `post-${cleanId}.json`),
      JSON.stringify(post, null, 2)
    );
  });
  
  const simplifiedPosts = blogData.posts.map(post => ({
    id: post.frontmatter.id,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    author: post.frontmatter.author,
    github: post.frontmatter.github,
    date: post.frontmatter.date,
    category: post.frontmatter.category,
    tags: post.frontmatter.tags,
    slug: post.slug
  }));
  
  fs.writeFileSync(
    path.join(outputDir, 'posts-list.json'),
    JSON.stringify({ posts: simplifiedPosts }, null, 2)
  );
  
  console.log(`Gerados ${blogData.posts.length} posts em:`);
  console.log(`  public/data/blog.json`);
  console.log(`  public/data/posts-list.json`);
  console.log(`  public/data/post-*.json (${blogData.posts.length} arquivos)`);
}
generateAllJsonFiles();