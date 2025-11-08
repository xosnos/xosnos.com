import { NextResponse } from 'next/server';
import { fetchSkillsFromReadme } from '@/lib/github-readme';

export async function GET() {
  try {
    const skills = await fetchSkillsFromReadme();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills from GitHub README' },
      { status: 500 }
    );
  }
}

