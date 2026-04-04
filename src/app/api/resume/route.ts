import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESUME_PATH = path.join(process.cwd(), 'content', 'resume', 'Steven_Nguyen_Resume.pdf');
const DOWNLOADS_PATH = path.join(process.cwd(), 'content', 'resume', 'downloads.json');

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  try {
    await limiter.check(5, ip);
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, name } = body as { email?: string; name?: string };

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    // Log the download
    let downloads: { email: string; name?: string; timestamp: string; ip: string }[] = [];
    try {
      const raw = await fs.readFile(DOWNLOADS_PATH, 'utf-8');
      downloads = JSON.parse(raw);
    } catch {
      downloads = [];
    }

    downloads.push({
      email: email.trim(),
      name: name?.trim() || undefined,
      timestamp: new Date().toISOString(),
      ip,
    });

    await fs.writeFile(DOWNLOADS_PATH, JSON.stringify(downloads, null, 2));

    // Read and return the PDF
    const pdfBuffer = await fs.readFile(RESUME_PATH);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Steven_Nguyen_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
