import { http } from '@/services/http';
import type {
  ImportProspectsResponse,
  Prospect,
  ProspectListParams,
  ProspectListResponse,
  ProspectMetrics,
  ProspectStatus,
  PublicDiagnosisResponse,
  PublishDiagnosisPayload,
  UpdateDiagnosisPayload,
  UpdateProspectPayload,
} from '../types';

export const prospectsService = {
  async importProspects(payload: unknown) {
    const { data } = await http.post<ImportProspectsResponse>('/prospects/import', payload);
    return data;
  },

  async listProspects(params: ProspectListParams) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== '' && value !== undefined && value !== null),
    );

    const { data } = await http.get<ProspectListResponse>('/prospects', {
      params: cleanParams,
    });
    return data;
  },

  async getProspect(id: string) {
    const { data } = await http.get<Prospect>(`/prospects/${id}`);
    return data;
  },

  async getMetrics() {
    const { data } = await http.get<ProspectMetrics>('/prospects/metrics');
    return data;
  },

  async updateProspect(id: string, payload: UpdateProspectPayload) {
    const { data } = await http.patch<Prospect>(`/prospects/${id}`, payload);
    return data;
  },

  async updateProspectStatus(id: string, status: ProspectStatus) {
    const { data } = await http.patch<Prospect>(`/prospects/${id}/status`, { status });
    return data;
  },

  async updateDiagnosis(id: string, payload: UpdateDiagnosisPayload) {
    const { data } = await http.patch<Prospect>(`/prospects/${id}/diagnosis`, payload);
    return data;
  },

  async publishDiagnosis(id: string, payload: PublishDiagnosisPayload = {}) {
    const { data } = await http.post<Prospect>(`/prospects/${id}/diagnosis/publish`, payload);
    return data;
  },

  async unpublishDiagnosis(id: string) {
    const { data } = await http.post<Prospect>(`/prospects/${id}/diagnosis/unpublish`);
    return data;
  },

  async getPublicDiagnosis(slug: string) {
    const { data } = await http.get<PublicDiagnosisResponse>(`/public/diagnostics/${slug}`);
    return data;
  },
};
