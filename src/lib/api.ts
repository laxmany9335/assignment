// lib/api.ts

import axios from 'axios';
import { CreateJobDto, Job, JobFilter } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = {
  getJobs: async (filters?: JobFilter): Promise<Job[]> => {
    try {
      const response = await axios.get(`${API_URL}/jobs`, { params: filters });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch jobs: ${error.message}`);
    }
  },

  getJob: async (id: number): Promise<Job> => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch job: ${error.message}`);
    }
  },

createJob: async (job: CreateJobDto): Promise<Job> => {
  try {
    console.log('Sending job to API:', job); // Debug log

    const response = await axios.post(`${API_URL}/jobs`, job);
    return response.data;
  } catch (error: any) {
    console.error('API error:', error.response?.data || error.message); // Better logging

    // Throw the actual response for frontend notifications
    throw error;
  }
},


  updateJob: async (id: number, job: Partial<CreateJobDto>): Promise<Job> => {
    try {
      const response = await axios.patch(`${API_URL}/jobs/${id}`, job);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to update job: ${error.message}`);
    }
  },

  deleteJob: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
    } catch (error: any) {
      throw new Error(`Failed to delete job: ${error.message}`);
    }
  },
};

export { api };
