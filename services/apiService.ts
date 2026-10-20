import { Industry, NewsArticle, Vacancy, Milestone, Tender, MediaFile } from '../types';

const API_BASE_URL = '/api/v1';

async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// --- GET Requests ---

export const fetchIndustries = async (): Promise<Industry[]> => {
  return await apiFetch<Industry[]>('/industries');
};

export const fetchIndustryById = async (id: string): Promise<Industry> => {
  return await apiFetch<Industry>(`/industries/${id}`);
};

export const fetchNews = async (): Promise<NewsArticle[]> => {
  return await apiFetch<NewsArticle[]>('/news');
};

export const fetchVacancies = async (): Promise<Vacancy[]> => {
  return await apiFetch<Vacancy[]>('/vacancies');
};

export const fetchMilestones = async (): Promise<Milestone[]> => {
  return await apiFetch<Milestone[]>('/milestones');
};

export const fetchTenders = async (): Promise<Tender[]> => {
  return await apiFetch<Tender[]>('/tenders');
};

export const fetchMediaFiles = async (): Promise<MediaFile[]> => {
  return await apiFetch<MediaFile[]>('/media');
};

// --- POST Requests ---

export const submitContactForm = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/contacts/public`, {
      method: 'POST',
      body: formData,
  });
  if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit contact form');
  }
  return response.json();
};

export const submitApplication = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/applicants/public`, {
      method: 'POST',
      body: formData,
  });
  if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit application');
  }
  return response.json();
};

export const submitSupplierRegistration = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/suppliers/public`, {
      method: 'POST',
      body: formData,
  });
  if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit registration');
  }
  return response.json();
};