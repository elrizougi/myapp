import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from './queryClient';
import type { Project, BlogPost, Message, AboutPage, AboutCard, SocialLink } from '@shared/schema';

interface DataContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  messages: Message[];
  aboutPage: AboutPage | null;
  aboutCards: AboutCard[];
  socialLinks: SocialLink[];
  isLoadingProjects: boolean;
  isLoadingBlogPosts: boolean;
  isLoadingMessages: boolean;
  isLoadingAbout: boolean;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: number, project: Partial<Omit<Project, 'id'>>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: number, post: Partial<Omit<BlogPost, 'id'>>) => Promise<void>;
  deleteBlogPost: (id: number) => Promise<void>;
  addMessage: (message: { name: string; email: string; purpose: string; message: string }) => Promise<void>;
  markMessageAsRead: (id: number) => Promise<void>;
  deleteMessage: (id: number) => Promise<void>;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updateAboutPage: (data: Omit<AboutPage, 'id'>) => Promise<void>;
  addAboutCard: (card: Omit<AboutCard, 'id'>) => Promise<void>;
  updateAboutCard: (id: number, card: Partial<Omit<AboutCard, 'id'>>) => Promise<void>;
  deleteAboutCard: (id: number) => Promise<void>;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => Promise<void>;
  updateSocialLink: (id: number, data: Partial<Omit<SocialLink, 'id'>>) => Promise<void>;
  deleteSocialLink: (id: number) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  cvUrl: string | null;
  isLoadingCv: boolean;
  updateCvUrl: (url: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: projects = [], isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const { data: blogPosts = [], isLoading: isLoadingBlogPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
    enabled: isAuthenticated,
  });

  const { data: aboutPage = null, isLoading: isLoadingAbout } = useQuery<AboutPage | null>({
    queryKey: ['/api/about'],
  });

  const { data: aboutCards = [] } = useQuery<AboutCard[]>({
    queryKey: ['/api/about-cards'],
  });

  const { data: socialLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ['/api/social-links'],
  });

  const { data: cvData, isLoading: isLoadingCv } = useQuery<{ value: string | null }>({
    queryKey: ['/api/settings/cv_url'],
  });

  const addProject = async (project: Omit<Project, 'id'>) => {
    await apiRequest('POST', '/api/projects', project);
    queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
  };

  const updateProject = async (id: number, data: Partial<Omit<Project, 'id'>>) => {
    await apiRequest('PATCH', `/api/projects/${id}`, data);
    queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
  };

  const deleteProject = async (id: number) => {
    await apiRequest('DELETE', `/api/projects/${id}`);
    queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    await apiRequest('POST', '/api/blog-posts', post);
    queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
  };

  const updateBlogPost = async (id: number, data: Partial<Omit<BlogPost, 'id'>>) => {
    await apiRequest('PATCH', `/api/blog-posts/${id}`, data);
    queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
  };

  const deleteBlogPost = async (id: number) => {
    await apiRequest('DELETE', `/api/blog-posts/${id}`);
    queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
  };

  const addMessage = async (message: { name: string; email: string; purpose: string; message: string }) => {
    await apiRequest('POST', '/api/messages', message);
    queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
  };

  const markMessageAsRead = async (id: number) => {
    await apiRequest('PATCH', `/api/messages/${id}/read`);
    queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
  };

  const deleteMessage = async (id: number) => {
    await apiRequest('DELETE', `/api/messages/${id}`);
    queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
  };

  const updateAboutPage = async (data: Omit<AboutPage, 'id'>) => {
    await apiRequest('PUT', '/api/about', data);
    queryClient.invalidateQueries({ queryKey: ['/api/about'] });
  };

  const addAboutCard = async (card: Omit<AboutCard, 'id'>) => {
    await apiRequest('POST', '/api/about-cards', card);
    queryClient.invalidateQueries({ queryKey: ['/api/about-cards'] });
  };

  const updateAboutCard = async (id: number, data: Partial<Omit<AboutCard, 'id'>>) => {
    await apiRequest('PATCH', `/api/about-cards/${id}`, data);
    queryClient.invalidateQueries({ queryKey: ['/api/about-cards'] });
  };

  const deleteAboutCard = async (id: number) => {
    await apiRequest('DELETE', `/api/about-cards/${id}`);
    queryClient.invalidateQueries({ queryKey: ['/api/about-cards'] });
  };

  const addSocialLink = async (link: Omit<SocialLink, 'id'>) => {
    await apiRequest('POST', '/api/social-links', link);
    queryClient.invalidateQueries({ queryKey: ['/api/social-links'] });
  };

  const updateSocialLink = async (id: number, data: Partial<Omit<SocialLink, 'id'>>) => {
    await apiRequest('PATCH', `/api/social-links/${id}`, data);
    queryClient.invalidateQueries({ queryKey: ['/api/social-links'] });
  };

  const deleteSocialLink = async (id: number) => {
    await apiRequest('DELETE', `/api/social-links/${id}`);
    queryClient.invalidateQueries({ queryKey: ['/api/social-links'] });
  };

  const updateCvUrl = async (url: string) => {
    await apiRequest('PUT', '/api/settings/cv_url', { value: url });
    queryClient.invalidateQueries({ queryKey: ['/api/settings/cv_url'] });
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await apiRequest('POST', '/api/auth/login', { password });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => setIsAuthenticated(false);

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await apiRequest('POST', '/api/auth/change-password', { currentPassword, newPassword });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: "فشل تغيير كلمة المرور" };
    }
  };

  return (
    <DataContext.Provider value={{
      projects,
      blogPosts,
      messages,
      aboutPage,
      aboutCards,
      socialLinks,
      isLoadingProjects,
      isLoadingBlogPosts,
      isLoadingMessages,
      isLoadingAbout,
      addProject,
      updateProject,
      deleteProject,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addMessage,
      markMessageAsRead,
      deleteMessage,
      updateAboutPage,
      addAboutCard,
      updateAboutCard,
      deleteAboutCard,
      addSocialLink,
      updateSocialLink,
      deleteSocialLink,
      isAuthenticated,
      login,
      logout,
      changePassword,
      cvUrl: cvData?.value ?? null,
      isLoadingCv,
      updateCvUrl
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
