
export type NewsCategory = 'Headquarters Updates' | 'Industry News' | 'Projects' | 'Events & Exhibitions' | 'Announcements' | 'Innovation & Technology' | 'Press Releases';

export type ContentStatus = 'Published' | 'Draft';

export type VacancyStatus = 'Open' | 'Closed';
export type VacancyType = 'Full-Time' | 'Part-Time' | 'Contract';
export type ApplicantStatus = 'New' | 'Reviewed' | 'Interview' | 'Hired' | 'Rejected';
export type MediaType = 'Image' | 'Video' | 'Document' | 'Archive';
export type InquiryStatus = 'Unread' | 'Read' | 'Resolved';

export type Page = 'Home' | 'About' | 'Industry' | 'Production' | 'Gallery' | 'News' | 'Vacancy' | 'Contact' | 'PrivacyPolicy' | 'Terms' | 'Procurement' | 'Tenders' | 'SupplierRegistration';

export type LocalizedString = {
  en: string;
  am: string;
};

export type LocalizedArray = {
  en: string[];
  am: string[];
};


export interface CurrentView {
  page: Page;
  industryId?: string;
}

export interface Industry {
  id: string;
  shortName: string;
  fullName: LocalizedString;
  description: LocalizedString;
  icon?: string;
  capabilities: LocalizedArray;
  productsOrServices: LocalizedArray;
  image: string;
  heroImage: string;
  facilityPhotos: string[];
  technicalHighlights: LocalizedArray;
  divisionalContact: {
    email: string;
    phone: string;
    address: string;
  };
  coordinates: { top: string; left: string; };
  contactPerson: string;
  status: 'Online' | 'Maintenance';
}

export interface Vacancy {
  id: string;
  title: LocalizedString;
  division: string;
  location: string;
  description: LocalizedString;
  responsibilities: LocalizedArray;
  qualifications: LocalizedArray;
  benefits: LocalizedArray;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
  status: VacancyStatus;
  type: VacancyType;
  closingDate: string;
}

export interface Applicant {
    id: string;
    name: string;
    email: string;
    vacancyId: string;
    cvUrl: string;
    status: ApplicantStatus;
    submittedDate: string;
    notes: string;
    rating: number; // 1-5
}

export interface Milestone {
  id: string;
  year: string;
  event: LocalizedString;
}

export interface NewsArticle {
  id: string;
  title: LocalizedString;
  date: string;
  content: LocalizedString;
  category: NewsCategory;
  status: ContentStatus;
  image?: string;
}

export interface Tender {
  id: string;
  title: LocalizedString;
  reference: string;
  status: 'Open' | 'Closed';
  publishedDate: string;
  closingDate: string;
  description: LocalizedString;
}

export interface Supplier {
  id: string;
  companyName: string;
  registrationNumber: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  profileUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PageContent {
    id: string;
    title: string;
    slug: string;
    status: ContentStatus;
    lastEdited: string;
    editor: string;
}

export interface MediaFolder {
  id: string;
  name: string;
  parentId?: string;
}

export interface MediaFile {
  id: string;
  name: string;
  type: MediaType;
  size: number; // in KB
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  folderId: string;
  references: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  division: 'General' | 'HR' | 'Procurement' | 'Media';
  // FIX: Updated `assignee` to be an object or null to match API response.
  // Added `assigneeId` to hold the foreign key for user assignment.
  assignee: { name: string } | null;
  assigneeId: string | null;
  date: string;
}

export type UserRole = 'Admin' | 'Editor' | 'Industry Manager' | 'HR Manager' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  status: 'Active' | 'Inactive';
}

export type PermissionAction = 'Create' | 'Read' | 'Update' | 'Delete';

export interface Role {
    id: string;
    name: UserRole;
    description: string;
}

export interface RolePermission {
    role: UserRole;
    module: string;
    permissions: PermissionAction[];
}

export type SecurityLogAction = 'Login' | 'Logout' | 'Update Content' | 'Create Content' | 'Delete Content' | 'Upload File' | 'User Role Change' | 'Failed Login';

export interface SecurityLog {
  id: string;
  user: string; // User name
  action: SecurityLogAction;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface ActiveSession {
    id: string;
    user: string;
    ipAddress: string;
    device: string;
    location: string;
    loginTime: string;
}

export interface WhitelistedIp {
    id: string;
    ipAddress: string;
    description: string;
    addedBy: string;
    dateAdded: string;
}

export type AlertSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SecurityAlert {
    id: string;
    type: string;
    details: string;
    timestamp: string;
    severity: AlertSeverity;
}