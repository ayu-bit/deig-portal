
// Fix: Add ambient module declaration for react-router-dom to resolve missing type definitions in environment
declare module 'react-router-dom';

// --- Toast System Types ---
export type ToastType = 'success' | 'error';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
// -------------------------

export type ContentStatus = 'Published' | 'Draft' | 'Archived';

export interface Page {
  id: string;
  title: string;
  titleAm?: string;
  slug: string;
  status: ContentStatus;
  lastEdited: string;
  editedBy: string | { name: string }; 
  content?: string;
  contentAm?: string;
}

export interface Industry {
  id: string;
  name: string;
  acronym: string;
  description: string;
  focus: string;
  capabilities: { name: string; description: string; }[];
  products: { name: string; description: string; imageUrl?: string; }[];
  gallery: string[];
  model3d?: string;
  video?: string;
  location?: { top: string; left: string; };
  technicalHighlights: { title: string; description: string; }[];
  contact: { email: string; phone: string; };
  facilityInfo: {
    location: string;
    area: string;
    keyFeatures: string[];
  };
  status: ContentStatus;
  contactPerson: string;
}

export type VacancyRole = 'Engineering' | 'Management' | 'Electronics' | 'IT & Cyber' | 'Operations';
export type Division = 'GAEI' | 'HAEI' | 'BVEIG' | 'BPIG' | 'LEEIG' | 'RIG' | 'AEI' | 'NSEI' | 'Corporate';
export type ExperienceLevel = 'Entry-level' | 'Mid-level' | 'Senior' | 'Expert';

export type VacancyStatus = 'Open' | 'Closed' | 'Archived';
export type VacancyType = 'Full-time' | 'Part-time' | 'Contract';

export interface Vacancy {
  id: string;
  title: string;
  location: string;
  description: string;
  role: VacancyRole;
  division: Division;
  experienceLevel: ExperienceLevel;
  status: VacancyStatus;
  type: VacancyType;
  closingDate: string;
  responsibilities: string[];
  requirements: string[];
  applicantCount: number;
}

export type ApplicantStatus = 'New' | 'Reviewed' | 'Interview' | 'Hired' | 'Rejected';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  appliedDate: string;
  vacancyId: string;
  status: ApplicantStatus;
  cvUrl: string;
  rating: number;
}

export type SupplierStatus = 'Pending' | 'Verified' | 'Blacklisted' | 'Archived';

export interface Supplier {
  id: string;
  companyName: string;
  regNumber: string;
  address: string;
  country: string;
  website?: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  services: string;
  documentsUrl?: string;
  status: SupplierStatus;
  registeredAt: string;
}

export interface Milestone {
  year: string;
  event: string;
  details: string;
}

export interface Partner {
  name: string;
  logoUrl: string;
}

export type NewsCategory = 'Press Release' | 'Announcement' | 'Public Notice' | 'Headquarters Updates' | 'Industry News' | 'Projects' | 'Events & Exhibitions' | 'Innovation & Technology';

export interface NewsArticle {
  id: number;
  title: string;
  titleAm?: string;
  date: string;
  excerpt: string;
  excerptAm?: string;
  content?: string;
  contentAm?: string;
  imageUrl: string;
  category: NewsCategory;
  status: ContentStatus;
}

export interface Leader {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export interface Certification {
  name: string;
  logoUrl: string;
}

export type TenderCategory = 'Equipment Supply' | 'Consultancy' | 'Construction' | 'Logistics';
export type TenderStatus = 'Open' | 'Closed' | 'Awarded';

export interface Tender {
  id: string;
  title: string;
  category: TenderCategory;
  publishedDate: string;
  closingDate: string;
  status: TenderStatus;
  summary: string;
  requirements?: string[];
  submissionEmail?: string;
}

export type MediaType = 'Image' | 'Video' | 'Document' | 'Archive';

export interface MediaAsset {
  id: string;
  name: string;
  type: MediaType;
  size: string;
  url: string;
  thumbnailUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  usage: string[];
}

export type AdminPanelSection = 
  | 'Dashboard' 
  | 'Home Management'
  | 'Contact Management'
  | 'About Management'
  | 'Industry Management' 
  | 'News Management' 
  | 'Vacancy Management' 
  | 'Tender Management' 
  | 'Supplier Management'
  | 'Pages Editor' 
  | 'Media Manager' 
  | 'Inquiry Management' 
  | 'User Management' 
  | 'Security' 
  | 'System Settings';

export type InquiryStatus = 'Unread' | 'Read' | 'Resolved';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  status: InquiryStatus;
  assignedTo?: string;
}

export type UserRole = 'Admin' | 'Editor' | 'Industry Manager' | 'HR Manager' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive';
export type AdminPermission = 
    | 'dashboard:view'
    | 'pages:view' | 'pages:create' | 'pages:edit' | 'pages:delete'
    | 'news:view' | 'news:create' | 'news:edit' | 'news:delete'
    | 'industry:view' | 'industry:edit'
    | 'vacancies:view' | 'vacancies:create' | 'vacancies:edit' | 'vacancies:delete' | 'vacancies:manage_applicants'
    | 'media:view' | 'media:upload' | 'media:delete'
    | 'inquiries:view' | 'inquiries:reply' | 'inquiries:manage'
    | 'users:view' | 'users:invite' | 'users:manage'
    | 'security:view' | 'settings:view' | 'settings:edit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  status: UserStatus;
  password?: string;
  avatarUrl: string;
}

export interface UserRolePermissions {
    id: UserRole;
    description: string;
    permissions: AdminPermission[];
    userCount: number;
}

export type LogActionType = 'Create' | 'Update' | 'Delete' | 'Login' | 'Failed Login';

export interface SecurityLog {
  id: string;
  user: string;
  avatarUrl: string;
  action: LogActionType;
  target: string;
  timestamp: string;
  ipAddress: string;
}

export interface ActiveSession {
  id: string;
  user: string;
  avatarUrl: string;
  ipAddress: string;
  device: string;
  lastActivity: string;
}

export type GalleryCategory = 'All' | 'Aerospace' | 'Land Systems' | 'Naval' | 'Electronics' | 'Manufacturing';

export interface GalleryItem {
  id: string;
  titleKey: string;
  divisionKey: string;
  imageUrl: string;
  category: GalleryCategory;
}
