'use client';

import { useQuery } from '@tanstack/react-query';
import { prospectsService } from '../services/prospects.service';

export function useProspectMetrics() {
  return useQuery({
    queryKey: ['prospects', 'metrics'],
    queryFn: prospectsService.getMetrics,
  });
}
