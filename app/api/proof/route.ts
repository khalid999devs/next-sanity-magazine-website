import { getProofFilesByCat } from '@/sanity/lib/feb/getProofFilesByCat';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'pictures';
  const mode = searchParams.get('mode') || 'short';

  const proofFiles = await getProofFilesByCat(
    category,
    mode === 'short' ? 'limit' : 'all'
  );

  return NextResponse.json(proofFiles);
}
