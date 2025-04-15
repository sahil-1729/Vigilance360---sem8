import { Suspense } from 'react';
import { getLatestCrimeNews } from '@/lib/blog-service';
import BlogList from '@/components/blog/blog-list';
import LoadingSpinner from '@/components/ui/loading-spinner';
import PageIllustration from '@/components/page-illustration';
import Header from '@/components/ui/header';
export const metadata = {
  title: "Crime News Blog - Vigilance360",
  description: "Latest crime-related news and articles in India",
};

async function BlogsContent() {
  const posts = await getLatestCrimeNews();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-white mb-2">Crime Watch India</h1>
        <p className="text-gray-400 mb-8">
          Stay informed about the latest crime-related news and security updates from across India
        </p>
        
        <BlogList posts={posts} />
      </div>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <>
    <Header/>
    <PageIllustration />
    <div className="min-h-screen text-white">
      <main className="pt-8 pb-16">
        <Suspense fallback={<div className="flex justify-center py-20"><LoadingSpinner size="large" /></div>}>
          <BlogsContent />
        </Suspense>
      </main>
    </div>
    </>
  );
} 