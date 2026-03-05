'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface Learning {
  number: number;
  title: string;
  category: string;
  quality_score: number | null;
  summary?: string;
}

export default function LearningsPage() {
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        const catRes = await fetch('/api/categories');
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.categories || []);
        }

        // Fetch learnings
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (selectedCategory) params.append('category', selectedCategory);
        params.append('limit', '50');

        const res = await fetch(`/api/learnings?${params}`);
        if (res.ok) {
          const data = await res.json();
          setLearnings(data.results || []);
        }
      } catch (error) {
        console.error('Failed to fetch learnings:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Explore Learnings</h1>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="e.g., 'performance optimization', 'testing'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-sidebar-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-sidebar-active"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-sidebar-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-sidebar-active"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner />
      ) : learnings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-foreground/60">No learnings found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {learnings.map((learning) => (
            <Link href={`/learnings/${learning.number}`} key={learning.number}>
              <div className="p-4 border border-sidebar-border rounded-lg hover:bg-sidebar-hover cursor-pointer transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block bg-badge-blue text-white text-xs px-2 py-1 rounded mr-2">
                      L#{learning.number}
                    </span>
                    <h2 className="text-lg font-semibold mt-2">{learning.title}</h2>
                    {learning.summary && (
                      <p className="text-sm text-foreground/70 mt-2">{learning.summary.substring(0, 200)}...</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <span className="inline-block px-3 py-1 bg-sidebar-hover rounded text-xs">
                      {learning.category}
                    </span>
                    {learning.quality_score && (
                      <div className="mt-2 text-sm">
                        ⭐ {learning.quality_score.toFixed(0)}/100
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
