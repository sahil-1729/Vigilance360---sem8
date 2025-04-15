import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestCrimeNews, getNewsById } from '@/lib/blog-service';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Generate static parameters for all blog posts
export async function generateStaticParams() {
  const posts = await getLatestCrimeNews();
  return posts.map((post) => ({
    id: post.id,
  }));
}


async function BlogPostContent({ id }: { id: string }) {
  const post = await getNewsById(id);
  
  if (!post) {
    notFound();
  }
  
  // Format the date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        {/* Back button */}
        <Link href="/blogs" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to all articles
        </Link>
        
        {/* Article header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium mr-3">
              {post.category}
            </span>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-xl text-gray-300 leading-relaxed">{post.description}</p>
        </div>
        
        {/* Featured image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden relative" style={{ height: '400px' }}>
            <Image 
              src={post.image} 
              alt={post.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Article content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
        </div>
        
        {/* Source and share */}
        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-400">
          <div className="mb-4 sm:mb-0">
            <span>Source: </span>
            <a 
              href={post.source.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-400 hover:text-indigo-300 inline-flex items-center"
            >
              {post.source.name}
              <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Share this article:</span>
            <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="pt-8 pb-16">
        <Suspense fallback={<div className="flex justify-center py-20"><LoadingSpinner size="large" /></div>}>
          <BlogPostContent id={params.id} />
        </Suspense>
      </main>
    </div>
  );
} 