import { http } from '@/services/http';

export type UploadImageResponse = {
  publicId?: string;
  url?: string;
  thumbnailUrl?: string;
  originalFilename?: string;
  resourceType?: string;
};

export const uploadsService = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await http.post<UploadImageResponse>('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
};
