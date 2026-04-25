// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      custom_map: { dimension1: 'basePath' }
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Portfolio-specific tracking
export const trackProjectClick = (projectId: string, projectType: 'private' | 'opensource') => {
  event({
    action: 'project_click',
    category: 'engagement',
    label: `${projectType}_${projectId}`
  });
};

export const trackCVDownload = (fileType: 'pdf' | 'docx') => {
  event({
    action: 'cv_download',
    category: 'conversion',
    label: fileType
  });
};

export const trackSocialClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'engagement',
    label: platform
  });
};

export const trackContactSubmit = () => {
  event({
    action: 'contact_submit',
    category: 'conversion',
    label: 'contact_form'
  });
};

export const trackBlogRead = (postId: string, category: string) => {
  event({
    action: 'blog_read',
    category: 'engagement',
    label: `${category}_${postId}`
  });
};