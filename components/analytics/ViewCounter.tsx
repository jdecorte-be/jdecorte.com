"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error("Error fetching views:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Eye className="h-4 w-4" />
        <span>•••</span>
      </div>
    );
  }

  const displayViews = views ?? 0;

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
      <Eye className="h-4 w-4" />
      <span>
        {displayViews.toLocaleString()} {displayViews === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
