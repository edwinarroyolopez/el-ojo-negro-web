'use client';

import { useQuery } from '@tanstack/react-query';
import { prospectsService } from '../services/prospects.service';

export function useProspect(id: string) {
  return useQuery({
    queryKey: ['prospects', 'detail', id],
    queryFn: () => prospectsService.getProspect(id),
    enabled: Boolean(id),
  });
}
