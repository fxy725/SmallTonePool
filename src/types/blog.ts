export interface Post {
    slug: string;
    title: string;
    date: string;
    updated?: string;
    summary: string;
    content: string;
    tags: string[];
    readingTime?: number;
}

export interface Tag {
    name: string;
    count: number;
}

export interface SearchResult {
    post: Post;
    score: number;
}
