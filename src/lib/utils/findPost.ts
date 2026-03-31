import { getAllPosts, Post } from '../content';

export async function findPost(query: string): Promise<Post | undefined> {
    const posts = await getAllPosts();
    
    // Normalize query (e.g., handles "My Note" or "folder/My Note")
    const decodedQuery = decodeURIComponent(query).trim();
    
    return posts.find(post => {
        // 1. Match exact slug path
        if (post.meta.slug === decodedQuery) return true;
        
        // 2. Match exact title
        if (post.meta.title === decodedQuery) return true;
        
        // 3. Match basename (filename without folder path)
        const slugParts = post.meta.slug.split('/');
        const basename = slugParts[slugParts.length - 1];
        if (basename === decodedQuery) return true;
        
        return false;
    });
}
