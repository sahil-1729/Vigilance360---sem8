// Real-time news data for crime-related articles
// Using News API (https://newsapi.org)

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  image?: string;
  url: string;
  category: string;
};

// For fallback in case API fails
const mockCrimeNews: BlogPost[] = [
  {
    id: '1',
    title: 'Police Arrest Gang Members in Mumbai Drug Bust Operation',
    description: 'Mumbai police conducted a major operation leading to the arrest of 5 members of a drug trafficking network.',
    content: 'The Mumbai Police Department announced a successful operation that resulted in the arrest of five individuals allegedly involved in a major drug trafficking network. The operation, which was conducted in collaboration with the Narcotics Control Bureau, led to the seizure of over 50 kilograms of illegal substances valued at approximately ₹20 crore. The suspects were apprehended following a three-month investigation that involved surveillance and undercover operations.',
    publishedAt: '2023-11-10T09:30:00Z',
    source: {
      name: 'Mumbai Times',
      url: 'https://example.com/mumbai-times'
    },
    image: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?q=80&w=2942&auto=format&fit=crop',
    url: 'https://example.com/article1',
    category: 'Crime'
  },
  {
    id: '2',
    title: 'Cybercrime Unit Dismantles Major Phishing Operation in Bangalore',
    description: 'Bangalore Cybercrime Division has successfully taken down a sophisticated phishing operation targeting banking customers.',
    content: 'The Cybercrime Division of Bangalore Police has successfully dismantled a sophisticated phishing operation that was targeting banking customers across multiple financial institutions. The operation, which had been running for nearly six months, reportedly compromised thousands of accounts and resulted in fraudulent transactions totaling over ₹5 crore. Four individuals, all in their late twenties with backgrounds in computer science, have been arrested in connection with the scheme.',
    publishedAt: '2023-11-08T14:15:00Z',
    source: {
      name: 'Tech Security Daily',
      url: 'https://example.com/tech-security'
    },
    image: 'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=2840&auto=format&fit=crop',
    url: 'https://example.com/article2',
    category: 'Cybercrime'
  },
  {
    id: '3',
    title: 'Delhi Police Launch New Initiative to Combat Street Crime',
    description: 'A new community-based policing program aims to reduce street crimes in high-risk areas of Delhi.',
    content: 'The Delhi Police Department has unveiled a new community-based policing initiative aimed at reducing street crimes in high-risk areas of the city. The program, called "Secure Streets Initiative," will involve increased police presence, installation of CCTV cameras, and collaboration with local residents and business owners. The initiative comes in response to a reported 15% increase in street crimes over the past year, according to official statistics released by the department.',
    publishedAt: '2023-11-05T11:45:00Z',
    source: {
      name: 'Delhi Chronicle',
      url: 'https://example.com/delhi-chronicle'
    },
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2940&auto=format&fit=crop',
    url: 'https://example.com/article3',
    category: 'Security'
  },
  {
    id: '4',
    title: 'Supreme Court Orders Review of Anti-Corruption Legislation',
    description: 'India\'s Supreme Court has mandated a comprehensive review of current anti-corruption laws to address implementation gaps.',
    content: 'The Supreme Court of India has issued a directive for a comprehensive review of the country\'s anti-corruption legislation, citing concerns about implementation gaps and enforcement challenges. The order, which came during a hearing on a public interest litigation case, requires the Central Government to establish a committee of experts to evaluate existing laws and recommend amendments within six months. Justice Sharma noted during the proceedings that while India has robust anti-corruption laws on paper, their effective implementation remains a significant challenge.',
    publishedAt: '2023-11-02T16:20:00Z',
    source: {
      name: 'Legal Affairs India',
      url: 'https://example.com/legal-affairs'
    },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2940&auto=format&fit=crop',
    url: 'https://example.com/article4',
    category: 'Legal'
  },
  {
    id: '5',
    title: 'New Forensic Lab Inaugurated in Chennai to Expedite Criminal Investigations',
    description: 'State-of-the-art forensic facility opens in Chennai with advanced capabilities for DNA analysis and digital forensics.',
    content: 'A new state-of-the-art forensic laboratory has been inaugurated in Chennai with the aim of expediting criminal investigations across the southern region. The facility, which cost approximately ₹120 crore to develop, features advanced capabilities for DNA analysis, digital forensics, ballistics testing, and toxicology screening. Officials state that the lab will be able to process evidence up to three times faster than existing facilities, potentially reducing the backlog of cases awaiting forensic analysis by as much as 40% within the first year of operation.',
    publishedAt: '2023-10-30T10:10:00Z',
    source: {
      name: 'Science & Tech Today',
      url: 'https://example.com/science-tech'
    },
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2832&auto=format&fit=crop',
    url: 'https://example.com/article5',
    category: 'Forensics'
  },
  {
    id: '6',
    title: 'Financial Fraud Ring Busted in Kolkata, ₹50 Crore Seized',
    description: 'Authorities have arrested 7 individuals involved in an elaborate financial fraud scheme targeting senior citizens.',
    content: 'Authorities in Kolkata have busted a major financial fraud operation, resulting in the arrest of seven individuals and the seizure of assets valued at approximately ₹50 crore. The group allegedly targeted senior citizens through an elaborate scheme involving fake investment opportunities that promised unrealistically high returns. The investigation revealed that the operation had been running for over two years and had victimized more than 200 people across West Bengal and neighboring states. The Economic Offenses Wing of Kolkata Police led the investigation with assistance from the Enforcement Directorate.',
    publishedAt: '2023-10-28T08:45:00Z',
    source: {
      name: 'Financial Times India',
      url: 'https://example.com/financial-times'
    },
    image: 'https://images.unsplash.com/photo-1607944024060-0450380ddd33?q=80&w=2787&auto=format&fit=crop',
    url: 'https://example.com/article6',
    category: 'Financial Crime'
  }
];

