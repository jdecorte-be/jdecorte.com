import { NextRequest, NextResponse } from 'next/server';

const UMAMI_API_URL = process.env.UMAMI_API_URL || 'https://cloud.umami.is/api';
const UMAMI_WEBSITE_ID = process.env.UMAMI_ID;
const UMAMI_API_TOKEN = process.env.UMAMI_API_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  if (!UMAMI_WEBSITE_ID || !UMAMI_API_TOKEN) {
    return NextResponse.json({ error: 'Umami not configured' }, { status: 500 });
  }

  try {
    // Get page views for the specific URL from Umami
    const url = `${UMAMI_API_URL}/websites/${UMAMI_WEBSITE_ID}/metrics`;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 10); // Get all-time views

    const params = new URLSearchParams({
      startAt: startDate.getTime().toString(),
      endAt: endDate.getTime().toString(),
      type: 'url',
      url: `/writeups/${slug}`,
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        Authorization: `Bearer ${UMAMI_API_TOKEN}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error('Umami API error:', await response.text());
      return NextResponse.json({ views: 0 }, { status: 200 });
    }

    const data = await response.json();
    const views = data[0]?.x || 0;

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ views: 0 }, { status: 200 });
  }
}
