// SEO utilities and structured data helpers
export const generateStructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mayuresh Mankar",
    "jobTitle": "Full Stack Developer",
    "description": "Product-focused engineer passionate about transforming ideas into scalable digital products",
    "url": "https://your-portfolio-url.com",
    "sameAs": [
      "https://github.com/MayureshMankar",
      "https://linkedin.com/in/mankarmayuresh"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance/Consulting"
    },
    "knowsAbout": [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Next.js",
      "Python",
      "Machine Learning",
      "SaaS Development"
    ],
    "nationality": {
      "@type": "Country",
      "name": "India"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mayuresh Mankar - Portfolio",
    "url": "https://your-portfolio-url.com",
    "description": "Modern portfolio showcasing full-stack development projects and expertise",
    "author": {
      "@type": "Person",
      "name": "Mayuresh Mankar"
    }
  };

  return { personSchema, websiteSchema };
};

export const injectStructuredData = () => {
  const { personSchema, websiteSchema } = generateStructuredData();
  
  // Remove existing structured data scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  // Inject person schema
  const personScript = document.createElement('script');
  personScript.type = 'application/ld+json';
  personScript.textContent = JSON.stringify(personSchema);
  document.head.appendChild(personScript);

  // Inject website schema
  const websiteScript = document.createElement('script');
  websiteScript.type = 'application/ld+json';
  websiteScript.textContent = JSON.stringify(websiteSchema);
  document.head.appendChild(websiteScript);
};

export const updateMetaTags = (pageTitle, pageDescription) => {
  const title = pageTitle || "Mayuresh Mankar - Full Stack Developer Portfolio";
  const description = pageDescription || "Product-focused engineer building scalable digital products and SaaS platforms";

  // Update title
  document.title = title;

  // Update meta tags
  updateMetaTag('meta[name="description"]', description);
  updateMetaTag('meta[property="og:title"]', title);
  updateMetaTag('meta[property="og:description"]', description);
  updateMetaTag('meta[property="og:type"]', 'website');
  updateMetaTag('meta[property="og:url"]', window.location.href);
  updateMetaTag('meta[name="twitter:title"]', title);
  updateMetaTag('meta[name="twitter:description"]', description);
  updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
};

const updateMetaTag = (selector, content) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(selector.split('[')[1].split(']')[0].split('=')[0], selector.split('"')[1]);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export const trackSocialShare = (platform) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_share', {
      platform: platform,
      url: window.location.href
    });
  }
};