// Helper function to transform News API response to our app format
function transformToAppFormat(apiArticle: any): BlogPost {
  return {
    id: apiArticle.url 
      ? encodeURIComponent(apiArticle.url).substring(0, 10) + '_' + Math.random().toString(36).substring(2, 7)
      : Math.random().toString(36).substring(2, 9),
    title: apiArticle.title || 'Untitled Article',
    description: apiArticle.description || 'No description available',
    content: apiArticle.content || apiArticle.description || 'No content available',
    publishedAt: apiArticle.publishedAt || new Date().toISOString(),
    source: {
      name: apiArticle.source?.name || 'Unknown Source',
      url: apiArticle.url || '#'
    },
    image: apiArticle.urlToImage,
    url: apiArticle.url || '#',
    category: determineCategoryFromArticle(apiArticle)
  };
}

// Determine a category based on the article content
function determineCategoryFromArticle(article: any): string {
  const categories = [
    { name: 'Crime', keywords: ['crime', 'criminal', 'murder', 'theft', 'robbery', 'police'] },
    { name: 'Cybercrime', keywords: ['cyber', 'hack', 'data breach', 'phishing', 'ransomware'] },
    { name: 'Forensics', keywords: ['forensic', 'evidence', 'investigation', 'dna', 'fingerprint'] },
    { name: 'Security', keywords: ['security', 'surveillance', 'protection', 'guard', 'safety'] },
    { name: 'Legal', keywords: ['legal', 'law', 'court', 'judge', 'justice', 'trial'] },
    { name: 'Financial Crime', keywords: ['fraud', 'money laundering', 'embezzlement', 'financial crime'] }
  ];

  const textToAnalyze = [
    article.title || '',
    article.description || '',
    article.content || ''
  ].join(' ').toLowerCase();

  for (const category of categories) {
    if (category.keywords.some(keyword => textToAnalyze.includes(keyword))) {
      return category.name;
    }
  }

  return 'General';
}

export async function getLatestCrimeNews(): Promise<BlogPost[]> {
  try {
    // Check for API key
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      console.warn('NEWS_API_KEY not found in environment variables. Using mock data.');
      return Promise.resolve(mockCrimeNews);
    }

    // Make API call - for crime news in India
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=crime+india&sortBy=publishedAt&apiKey=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`News API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to our format
    return data.articles.map(transformToAppFormat);
  } catch (error) {
    console.error('Error fetching news data:', error);
    // Fallback to mock data if the API call fails
    return mockCrimeNews;
  }
}

export async function getNewsById(id: string): Promise<BlogPost | null> {
  try {
    // First, try to get all news and find the one with matching id
    const allNews = await getLatestCrimeNews();
    const news = allNews.find(item => item.id === id);
    
    if (news) {
      return news;
    }
    
    // If we couldn't find it, return null
    return null;
  } catch (error) {
    console.error('Error fetching specific news item:', error);
    
    // Fallback to mock data if API fails
    const mockNews = mockCrimeNews.find(item => item.id === id);
    return mockNews || null;
  }
} 