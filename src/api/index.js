const API_BASE = '/data';

export const blogAPI = {
  async getPostsList() {
    const response = await fetch(`${API_BASE}/posts-list.json`);
    return response.json();
  },
 
  async getPostById(id) {
    const cleanId = id.replace(/"/g, '');
    const response = await fetch(`${API_BASE}/post-${cleanId}.json`);
    return response.json();
  },
 
  async getAllPosts() {
    const response = await fetch(`${API_BASE}/blog.json`);
    return response.json();
  },
 
  async getAllTags() {
    const response = await fetch(`${API_BASE}/blog.json`);
    const data = await response.json();
    
    const tagsCount = {};
    data.posts.forEach(post => {
      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach(tag => {
          tagsCount[tag] = (tagsCount[tag] || 0) + 1;
        });
      }
    });
    
    return {
      tags: Object.entries(tagsCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    };
  },
  
  async getPostsByTag(tagName) {
    const response = await fetch(`${API_BASE}/blog.json`);
    const data = await response.json();
    
    const filteredPosts = data.posts.filter(post =>
      post.frontmatter.tags &&
      post.frontmatter.tags.includes(tagName)
    );
    
    return {
      tag: tagName,
      posts: filteredPosts
    };
  }
};