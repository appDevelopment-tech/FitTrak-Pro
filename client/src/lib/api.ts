import type { Pupil, InsertPupil, Appointment, InsertAppointment } from '@shared/schema';

// Base API configuration
const API_BASE = '/api';

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Student/Pupil API
export const studentsAPI = {
  /**
   * Get all students for a trainer
   */
  async getByTrainerId(trainerId: string): Promise<Pupil[]> {
    return fetchAPI<Pupil[]>(`/trainers/${trainerId}/pupils`);
  },

  /**
   * Get a student by ID
   */
  async getById(id: string): Promise<Pupil> {
    return fetchAPI<Pupil>(`/pupils/${id}`);
  },

  /**
   * Create a new student
   */
  async create(trainerId: string, student: InsertPupil): Promise<Pupil> {
    return fetchAPI<Pupil>(`/trainers/${trainerId}/pupils`, {
      method: 'POST',
      body: JSON.stringify(student),
    });
  },

  /**
   * Update a student
   */
  async update(id: string, updates: Partial<InsertPupil>): Promise<Pupil> {
    return fetchAPI<Pupil>(`/pupils/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Delete a student
   */
  async delete(id: string): Promise<{ success: boolean }> {
    return fetchAPI<{ success: boolean }>(`/pupils/${id}`, {
      method: 'DELETE',
    });
  },
};

// Appointment API
export const appointmentsAPI = {
  /**
   * Get all appointments for a trainer
   */
  async getByTrainerId(trainerId: string): Promise<Appointment[]> {
    return fetchAPI<Appointment[]>(`/trainers/${trainerId}/appointments`);
  },

  /**
   * Get an appointment by ID
   */
  async getById(id: string): Promise<Appointment> {
    return fetchAPI<Appointment>(`/appointments/${id}`);
  },

  /**
   * Create a new appointment
   */
  async create(appointment: InsertAppointment): Promise<Appointment> {
    return fetchAPI<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  },

  /**
   * Update an appointment
   */
  async update(id: string, updates: Partial<InsertAppointment>): Promise<Appointment> {
    return fetchAPI<Appointment>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Delete an appointment
   */
  async delete(id: string): Promise<{ success: boolean }> {
    return fetchAPI<{ success: boolean }>(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Export unified API object
export const api = {
  students: studentsAPI,
  appointments: appointmentsAPI,
};
