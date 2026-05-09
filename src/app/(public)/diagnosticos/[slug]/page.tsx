import { PublicDiagnosisPage } from '@/modules/prospects/components/PublicDiagnosisPage';

export default async function DiagnosisSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicDiagnosisPage slug={slug} />;
}
