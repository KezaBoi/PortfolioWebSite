// Performance tracking and analytics
export const trackEvent = (eventName, properties = {}) => {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      ...properties,
      custom_parameter: true
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties);
  }
};

// Track page views
export const trackPageView = (path) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: document.title
    });
  }
};

// Track user interactions
export const trackInteraction = (type, element, section = '') => {
  trackEvent('user_interaction', {
    interaction_type: type,
    element_name: element,
    section: section,
    timestamp: new Date().toISOString()
  });
};

// Track performance metrics
export const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        
        const metrics = {
          page_load_time: navigation.loadEventEnd - navigation.loadEventStart,
          dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          first_paint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
          first_contentful_paint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        };
        
        trackEvent('performance_metrics', metrics);
      }, 1000);
    });
  }
};

// Track scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  let scrollTimeout;
  
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (maxScroll >= 25 && maxScroll < 50) {
          trackEvent('scroll_depth', { depth: '25%' });
        } else if (maxScroll >= 50 && maxScroll < 75) {
          trackEvent('scroll_depth', { depth: '50%' });
        } else if (maxScroll >= 75 && maxScroll < 100) {
          trackEvent('scroll_depth', { depth: '75%' });
        } else if (maxScroll >= 100) {
          trackEvent('scroll_depth', { depth: '100%' });
        }
      }, 500);
    }
  };
  
  window.addEventListener('scroll', trackScroll, { passive: true });
};

// Initialize analytics
export const initAnalytics = () => {
  trackPerformance();
  trackScrollDepth();
  
  // Track initial page view
  trackPageView(window.location.pathname);
};

export default {
  trackEvent,
  trackPageView,
  trackInteraction,
  trackPerformance,
  trackScrollDepth,
  initAnalytics
};
