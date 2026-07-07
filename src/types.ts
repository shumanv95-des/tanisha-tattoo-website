export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface ServiceItem {
  name: string;
  id: string; // e.g. "01", "02"
}

export interface ServiceCategory {
  id: string; // e.g. "01", "02"
  title: string;
  description: string;
  items: ServiceItem[];
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon: string; // lucide icon name or prefix
}
