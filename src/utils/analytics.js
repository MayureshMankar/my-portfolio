// Analytics utility for tracking user interactions
const ANALYTICS_ID = 'G-YOUR-GOOGLE-ANALYTICS-ID';

export const initAnalytics = () => {
  // Google Analytics setup
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID, {
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  }
};

export const trackPageView = (pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', ANALYTICS_ID, {
      page_path: pagePath,
      page_title: document.title
    });
  }
};

// Predefined tracking events
export const trackContactFormSubmission = (formData) => {
  trackEvent('contact_form_submit', {
    form_subject: formData.subject,
    form_length: formData.message.length
  });
};

export const trackProjectView = (projectId) => {
  trackEvent('project_view', {
    project_id: projectId
  });
};

export const trackSocialClick = (platform) => {
  trackEvent('social_link_click', {
    platform: platform
  });
};

export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    file_type: 'pdf'
  });
};