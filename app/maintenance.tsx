'use client';

import { useEffect, useState } from 'react';

const MAINTENANCE_END = '2026-01-30T12:00:00'; // Set your expected end time

const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
  >
    {children}
  </a>
);

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
      {timeLeft.months > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">
            {timeLeft.months}
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">
            {timeLeft.months === 1 ? 'Month' : 'Months'}
          </div>
        </div>
      )}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-2xl md:text-3xl font-bold text-blue-600">
          {timeLeft.days}
        </div>
        <div className="text-xs md:text-sm text-gray-500 mt-1">
          {timeLeft.days === 1 ? 'Day' : 'Days'}
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-2xl md:text-3xl font-bold text-blue-600">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm text-gray-500 mt-1">Hours</div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-2xl md:text-3xl font-bold text-blue-600">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm text-gray-500 mt-1">Minutes</div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-2xl md:text-3xl font-bold text-blue-600">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm text-gray-500 mt-1">Seconds</div>
      </div>
    </div>
  );
};

export default function MaintenancePage() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const endDate = new Date(MAINTENANCE_END);
  
  // Simulate progress
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4 z-40">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-6">
            <svg
              className="h-12 w-12 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚧 Website in construction
          </h1>
          
          <p className="text-gray-500 mt-6 mb-8">
            Estimated completion: <span className="font-medium">
              {endDate.toLocaleString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-600 mb-4">
              Need immediate assistance?
            </p>
            <div className="flex justify-center space-x-6">
              <SocialLink href="mailto:jdecorte@proton.me">
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://github.com/jdecorte-be">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} jdecorte.com. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
