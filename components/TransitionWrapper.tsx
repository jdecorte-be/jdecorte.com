'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TRANSITION_DELAY = 200; // ms

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [opacity, setOpacity] = useState(1);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Start fade out
      setOpacity(0);
      setIsTransitioning(true);
      
      // After fade out, update children and fade in
      setTimeout(() => {
        setDisplayChildren(children);
        router.push(url);
        setOpacity(1);
        
        // End transition after fade in
        setTimeout(() => {
          setIsTransitioning(false);
        }, TRANSITION_DELAY);
      }, TRANSITION_DELAY);
    };

    // Add click handlers to all internal links
    const links = document.querySelectorAll('a[href^="/"]');
    
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        handleRouteChange(target.href.replace(window.location.origin, ''));
      }
    };

    links.forEach(link => {
      link.addEventListener('click', handleClick);
    });

    // Cleanup
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, [children, router]);

  // Handle initial load and pathname changes
  useEffect(() => {
    if (!isTransitioning) {
      setDisplayChildren(children);
      setOpacity(1);
    }
  }, [children, isTransitioning]);

  return (
    <div 
      style={{
        opacity,
        transition: `opacity ${TRANSITION_DELAY}ms ease-in-out`,
        minHeight: '60vh',
      }}
    >
      {displayChildren}
    </div>
  );
}
