import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { getLatestCrimeNews, BlogPost } from '@/lib/blog-service';

export default async function HomeBlogSection() {
  const allPosts = await getLatestCrimeNews();
  // Only show the latest 3 posts
  const featuredPosts = allPosts.slice(0, 3);

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
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Latest Insights
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Crime News & Updates
            </h2>
            <p className="text-lg text-indigo-200/65">
              Stay informed with the latest crime-related news and security updates from across India
            </p>
          </div>
          
          {/* Blog posts grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px]"
              >
                {/* Article image */}
                <div className="relative h-48 overflow-hidden">
                  {post.image ? (
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                      className="object-cover"
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
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
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
                </div>
              </article>
            ))}
          </div>
          
          {/* View all link */}
          <div className="text-center mt-10">
            <Link 
              href="/blogs" 
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              View All Articles
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 