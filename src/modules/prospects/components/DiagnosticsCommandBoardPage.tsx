'use client';

import { useMemo } from 'react';
import { useProspects } from '../hooks/useProspects';
import { isDiagnosedProspect } from '../utils/diagnostics-command-board.utils';
import { DiagnosticsCommandBoard } from './DiagnosticsCommandBoard';

const DIAGNOSTICS_QUERY = {
  page: 1,
  limit: 100,
  sort: 'recentlyEdited',
} as const;

export function DiagnosticsCommandBoardPage() {
  const prospectsQuery = useProspects(DIAGNOSTICS_QUERY);

  const diagnosedProspects = useMemo(
    () => (prospectsQuery.data?.items ?? []).filter(isDiagnosedProspect),
    [prospectsQuery.data?.items],
  );

  return (
    <DiagnosticsCommandBoard
      prospects={diagnosedProspects}
      isLoading={prospectsQuery.isLoading}
      isError={prospectsQuery.isError}
      onRetry={() => {
        void prospectsQuery.refetch();
      }}
    />
  );
}
