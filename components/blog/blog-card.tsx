'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog-service';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Format the date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div key={post.id} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px]">
      {/* Article image */}
      <div key={post.id} className="relative h-48 overflow-hidden">
        {post.image ? (  
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-slate-700');
                parent.classList.add('flex');
                parent.classList.add('items-center');
                parent.classList.add('justify-center');
                const span = document.createElement('span');
                span.className = 'text-slate-500 font-medium';
                span.textContent = 'No Image Available';
                parent.appendChild(span);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
            <span className="text-slate-500 font-medium">No Image Available</span>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.description}
        </p>
        
        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-400 text-xs">
            <Clock size={14} className="mr-1" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <Link 
            href={`${post.source.url}`}
            target='_blank' 
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center"
          >
            Read More
          </Link>
        </div>
        
        {/* Source */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <span className="text-xs text-gray-500">
            Source: {post.source.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 