import type { Metadata } from 'next';
import { PublicDiagnosisPage } from '@/modules/prospects/components/PublicDiagnosisPage';
import {
  buildPublicDiagnosisMetadata,
  getPublicDiagnosisMetadataData,
} from '@/modules/prospects/services/public-diagnosis-metadata.service';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublicDiagnosisMetadataData(slug);
  return buildPublicDiagnosisMetadata(data);
}

export default async function DiagnosisSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicDiagnosisPage slug={slug} />;
}
