import type { Metadata } from 'next';
import type { PublicDiagnosisResponse } from '../types';
import { getDiagnosisSeo } from '../utils/diagnosis-seo.utils';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://eon-backend-production.up.railway.app/api';

function buildOpenGraphImageUrl(imageUrl: string) {
  if (!imageUrl.includes('res.cloudinary.com') || !imageUrl.includes('/upload/')) {
    return imageUrl;
  }

  return imageUrl.replace(
    '/upload/',
    '/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/',
  );
}

function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  return value.replace(/\/$/, '');
}

export async function getPublicDiagnosisMetadataData(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/diagnostics/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as PublicDiagnosisResponse;
  } catch {
    return null;
  }
}

export function buildPublicDiagnosisMetadata(
  data: PublicDiagnosisResponse | null,
): Metadata {
  const prospectName = data?.prospect.name || 'El Ojo Negro';
  const seo = getDiagnosisSeo(data?.diagnosis, data?.prospect.name);
  const title =
    seo.status === 'READY' || (seo.title && seo.description && seo.imageUrl)
      ? seo.title
      : `Diagnostico Express | ${prospectName}`;
  const description =
    seo.status === 'READY' || (seo.title && seo.description && seo.imageUrl)
      ? seo.description
      : `Lectura ejecutiva de presencia digital, confianza y conversion para ${prospectName}.`;
  const image = buildOpenGraphImageUrl(seo.imageUrl || '/EL-OJO-NEGRO-DARK.jpeg');
  const imageAlt = seo.imageAlt || title;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: imageAlt, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
