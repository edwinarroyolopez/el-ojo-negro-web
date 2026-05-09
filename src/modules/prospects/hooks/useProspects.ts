'use client';

import { useQuery } from '@tanstack/react-query';
import { prospectsService } from '../services/prospects.service';
import type { ProspectListParams } from '../types';

export function useProspects(params: ProspectListParams) {
  return useQuery({
    queryKey: ['prospects', 'list', params],
    queryFn: () => prospectsService.listProspects(params),
  });
}
