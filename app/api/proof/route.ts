import { getProofFilesByCat } from '@/sanity/lib/feb/getProofFilesByCat';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'pictures';

  const proofFiles = await getProofFilesByCat(category);

  return NextResponse.json(proofFiles);
}
