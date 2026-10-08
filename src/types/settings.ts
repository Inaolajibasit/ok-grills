export interface SiteSettings {
  businessName: string;
  checkout: { confirmationNotice: string };
  events: {
    eyebrow: string;
    headlineLines: string[];
    supportingCopy: string;
    heroImage: string;
    eventTypes: string[];
  };
  homeMenuFeatures: {
    breakfast: HomeMenuFeatureContent;
    local: HomeMenuFeatureContent;
  };
  familyFeast: {
    productSlug: string;
    eyebrow: string;
    headlineLines: [string, string];
    actionLabel: string;
  };
  grillStory: {
    eyebrow: string;
    title: string;
    actionLabel: string;
    actionHref: string;
    stages: { id: string; headline: string; description: string; imageSrc: string; imageAlt: string }[];
  };
  tagline: string;
  whatsappNumber: string;
  email: string;
  orderingEnabled: boolean;
  deliveryNotice: string;
  eventEnquiryEnabled: boolean;
  buildBox: {
    previewImageSrc: string;
    priceNotice: string;
  };
  social: {
    instagram: string;
  };
  hero: {
    logoSrc: string | null;
    starSrc: string | null;
    posterSrc: string;
    videoSrc: string | null;
    headlineLines: [string, string, string];
    supportingCopy: string;
    orderLabel: string;
    menuLabel: string;
    ticker: string[];
  };
}

export interface HomeMenuFeatureContent {
  eyebrow?: string;
  headlineLines: string[];
  description: string;
  actionLabel: string;
  featuredProductCount: number;
}
