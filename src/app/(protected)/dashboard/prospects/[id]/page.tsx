import { ProspectDetailPage } from '@/modules/prospects/components/ProspectDetailPage';

export default async function DashboardProspectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProspectDetailPage id={id} />;
}
