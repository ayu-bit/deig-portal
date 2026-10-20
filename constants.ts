import { Industry, Vacancy, Milestone, NewsArticle, Tender, PageContent, Applicant, MediaFolder, MediaFile, Inquiry, User, UserRole, Role, RolePermission, PermissionAction, SecurityLog, ActiveSession, WhitelistedIp, SecurityAlert, AlertSeverity } from './types';

export const NAV_LINKS = ['Home', 'About', 'Industry', 'Production', 'Gallery', 'News', 'Vacancy', 'Contact'];

export const PAGES: PageContent[] = [
    { id: 'p1', title: 'Home', slug: '/', status: 'Published', lastEdited: '2024-05-21', editor: 'C. Kebede' },
    { id: 'p2', title: 'About', slug: '/about', status: 'Published', lastEdited: '2024-05-18', editor: 'Gen. A. Abebe' },
    { id: 'p3', title: 'Industry', slug: '/industry', status: 'Published', lastEdited: '2024-05-20', editor: 'Dr. B. Solomon' },
    { id: 'p4', title: 'News', slug: '/news', status: 'Published', lastEdited: '2024-05-22', editor: 'Admin' },
    { id: 'p5', title: 'Vacancy', slug: '/vacancy', status: 'Published', lastEdited: '2024-05-22', editor: 'HR Manager' },
    { id: 'p6', title: 'Contact', slug: '/contact', status: 'Published', lastEdited: '2024-04-10', editor: 'C. Kebede' },
    { id: 'p7', title: 'Privacy Policy', slug: '/privacy', status: 'Draft', lastEdited: '2024-05-15', editor: 'Admin' },
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'heig',
    shortName: 'HEIG',
    fullName: {
      en: 'Heavy Engineering Industry Group',
      am: 'ከባድ ምህንድስና ኢንዱስትሪ ቡድን'
    },
    description: {
      en: 'Focuses on large-scale manufacturing, metal fabrication, and production of heavy machinery required for national infrastructure and defense projects.',
      am: 'ለሀገር አቀፍ መሠረተ ልማት እና ለመከላከያ ፕሮጀክቶች የሚያስፈልጉ ከባድ ማሽነሪዎችን በማምረት፣ በብረታ ብረት ማቀነባበሪያ እና በትላልቅ ደረጃ ማምረት ላይ ያተኩራል።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>`,
    capabilities: {
      en: ['Heavy Fabrication', 'Foundry & Casting', 'Industrial Machinery Production', 'Structural Steel Works'],
      am: ['ከባድ የብረታ ብረት ስራዎች', 'ፋውንድሪ እና ቀረጻ', 'የኢንዱስትሪ ማሽነሪዎች ማምረት', 'የህንጻ ብረት ስራዎች']
    },
    productsOrServices: {
      en: ['Industrial Boilers', 'Bridge Components', 'Custom Heavy Machinery', 'Large-scale Metal Forging'],
      am: ['የኢንዱስትሪ ቦይለሮች', 'የድልድይ አካላት', 'ብጁ ከባድ ማሽነሪዎች', 'ትልቅ ደረጃ የብረት ቀረጻ']
    },
    image: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=1920&auto=format&fit=crop',
    coordinates: { top: '65%', left: '35%' },
    facilityPhotos: [],
    technicalHighlights: { en: [], am: [] },
    contactPerson: 'Eng. T. Gebru',
    status: 'Online',
    divisionalContact: { email: 'inquiries.heig@deig.gov', phone: '+251-11-555-0077', address: 'HEIG Complex, Industrial Zone' }
  },
  {
    id: 'geig',
    shortName: 'GEIG',
    fullName: {
      en: 'General Engineering Industry Group',
      am: 'አጠቃላይ ምህንድስና ኢንዱስትሪ ቡድን'
    },
    description: {
      en: 'Provides a broad range of general engineering services, including precision machining, component manufacturing, and maintenance support for various defense and civilian sectors.',
      am: 'ለተለያዩ የመከላከያ እና የሲቪል ዘርፎች ትክክለኛ የማሽን ስራ፣ የአካል ክፍሎች ማምረት እና የጥገና ድጋፍን ጨምሮ ሰፊ አጠቃላይ የምህንድስና አገልግሎቶችን ይሰጣል።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>`,
    capabilities: {
      en: ['CNC Machining', 'Tool & Die Making', 'General Fabrication', 'Maintenance, Repair & Overhaul (MRO)'],
      am: ['ሲኤንሲ ማሽኒንግ', 'መሳሪያ እና ዳይ መስራት', 'አጠቃላይ የብረታ ብረት ስራ', 'ጥገና፣ સમારકામ እና እድሳት (MRO)']
    },
    productsOrServices: {
      en: ['Custom Components', 'Spare Parts Manufacturing', 'Prototyping Services', 'Industrial Maintenance'],
      am: ['ብጁ አካላት', 'መለዋወጫ ማምረት', 'የፕሮቶታይፕ አገልግሎቶች', 'የኢንዱስትሪ ጥገና']
    },
    image: 'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=1920&auto=format&fit=crop',
    coordinates: { top: '40%', left: '40%' },
    facilityPhotos: [],
    technicalHighlights: { en: [], am: [] },
    contactPerson: 'Ms. F. Alemayehu',
    status: 'Online',
    divisionalContact: { email: 'inquiries.geig@deig.gov', phone: '+251-11-555-0088', address: 'GEIG Center, Capital City' }
  },
  {
    id: 'haei',
    shortName: 'HAEI',
    fullName: {
        en: 'Hommicho Ammunition Engineering Industry',
        am: 'ሆሚቾ የጥይት ምህንድስና ኢንዱስትሪ'
    },
    description: {
        en: 'A core provider of ammunition, from small caliber to heavy artillery. HAEI also excels in heavy engineering and manufacturing, supporting broad defense production needs with precision and scale.',
        am: 'ከትንሽ ካሊበር እስከ ከባድ መድፍ ድረስ የጥይት አቅርቦት ዋና አቅራቢ ነው። ሆሚቾ በከባድ ምህንድስና እና በማኑፋክቸሪንግ ዘርፍም የላቀ ሲሆን፣ ሰፊ የመከላከያ ምርት ፍላጎቶችን በትክክለኛነት እና በስፋት ይደግፋል።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.995-4.428" /></svg>`,
    capabilities: {
        en: ['Ammunition Manufacturing', 'Propellant and Explosives Production', 'Ballistic Testing', 'Quality Assurance', 'Heavy Engineering & Manufacturing'],
        am: ['የጥይት ማምረት', 'ፕሮፔላንት እና ፈንጂ ማምረት', 'የባለስቲክ ሙከራ', 'የጥራት ማረጋገጫ', 'ከባድ ምህንድስና እና ማምረት']
    },
    productsOrServices: {
        en: ['Small Caliber Ammunition', 'Mortar Shells', 'Artillery Projectiles', 'Specialized Ordnance'],
        am: ['አነስተኛ ካሊበር ጥይቶች', 'የሞርታር ሼሎች', 'የመድፍ ጥይቶች', 'ልዩ የጦር መሳሪያዎች']
    },
    image: 'https://images.unsplash.com/photo-1678662999051-6339d3a21a88?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1593106578502-28fa7475d129?q=80&w=1920&auto=format&fit=crop',
    coordinates: { top: '70%', left: '45%' },
    facilityPhotos: [
        'https://images.unsplash.com/photo-1593106578502-28fa7475d129?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    technicalHighlights: {
        en: ['Automated high-volume production lines', 'Advanced propellant formulation research', 'Non-destructive testing using digital radiography', 'ISO-certified quality control labs'],
        am: ['ከፍተኛ መጠን ያለው አውቶማቲክ የማምረቻ መስመሮች', 'የላቀ የፕሮፔላንት ቀመር ምርምር', 'ዲጂታል ራዲዮግራፊን በመጠቀም አጥፊ ያልሆነ ሙከራ', 'በ ISO የተረጋገጡ የጥራት ቁጥጥር ላብራቶሪዎች']
    },
    contactPerson: 'Mr. K. Belay',
    status: 'Online',
    divisionalContact: { email: 'inquiries.haei@deig.gov', phone: '+251-22-119-0011', address: 'HAEI Main Complex, Hommicho Industrial Zone' }
  },
  {
    id: 'gaei',
    shortName: 'GAEI',
    fullName: {
        en: 'Gafat Armament Engineering Industry',
        am: 'ጋፋት የጦር መሳሪያዎች ምህንድስና ኢንዱስትሪ'
    },
    description: {
        en: 'Specializes in the design, development, and production of a wide range of armament systems, from small arms to advanced ordnance. GAEI is a leader in defense technology production, delivering reliable and effective weapon systems.',
        am: 'ከትንሽ የጦር መሳሪያዎች እስከ የላቁ የጦር መሳሪያዎች ድረስ ያሉ ሰፊ የጦር መሣሪያ ስርዓቶችን በመንደፍ፣ በማልማት እና በማምረት ላይ ያተኮረ ነው። ጋፋት አስተማማኝ እና ውጤታማ የጦር መሣሪያ ስርዓቶችን በማቅረብ በመከላከያ ቴክኖሎጂ ምርት ውስጥ መሪ ነው።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.471-2.471a1.282 1.282 0 00-1.814-1.814L9.606 13.356m1.814 1.814L8.594 16.2a1.282 1.282 0 00-1.813-1.813L9.606 13.356m1.814 1.814L15.17 11.42m0 0l2.471-2.471a1.282 1.282 0 00-1.814-1.814L13.356 9.606m1.814 1.814L16.2 8.594a1.282 1.282 0 00-1.813-1.813L13.356 9.606m1.814 1.814l-5.877-5.877A2.652 2.652 0 003.75 9.172l5.877 5.877m1.814 1.814l-2.471 2.471a1.282 1.282 0 001.814 1.814L11.42 15.17z" /></svg>`,
    capabilities: {
        en: ['Small Arms Manufacturing', 'Ordnance Systems', 'Ballistic Testing', 'Advanced Materials Research'],
        am: ['አነስተኛ የጦር መሳሪያዎች ማምረት', 'የጦር መሣሪያ ስርዓቶች', 'የባለስቲክ ሙከራ', 'የላቀ የቁሳቁስ ምርምር']
    },
    productsOrServices: {
        en: ['Next-Gen Assault Rifles', 'Mortar Systems', 'Anti-Tank Guided Missiles', 'Advanced Ammunition'],
        am: ['ቀጣይ ትውልድ ጠመንጃዎች', 'የሞርታር ስርዓቶች', 'ፀረ-ታንክ ሚሳይሎች', 'የላቁ ጥይቶች']
    },
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1607228844368-e6495b452e25?q=80&w=1920&auto=format&fit=crop',
    coordinates: { top: '25%', left: '30%' },
    facilityPhotos: [
        'https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1632765483046-7c152b1a6294?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1607228844368-e6495b452e25?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    technicalHighlights: {
        en: ['Precision barrel rifling via CNC technology', 'Development of lightweight composite materials', 'Advanced ballistic simulation and modeling', 'Robotic-assisted assembly for complex systems'],
        am: ['በሲኤንሲ ቴክኖሎጂ ትክክለኛ የበርሜል ራይፍሊንግ', 'ቀላል ክብደት ያላቸው የተቀናጁ ቁሶች ልማት', 'የላቀ የባለስቲክ ማስመሰል እና ሞዴሊንግ', 'ለተወሳሰቡ ስርዓቶች በሮቦት የታገዘ ስብሰባ']
    },
    contactPerson: 'Dr. S. Makonnen',
    status: 'Online',
    divisionalContact: { email: 'inquiries.gaei@deig.gov', phone: '+251-33-331-0022', address: 'GAEI Proving Grounds, Gafat' }
  },
  {
    id: 'bvei',
    shortName: 'BVEIG',
    fullName: {
      en: 'Bishoftu Vehicle Engineering Industry Group',
      am: 'ቢሾፍቱ የተሽከርካሪ ምህንድስና ኢንዱስትሪ ቡድን'
    },
    description: {
      en: 'Leads the research, development, and production of military vehicles. BVEIG delivers a range of tactical and armored vehicles designed for superior mobility, survivability, and mission effectiveness.',
      am: 'የወታደራዊ ተሽከርካሪዎችን ምርምር፣ ልማት እና ምርት ይመራል። ቢሾፍቱ ለላቀ ተንቀሳቃሽነት፣ ህልውና እና የተልዕኮ ውጤታማነት የተነደፉ የተለያዩ ታክቲካል እና ጋሻ ተሽከርካሪዎችን ያቀርባል።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5" /></svg>`,
    capabilities: {
      en: ['Vehicle Design & Prototyping', 'Assembly Line Production', 'Vehicle Maintenance & Overhaul', 'Custom Vehicle Modification'],
      am: ['የተሽከርካሪ ዲዛይን እና ፕሮቶታይፒንግ', 'የመገጣጠሚያ መስመር ምርት', 'የተሽከርካሪ ጥገና እና እድሳት', 'ብጁ የተሽከርካሪ ማሻሻያ']
    },
    productsOrServices: {
      en: ['Mine-Resistant Ambush Protected (MRAP) Vehicles', 'Tactical Utility Vehicles', 'Mobile Command Centers', 'Specialized Transport Systems'],
      am: ['ከፈንጂ ጥቃት የሚከላከሉ ተሽከርካሪዎች (MRAP)', 'ታክቲካል መገልገያ ተሽከርካሪዎች', 'ተንቀሳቃሽ የትዕዛዝ ማዕከላት', 'ልዩ የትራንስፖርት ስርዓቶች']
    },
    image: 'https://images.unsplash.com/photo-1603512338521-4b18218a5541?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1558228339-382a3b04a919?q=80&w=1920&auto=format&fit=crop',
    coordinates: { top: '52%', left: '55%' },
    facilityPhotos: [
        'https://images.unsplash.com/photo-1560263823-79a0f144366e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1618961734760-4c34b43d454a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1558228339-382a3b04a919?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    technicalHighlights: {
      en: ['Modular vehicle architecture for multi-mission capability', 'Advanced armor integration and testing facilities', 'Robotic welding systems for chassis fabrication', 'In-house engine and powertrain diagnostics'],
      am: ['ለብዙ ተልዕኮ ችሎታ ያለው ሞጁላር የተሽከርካሪ አርክቴክቸር', 'የላቀ የጋሻ ውህደት እና የሙከራ ተቋማት', 'ለቻሲስ ማምረቻ የሮቦቲክ ብየዳ ስርዓቶች', 'የቤት ውስጥ ሞተር እና የኃይል ማስተላለፊያ ምርመራዎች']
    },
    contactPerson: 'Mr. Y. Hailu',
    status: 'Online',
    divisionalContact: { email: 'inquiries.bvei@deig.gov', phone: '+251-22-112-0033', address: 'BVEI Assembly Plant, Bishoftu' }
  },
  {
    id: 'bpi',
    shortName: 'BPIG',
    fullName: {
      en: 'Brana Printing & Packaging Industry Group',
      am: 'ብራና ማተሚያ እና ማሸጊያ ኢንዱስትሪ ቡድን'
    },
    description: {
      en: 'Provides highly secure printing and packaging solutions for sensitive government and military applications, ensuring document integrity and anti-counterfeiting through advanced technologies.',
      am: 'ለስሱ የመንግስት እና የወታደራዊ መተግበሪያዎች ከፍተኛ ደህንነት ያለው የህትመት እና የማሸጊያ መፍትሄዎችን ይሰጣል፣ ይህም የሰነድ ታማኝነትን እና ፀረ-ሀሰተኛነትን በላቁ ቴክኖሎጂዎች ያረጋግጣል።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.32 0c.045-.247.082-.496.111-.745" /></svg>`,
    capabilities: {
      en: ['Secure Document Printing', 'Industrial Labeling', 'Ruggedized Packaging', 'Anti-Counterfeiting Solutions'],
      am: ['ደህንነቱ የተጠበቀ የሰነድ ህትመት', 'የኢንዱስትሪ መለያ መስጠት', 'ጠንካራ ማሸጊያ', 'የፀረ-ሀሰተኛ መፍትሄዎች']
    },
    productsOrServices: {
      en: ['Secure ID and Credential Systems', 'Military Equipment Packaging', 'Logistics & Supply Chain Labeling', 'Tactical Manuals & Documentation'],
      am: ['ደህንነቱ የተጠበቀ መታወቂያ እና የምስክር ወረቀት ስርዓቶች', 'የወታደራዊ መሳሪያዎች ማሸጊያ', 'የሎጂስቲክስ እና የአቅርቦት ሰንሰለት መለያ መስጠት', 'ታክቲካል መመሪያዎች እና ሰነዶች']
    },
    image: 'https://images.unsplash.com/photo-1563453392212-9a3b0c26a8c1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1563453392212-9a3b0c26a8c1?q=80&w=1920&auto=format&fit',
    coordinates: { top: '48%', left: '48%' },
    facilityPhotos: [
        'https://images.unsplash.com/photo-1632790977430-e8371190ee2b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1586528116311-06924151d11a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    technicalHighlights: {
      en: ['Multi-layered holographic security features', 'Automated, secure packaging for sensitive materials', 'Digital watermarking for document authentication', 'Climate-controlled secure storage facilities'],
      am: ['ባለብዙ ሽፋን የሆሎግራፊክ ደህንነት ባህሪያት', 'ለስሱ ቁሳቁሶች አውቶማቲክ፣ ደህንነቱ የተጠበቀ ማሸጊያ', 'ለሰነድ ማረጋገጫ ዲጂታል የውሃ ምልክት', 'የአየር ንብረት ቁጥጥር የሚደረግባቸው አስተማማኝ የማከማቻ ተቋማት']
    },
    contactPerson: 'Mrs. L. Assefa',
    status: 'Maintenance',
    divisionalContact: { email: 'inquiries.bpi@deig.gov', phone: '+251-11-555-0044', address: 'Brana Printing & Packaging HQ, Addis Ababa' }
  },
  {
    id: 'leei',
    shortName: 'LEEIG',
    fullName: {
      en: 'Legedadi Radio & Electronics Engineering Industry Group',
      am: 'ለገዳዲ ሬዲዮ እና ኤሌክትሮኒክስ ምህንድስና ኢንዱስትሪ ቡድን'
    },
    description: {
      en: 'Develops critical electronic systems, including advanced sensors, radar, and secure communication modules. LEEIG is at the forefront of C4ISTAR technology for modern defense operations.',
      am: 'የላቁ ሴንሰሮችን፣ ራዳርን እና ደህንነቱ የተጠበቀ የመገናኛ ሞጁሎችን ጨምሮ ወሳኝ የኤሌክትሮኒክስ ስርዓቶችን ያዘጋጃል። ለገዳዲ ለዘመናዊ የመከላከያ ስራዎች በ C4ISTAR ቴክኖሎጂ ግንባር ቀደም ነው።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M12 4.5v-1.5m0 18v-1.5M15.75 21v-1.5M19.5 8.25H21M19.5 15.75H21M12 19.5v-1.5" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25v7.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25z" /></svg>`,
    capabilities: {
      en: ['Secure Radio Communications', 'Radar Systems Development', 'Sensor Integration', 'Electronic Warfare Systems'],
      am: ['ደህንነቱ የተጠበቀ የሬዲዮ ግንኙነቶች', 'የራዳር ስርዓቶች ልማት', 'የሴንሰር ውህደት', 'የኤሌክትሮኒክስ የጦርነት ስርዓቶች']
    },
    productsOrServices: {
      en: ['Battlefield Management Systems', 'Air Surveillance Radar', 'UAV Avionics', 'Encrypted Communication Networks'],
      am: ['የጦር ሜዳ አስተዳደር ስርዓቶች', 'የአየር ክትትል ራዳር', 'የሰው አልባ አውሮፕላን አቪዮኒክስ', 'የተመሰጠሩ የመገናኛ አውታረ መረቦች']
    },
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1534221949793-35072b785eda?q=80&w=1920&auto=format&fit=crop',
    coordinates: { top: '55%', left: '50%' },
    facilityPhotos: [
        'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1534221949793-35072b785eda?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    technicalHighlights: {
      en: ['Phased-array radar technology development', 'In-house Gallium Nitride (GaN) semiconductor fabrication', 'Software-Defined Radio (SDR) platforms', 'Anechoic chambers for RF testing'],
      am: ['የደረጃ-ድርድር ራዳር ቴክኖሎጂ ልማት', 'የቤት ውስጥ ጋሊየም ናይትራይድ (GaN) ሴሚኮንዳክተር ማምረት', 'በሶፍትዌር-የተገለጸ ሬዲዮ (SDR) መድረኮች', 'ለ RF ሙከራ የአኔኮይክ ክፍሎች']
    },
    contactPerson: 'Eng. M. Tadesse',
    status: 'Online',
    divisionalContact: { email: 'inquiries.leei@deig.gov', phone: '+251-11-661-0055', address: 'LEEI Electronics Campus, Legedadi' }
  },
  {
    id: 'rig',
    shortName: 'RIG',
    fullName: {
      en: 'Research & Innovation Group',
      am: 'የምርምር እና ፈጠራ ቡድን'
    },
    description: {
      en: 'Drives future capabilities through cutting-edge research, development, and strategic technological exploration across all defense domains.',
      am: 'በሁሉም የመከላከያ ጎራዎች ውስጥ በከፍተኛ ደረጃ ምርምር፣ ልማት እና ስልታዊ የቴክኖሎጂ ፍለጋ አማካኝነት የወደፊት ችሎታዎችን ያንቀሳቅሳል።'
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.239.05.48.09.72.128a25.043 25.043 0 011.5 0c.24-.038.481-.078.72-.128M15 14.5l-2.25-2.25a2.25 2.25 0 00-.659-1.591V3.104m6.15 3.693c.24-.038.48-.077.72-.128a25.029 25.029 0 00-3.14 0c.24.05.48.09.72.128a25.043 25.043 0 011.5 0" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 14.25V19.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 19.5v-5.25m-18 0l2.25-2.25a2.25 2.25 0 011.591-.659h9.918a2.25 2.25 0 011.591.659L21 14.25" /></svg>`,
    capabilities: {
      en: ['Advanced Materials', 'AI & Autonomy', 'Cyber Warfare', 'Directed Energy'],
      am: ['የላቁ ቁሶች', 'ሰው ሰራሽ የማሰብ ችሎታ እና ራስን በራስ የማስተዳደር', 'የሳይበር ጦርነት', 'ቀጥተኛ ኢነርጂ']
    },
    productsOrServices: {
      en: ['Technology Demonstrators', 'Future Concept Studies', 'Patent Development', 'Strategic Foresight'],
      am: ['የቴክኖሎጂ ማሳያዎች', 'የወደፊት ፅንሰ-ሀሳብ ጥናቶች', 'የፓተንት ልማት', 'ስልታዊ አርቆ አሳቢነት']
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-285f231f7927?q=80&w=1920&auto=format&fit',
    coordinates: { top: '35%', left: '65%' },
    facilityPhotos: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554474623-4b675124c29c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-285f231f7927?q=80&w=800&auto=format&fit=crop',
    ],
    technicalHighlights: {
      en: ['Quantum computing research initiative', 'Neural network development for autonomous systems', 'Stealth materials and signature management studies', 'Advanced simulation and digital twin labs'],
      am: ['የኳንተም ኮምፒውቲንግ ምርምር ተነሳሽነት', 'ለራስ ገዝ ስርዓቶች የነርቭ አውታረ መረብ ልማት', 'የማይታዩ ቁሶች እና የፊርማ አስተዳደር ጥናቶች', 'የላቀ ሲሙሌሽን እና ዲጂታል መንታ ላብራቶሪዎች']
    },
    contactPerson: 'Dr. D. Tadesse',
    status: 'Online',
    divisionalContact: { email: 'inquiries.rig@deig.gov', phone: '+251-11-555-0066', address: 'DEIG R&D Center, Addis Ababa' }
  },
];

export const VACANCIES: Vacancy[] = [
    {
        id: 'vac1',
        title: { en: 'Senior Mechanical Engineer', am: 'ከፍተኛ የሜካኒካል መሐንዲስ' },
        division: 'HAEI',
        location: 'Hommicho',
        description: {
            en: 'Lead the design and development of heavy mechanical systems for defense applications. Requires 8+ years of experience in industrial design and mechanical engineering.',
            am: 'ለመከላከያ መተግበሪያዎች የከባድ ሜካኒካል ስርዓቶችን ዲዛይን እና ልማት ይምሩ። በኢንዱስትሪ ዲዛይን እና በሜካኒካል ምህንድስና 8+ ዓመት ልምድ ይጠይቃል።'
        },
        responsibilities: {
            en: ['Lead design projects from concept to production.', 'Perform complex calculations to ensure system safety and performance.', 'Collaborate with cross-functional teams.'],
            am: ['የዲዛይን ፕሮጀክቶችን ከፅንሰ-ሀሳብ እስከ ምርት ድረስ ይምሩ።', 'የስርዓት ደህንነትን እና አፈፃፀምን ለማረጋገጥ ውስብስብ ስሌቶችን ያካሂዱ።', 'ከሌሎች ቡድኖች ጋር ይተባበሩ።']
        },
        qualifications: {
            en: ['BSc/MSc in Mechanical Engineering.', '8+ years of relevant experience.', 'Proficiency in SolidWorks, CATIA, or similar CAD software.'],
            am: ['በሜካኒካል ምህንድስና የመጀመሪያ/ሁለተኛ ዲግሪ።', '8+ ዓመት σχετική ልምድ።', 'በ SolidWorks, CATIA, ወይም ተመሳሳይ CAD ሶፍትዌር ላይ ብቃት።']
        },
        benefits: {
            en: ['Competitive salary and benefits package.', 'Opportunity for professional growth.', 'Work on nationally significant projects.'],
            am: ['ተወዳዳሪ ደመወዝ እና የጥቅማጥቅም ፓኬጅ።', 'ለሙያዊ እድገት ዕድል።', 'በሀገር አቀፍ ደረጃ ወሳኝ በሆኑ ፕሮጀክቶች ላይ ይስሩ።']
        },
        experienceLevel: 'Senior',
        status: 'Open',
        type: 'Full-Time',
        closingDate: '2024-12-31'
    },
    {
        id: 'vac2',
        title: { en: 'Embedded Systems Developer', am: 'የተከተቱ ስርዓቶች ገንቢ' },
        division: 'LEEIG',
        location: 'Legedadi',
        description: {
            en: 'Develop and maintain software for embedded systems in advanced electronics. Proficiency in C/C++ required.',
            am: 'በላቁ ኤሌክትሮኒክስ ውስጥ ላሉ የተከተቱ ስርዓቶች ሶፍትዌር ያዳብሩ እና ይጠብቁ። በ C/C++ ውስጥ ብቃት ያስፈልጋል።'
        },
        responsibilities: {
            en: ['Design and implement software of embedded devices and systems.', 'Design, develop, code, test and debug system software.', 'Analyze and enhance efficiency, stability and scalability of system resources.'],
            am: ['ለተከተቱ መሣሪያዎች እና ስርዓቶች ሶፍትዌር ይንደፉ እና ይተግብሩ።', 'የስርዓት ሶፍትዌርን ይንደፉ፣ ያዳብሩ፣ ይፃፉ፣ ይሞክሩ እና ስህተቶችን ያስተካክሉ።', 'የስርዓት ሀብቶችን ውጤታማነት፣ መረጋጋት እና ልኬታማነት ይተንትኑ እና ያሳድጉ።']
        },
        qualifications: {
            en: ['BS degree in Computer Science or Engineering.', 'Proven working experience in software engineering.', 'Experience in hands-on development and troubleshooting on embedded targets.'],
            am: ['በኮምፒውተር ሳይንስ ወይም ምህንድስና የመጀመሪያ ዲግሪ።', 'በሶፍትዌር ምህንድስና የተረጋገጠ የሥራ ልምድ።', 'በተከተቱ ኢላማዎች ላይ በተግባራዊ ልማት እና መላ ፍለጋ ልምድ።']
        },
        benefits: {
            en: ['Health insurance.', 'Paid time off.', 'Professional development assistance.'],
            am: ['የጤና መድን።', 'የሚከፈልበት የእረፍት ጊዜ።', 'የሙያ ልማት ድጋፍ።']
        },
        experienceLevel: 'Mid-Level',
        status: 'Open',
        type: 'Full-Time',
        closingDate: '2024-11-30'
    },
    {
        id: 'vac3',
        title: { en: 'Vehicle Assembly Technician', am: 'የተሽከርካሪ ስብሰባ ቴክኒሺያን' },
        division: 'BVEIG',
        location: 'Bishoftu',
        description: {
            en: 'Assemble and maintain military-grade vehicles. Experience with automotive systems is a plus.',
            am: 'የወታደራዊ ደረጃ ተሽከርካሪዎችን ያሰባስቡ እና ይጠብቁ። ከአውቶሞቲቭ ስርዓቶች ጋር ልምድ ያለው ይመረጣል።'
        },
        responsibilities: {
            en: ['Read and interpret assembly instructions and blueprints.', 'Use tools to assemble components.', 'Perform quality control checks.'],
            am: ['የመገጣጠሚያ መመሪያዎችን እና የንድፍ ሰነዶችን ያንብቡ እና ይተርጉሙ።', 'አካላትን ለመገጣጠም መሳሪያዎችን ይጠቀሙ።', 'የጥራት ቁጥጥር ፍተሻዎችን ያካሂዱ።']
        },
        qualifications: {
            en: ['High school diploma or equivalent.', 'Experience as a technician or in a similar role.', 'Good communication and teamwork skills.'],
            am: ['የሁለተኛ ደረጃ ዲፕሎማ ወይም ተመጣጣኝ።', 'እንደ ቴክኒሺያን ወይም በተመሳሳይ ሚና ልምድ።', 'ጥሩ የግንኙነት እና የቡድን ሥራ ችሎታዎች።']
        },
        benefits: {
            en: ['On-the-job training.', 'Career advancement opportunities.', 'Safe working environment.'],
            am: ['በሥራ ላይ ሥልጠና።', 'የሥራ እድገት ዕድሎች።', 'ደህንነቱ የተጠበቀ የሥራ አካባቢ።']
        },
        experienceLevel: 'Entry-Level',
        status: 'Closed',
        type: 'Contract',
        closingDate: '2024-10-15'
    },
    {
        id: 'vac4',
        title: { en: 'RF Communications Engineer', am: 'የ RF ግንኙነት መሐንዲስ' },
        division: 'LEEIG',
        location: 'Addis Ababa',
        description: {
            en: 'Design and test radio frequency communication systems for secure defense networks.',
            am: 'ለደህንነታቸው የተጠበቀ የመከላከያ አውታረ መረቦች የሬዲዮ ፍሪኩዌንሲ የመገናኛ ስርዓቶችን ይንደፉ እና ይሞክሩ።'
        },
        responsibilities: {
            en: [],
            am: []
        },
        qualifications: {
            en: [],
            am: []
        },
        benefits: {
            en: [],
            am: []
        },
        experienceLevel: 'Mid-Level',
        status: 'Open',
        type: 'Full-Time',
        closingDate: '2024-12-15'
    },
    {
        id: 'vac5',
        title: { en: 'AI Research Scientist', am: 'የሰው ሰራሽ የማሰብ ችሎታ ምርምር ሳይንቲስት' },
        division: 'RIG',
        location: 'Addis Ababa',
        description: {
            en: 'Join our new Research & Innovation Group to work on cutting-edge AI for autonomous systems. PhD in a relevant field required.',
            am: 'ለራስ ገዝ ስርዓቶች በዘመናዊ AI ላይ ለመስራት አዲሱን የምርምር እና ፈጠራ ቡድናችንን ይቀላቀሉ። በሚመለከተው መስክ የፒኤችዲ ዲግሪ ያስፈልጋል።'
        },
        responsibilities: {
            en: [],
            am: []
        },
        qualifications: {
            en: [],
            am: []
        },
        benefits: {
            en: [],
            am: []
        },
        experienceLevel: 'Senior',
        status: 'Open',
        type: 'Full-Time',
        closingDate: '2025-01-10'
    }
];

export const APPLICANTS: Applicant[] = [
    { id: 'app1', name: 'Abebe Bikila', email: 'a.bikila@example.com', vacancyId: 'vac1', cvUrl: '/cv/abebecv.pdf', status: 'Reviewed', submittedDate: '2024-10-01', notes: 'Strong background in CAD software.', rating: 4 },
    { id: 'app2', name: 'Tirunesh Dibaba', email: 't.dibaba@example.com', vacancyId: 'vac1', cvUrl: '/cv/tiruneshcv.pdf', status: 'Interview', submittedDate: '2024-10-03', notes: 'Excellent references from previous role.', rating: 5 },
    { id: 'app3', name: 'Kenenisa Bekele', email: 'k.bekele@example.com', vacancyId: 'vac2', cvUrl: '/cv/kenenisacv.pdf', status: 'New', submittedDate: '2024-10-10', notes: '', rating: 0 },
    { id: 'app4', name: 'Haile Gebrselassie', email: 'h.gebrselassie@example.com', vacancyId: 'vac2', cvUrl: '/cv/hailecv.pdf', status: 'Rejected', submittedDate: '2024-09-28', notes: 'Lacks required C++ experience.', rating: 2 },
    { id: 'app5', name: 'Derartu Tulu', email: 'd.tulu@example.com', vacancyId: 'vac4', cvUrl: '/cv/derartucv.pdf', status: 'New', submittedDate: '2024-10-12', notes: '', rating: 0 },
    { id: 'app6', name: 'Meseret Defar', email: 'm.defar@example.com', vacancyId: 'vac5', cvUrl: '/cv/meseretcv.pdf', status: 'Hired', submittedDate: '2024-09-15', notes: 'Exceptional candidate. Accepted offer.', rating: 5 },
    { id: 'app7', name: 'Fatuma Roba', email: 'f.roba@example.com', vacancyId: 'vac1', cvUrl: '/cv/fatumacv.pdf', status: 'New', submittedDate: '2024-10-11', notes: '', rating: 0 },
];


export const MILESTONES: Milestone[] = [
// FIX: Added missing 'id' property to Milestone objects
  { id: 'ms1', year: '1998', event: { en: 'Foundation of DEIG established as a key national strategic project.', am: 'የመኢኢኮ መሰረት እንደ ቁልፍ ሀገራዊ ስትራቴጂካዊ ፕሮጀክት ተቋቋመ።' } },
  { id: 'ms2', year: '2003', event: { en: 'First heavy vehicle assembly line inaugurated at BVEI.', am: 'የመጀመሪያው የከባድ ተሽከርካሪ መሰብሰቢያ መስመር በቢሾፍቱ ተመረቀ።' } },
  { id: 'ms3', year: '2008', event: { en: 'GAEI successfully develops and tests its first indigenous assault rifle.', am: 'ጋፋት የመጀመሪያውን ሀገር በቀል ጠመንጃ በተሳካ ሁኔታ አዘጋጅቶ ፈተሸ።' } },
  { id: 'ms4', year: '2012', event: { en: 'LEEI opens state-of-the-art microelectronics and sensor lab.', am: 'ለገዳዲ ዘመናዊ የማይክሮ ኤሌክትሮኒክስ እና ሴንሰር ላብራቶሪ ከፈተ።' } },
  { id: 'ms5', year: '2016', event: { en: 'Launch of the national secure communication network by LEEI.', am: 'በለገዳዲ የሀገር አቀፍ ደህንነቱ የተጠበቀ የመገናኛ አውታር ተጀመረ።' } },
  { id: 'ms6', year: '2020', event: { en: 'DEIG surpasses 500 completed major projects for national defense.', am: 'መኢኢኮ ለሀገር መከላከያ ከ500 በላይ ዋና ዋና ፕሮጀክቶችን አጠናቋል።' } },
  { id: 'ms7', year: '2023', event: { en: 'Unveiling of the next-generation autonomous surveillance drone program.', am: 'የቀጣዩ ትውልድ ራስ ገዝ የክትትል ድሮን ፕሮግራም ይፋ ሆነ።' } },
];

export const NEWS_ARTICLES: NewsArticle[] = [
    {
        id: 'news1',
        title: { en: 'Project Sentinel Goes Live', am: 'ፕሮጀክት ሴንቲነል ስራ ጀመረ' },
        date: '2023-10-10',
        content: {
            en: 'LEEI successfully deploys the next-generation national surveillance sensor network, enhancing situational awareness across all operational theaters.',
            am: 'ለገዳዲ የቀጣዩን ትውልድ ሀገራዊ የክትትል ሴንሰር ኔትዎርክ በተሳካ ሁኔታ በመዘርጋት በሁሉም የኦፕሬሽን ቲያትሮች ላይ ያለውን የግንዛቤ ደረጃ አሳድጓል።'
        },
        category: 'Innovation & Technology',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news2',
        title: { en: 'BVEI Unveils New Tactical Vehicle', am: 'ቢሾፍቱ አዲስ ታክቲካል ተሽከርካሪ ይፋ አደረገ' },
        date: '2023-09-25',
        content: {
            en: 'The \'Raptor\' MRAP vehicle completes rigorous field testing, setting new standards for troop protection and mobility in hostile environments.',
            am: 'የ\'ራፕተር\' MRAP ተሽከርካሪ ጥብቅ የመስክ ሙከራዎችን በማጠናቀቅ ለሰራዊት ጥበቃ እና ለተንቀሳቃሽነት አዲስ መስፈርት አስቀምጧል።'
        },
        category: 'Industry News',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1603512338521-4b18218a5541?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news3',
        title: { en: 'HAEI Expands Production Capacity', am: 'ሆሚቾ የማምረት አቅሙን አስፋፋ' },
        date: '2023-09-15',
        content: {
            en: 'A new state-of-the-art manufacturing facility has been inaugurated to meet growing demands for advanced ammunition and ordnance systems.',
            am: 'ለላቁ ጥይቶች እና የጦር መሳሪያዎች ስርዓቶች እያደገ የመጣውን ፍላጎት ለማሟላት አዲስ ዘመናዊ የማምረቻ ተቋም ተመርቋል።'
        },
        category: 'Industry News',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news4',
        title: { en: 'GAEI Achieves ISO 9001:2015', am: 'ጋፋት ISO 9001:2015 ማረጋገጫ አገኘ' },
        date: '2023-08-21',
        content: {
            en: 'Gafat Armament Engineering Industry has been awarded the ISO 9001:2015 certification for its commitment to quality management systems.',
            am: 'ጋፋት የጦር መሳሪያዎች ምህንድስና ኢንዱስትሪ ለጥራት አያያዝ ስርዓቶች ባለው ቁርጠኝነት የ ISO 9001:2015 የምስክር ወረቀት ተሸልሟል።'
        },
        category: 'Announcements',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news5',
        title: { en: 'DEIG Signs International Tech Pact', am: 'መኢኢኮ ዓለም አቀፍ የቴክኖሎጂ ስምምነት ፈረመ' },
        date: '2023-07-30',
        content: {
            en: 'A new strategic partnership aims to foster collaboration in developing next-generation electronic warfare and counter-measure technologies.',
            am: 'አዲስ ስትራቴጂካዊ አጋርነት የቀጣይ ትውልድ የኤሌክትሮኒክስ ጦርነት እና የመከላከያ ቴክኖሎጂዎችን በማልማት ረገድ ትብብርን ለማጎልበት ያለመ ነው።'
        },
        category: 'Projects',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news6',
        title: { en: 'New R&D Center in Legedadi', am: 'በለገዳዲ አዲስ የምርምር እና ልማት ማዕከል' },
        date: '2023-06-12',
        content: {
            en: 'LEEI opens a new Research & Development hub focused on radar systems and secure satellite communications, bolstering national tech sovereignty.',
            am: 'ለገዳዲ በራዳር ሲስተሞች እና ደህንነቱ በተጠበቀ የሳተላይት ግንኙነቶች ላይ ያተኮረ አዲስ የምርምር እና ልማት ማዕከል በመክፈት የሀገርን የቴክኖሎጂ ሉዓላዊነት አጠናክሯል።'
        },
        category: 'Headquarters Updates',
        status: 'Draft',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news7',
        title: { en: 'DEIG Issues Official Statement on Regional Security', am: 'DEIG Issues Official Statement on Regional Security' },
        date: '2023-11-05',
        content: {
            en: 'The Defense Industry Engineering Group released an official statement today addressing its role and commitment to maintaining regional stability through technological superiority and strategic deterrence.',
            am: 'The Defense Industry Engineering Group released an official statement today addressing its role and commitment to maintaining regional stability through technological superiority and strategic deterrence.'
        },
        category: 'Press Releases',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1586922341279-17212270e5b5?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'news8',
        title: { en: 'Annual Defense Technology Expo Announced', am: 'Annual Defense Technology Expo Announced' },
        date: '2023-11-20',
        content: {
            en: 'DEIG will host its annual Defense Technology Exposition from January 15-17, 2024. The event will showcase the latest advancements in national defense technology and feature live demonstrations.',
            am: 'DEIG will host its annual Defense Technology Exposition from January 15-17, 2024. The event will showcase the latest advancements in national defense technology and feature live demonstrations.'
        },
        category: 'Events & Exhibitions',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop'
    }
];

export const TENDERS: Tender[] = [
  {
    id: 'ten1',
    title: { en: 'Supply of High-Grade Titanium Alloy', am: 'ከፍተኛ ደረጃ ያለው የታይታኒየም አሎይ አቅርቦት' },
    reference: 'DEIG-PROC-2024-001',
    status: 'Open',
    publishedDate: '2024-10-15',
    closingDate: '2024-11-15',
    description: {
      en: 'Request for proposal for the long-term supply of certified high-grade titanium alloy sheets and bars for aerospace and armament applications.',
      am: 'ለኤሮስፔስ እና ለጦር መሳሪያዎች አፕሊኬሽኖች የተረጋገጠ ከፍተኛ ደረጃ ያለው የታይታኒየም አሎይ ንጣፎችን እና ባሮችን ለረጅም ጊዜ ለማቅረብ የቀረበ የውሳኔ ሃሳብ ጥያቄ።'
    }
  },
  {
    id: 'ten2',
    title: { en: 'Advanced Circuit Board Manufacturing Services', am: 'የላቀ የሰርክዩት ቦርድ ማምረቻ አገልግሎቶች' },
    reference: 'DEIG-PROC-2024-002',
    status: 'Open',
    publishedDate: '2024-10-20',
    closingDate: '2024-11-30',
    description: {
      en: 'Seeking qualified vendors for the fabrication and assembly of multi-layer printed circuit boards (PCBs) for secure communication systems.',
      am: 'ለደህንነታቸው የተጠበቀ የመገናኛ ዘዴዎች ባለብዙ-ንብርብር የታተሙ የወረዳ ሰሌዳዎች (ፒሲቢዎች) ለማምረት እና ለመገጣጠም ብቁ የሆኑ አቅራቢዎችን መፈለግ።'
    }
  },
  {
    id: 'ten3',
    title: { en: 'Logistics and Heavy Transport Services', am: 'የሎጂስቲክስ እና የከባድ ትራንስፖርት አገልግሎቶች' },
    reference: 'DEIG-PROC-2023-089',
    status: 'Closed',
    publishedDate: '2023-12-01',
    closingDate: '2024-01-15',
    description: {
      en: 'Contract for nationwide logistics and heavy transport services for oversized military hardware and sensitive equipment. Contract awarded.',
      am: 'ለትላልቅ ወታደራዊ ሃርድዌር እና ስሱ መሳሪያዎች ሀገር አቀፍ የሎጂስቲክስ እና የከባድ ትራንስፖርት አገልግሎት ውል። ውሉ ተሰጥቷል።'
    }
  },
  {
    id: 'ten4',
    title: { en: 'Calibration Services for Testing Equipment', am: 'ለሙከራ መሳሪያዎች የካሊብሬሽን አገልግሎቶች' },
    reference: 'DEIG-PROC-2023-095',
    status: 'Closed',
    publishedDate: '2023-12-10',
    closingDate: '2024-01-20',
    description: {
      en: 'Annual maintenance and calibration contract for ballistic and electronic testing equipment across all DEIG facilities. Contract awarded.',
      am: 'በሁሉም የመኢኢኮ ተቋማት ውስጥ ላሉ የባለስቲክ እና የኤሌክትሮኒክስ መሞከሪያ መሳሪያዎች አመታዊ የጥገና እና የካሊብሬሽን ውል። ውሉ ተሰጥቷል።'
    }
  }
];

export const MEDIA_FOLDERS: MediaFolder[] = [
  { id: 'f1', name: 'Project Images' },
  { id: 'f1-1', name: 'Raptor MRAP', parentId: 'f1' },
  { id: 'f1-2', name: 'Project Sentinel', parentId: 'f1' },
  { id: 'f2', name: 'Press Releases' },
  { id: 'f3', name: 'Corporate Documents' },
  { id: 'f4', name: 'Banners' },
  { id: 'f5', name: 'Facilities' },
  { id: 'f6', name: 'Technology' },
  { id: 'f7', name: 'Corporate' },
];

export const MEDIA_FILES: MediaFile[] = [
  { id: 'm1', name: 'raptor_prototype.jpg', type: 'Image', size: 1200, url: 'https://images.unsplash.com/photo-1558228339-382a3b04a919?q=80&w=800&auto=format&fit=crop', uploadedBy: 'C. Kebede', uploadedAt: '2024-05-20', folderId: 'f1-1', references: 2, dimensions: { width: 1920, height: 1080 } },
  { id: 'm2', name: 'sentinel_sensor_array.png', type: 'Image', size: 850, url: 'https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Dr. B. Solomon', uploadedAt: '2024-05-18', folderId: 'f1-2', references: 1 },
  { id: 'm3', name: 'press_briefing_video.mp4', type: 'Video', size: 25600, url: '#', uploadedBy: 'Admin', uploadedAt: '2024-05-15', folderId: 'f2', references: 1 },
  { id: 'm4', name: 'annual_report_2023.pdf', type: 'Document', size: 5400, url: '#', uploadedBy: 'Gen. A. Abebe', uploadedAt: '2024-04-10', folderId: 'f3', references: 0 },
  { id: 'm5', name: 'homepage_hero_banner.jpg', type: 'Image', size: 2100, url: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1920&auto=format&fit=crop', uploadedBy: 'C. Kebede', uploadedAt: '2024-05-21', folderId: 'f4', references: 1 },
  { id: 'm6', name: 'technical_specs.zip', type: 'Archive', size: 15300, url: '#', uploadedBy: 'Dr. B. Solomon', uploadedAt: '2024-05-19', folderId: 'f1-1', references: 0 },
  { id: 'm7', name: 'raptor_field_test.jpg', type: 'Image', size: 1800, url: 'https://images.unsplash.com/photo-1603512338521-4b18218a5541?q=80&w=800&auto=format&fit=crop', uploadedBy: 'C. Kebede', uploadedAt: '2024-05-22', folderId: 'f1-1', references: 1 },
  { id: 'm8', name: 'procurement_guidelines.pdf', type: 'Document', size: 750, url: '#', uploadedBy: 'Admin', uploadedAt: '2024-05-11', folderId: 'f3', references: 1 },
  { id: 'm9', name: 'heavy_engineering_facility.jpg', type: 'Image', size: 1500, url: 'https://images.unsplash.com/photo-1617789516353-27a972643a6f?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f5', references: 1 },
  { id: 'm10', name: 'electronics_lab.jpg', type: 'Image', size: 1350, url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f6', references: 1 },
  { id: 'm11', name: 'corporate_headquarters.jpg', type: 'Image', size: 1900, url: 'https://images.unsplash.com/photo-1586922341279-17212270e5b5?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f7', references: 1 },
  { id: 'm12', name: 'vehicle_assembly_line.jpg', type: 'Image', size: 1600, url: 'https://images.unsplash.com/photo-1560263823-79a0f144366e?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f5', references: 1 },
  { id: 'm13', name: 'advanced_avionics.jpg', type: 'Image', size: 1400, url: 'https://images.unsplash.com/photo-1534221949793-35072b785eda?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f6', references: 1 },
  { id: 'm14', name: 'sentinel_operations.jpg', type: 'Image', size: 1550, url: 'https://images.unsplash.com/photo-1620712943543-285f231f7927?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f1-2', references: 1 },
  { id: 'm15', name: 'munitions_production.jpg', type: 'Image', size: 1700, url: 'https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f5', references: 1 },
  { id: 'm16', name: 'board_meeting.jpg', type: 'Image', size: 1300, url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-23', folderId: 'f7', references: 1 },
  { id: 'm17', name: 'welding_fabrication.jpg', type: 'Image', size: 1450, url: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f5', references: 1 },
  { id: 'm18', name: 'precision_machinery.jpg', type: 'Image', size: 1650, url: 'https://images.unsplash.com/photo-1632765483046-7c152b1a6294?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f5', references: 1 },
  { id: 'm19', name: 'circuit_board_detail.jpg', type: 'Image', size: 1300, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f6', references: 1 },
  { id: 'm20', name: 'research_laboratory.jpg', type: 'Image', size: 1550, url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f6', references: 1 },
  { id: 'm21', name: 'raptor_in_action.jpg', type: 'Image', size: 1800, url: 'https://images.unsplash.com/photo-1618961734760-4c34b43d454a?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f1-1', references: 1 },
  { id: 'm22', name: 'sentinel_command_center.jpg', type: 'Image', size: 1700, url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f1-2', references: 1 },
  { id: 'm23', name: 'collaborative_workspace.jpg', type: 'Image', size: 1400, url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f7', references: 1 },
  { id: 'm24', name: 'engineering_blueprints.jpg', type: 'Image', size: 1350, url: 'https://images.unsplash.com/photo-1600880292210-85938a023b16?q=80&w=800&auto=format&fit=crop', uploadedBy: 'Admin', uploadedAt: '2024-05-24', folderId: 'f6', references: 1 },
];

export const CONTACT_INQUIRIES: Inquiry[] = [
  // FIX: Updated mock data to conform to new Inquiry type.
  { id: 'inq1', name: 'Potential Supplier Inc.', email: 'contact@supplier.com', subject: 'Partnership Inquiry', message: 'We would like to discuss a potential partnership regarding the supply of high-grade titanium alloy.', status: 'Unread', division: 'Procurement', assignee: null, assigneeId: null, date: '2024-05-23' },
  { id: 'inq2', name: 'Journalist Weekly', email: 'editor@jweekly.com', subject: 'Media Request: Project Sentinel', message: 'We are writing an article about national defense technology and would like a statement on Project Sentinel.', status: 'Read', division: 'Media', assignee: { name: 'C. Kebede' }, assigneeId: 'u2', date: '2024-05-22' },
  { id: 'inq3', name: 'Applicant Name', email: 'applicant@email.com', subject: 'Question about Vacancy #VAC2', message: 'I have a question regarding the required qualifications for the Embedded Systems Developer role.', status: 'Resolved', division: 'HR', assignee: { name: 'HR Manager' }, assigneeId: 'u4', date: '2024-05-21' },
  { id: 'inq4', name: 'Citizen A', email: 'citizen@email.com', subject: 'General Question', message: 'Can you provide more information about your national contribution efforts?', status: 'Unread', division: 'General', assignee: null, assigneeId: null, date: '2024-05-23' },
  { id: 'inq5', name: 'Tech Solutions Ltd.', email: 'sales@techsolutions.com', subject: 'Tender DEIG-PROC-2024-002', message: 'We have a question regarding the technical specifications for the advanced circuit board tender.', status: 'Read', division: 'Procurement', assignee: { name: 'Mr. Y. Hailu' }, assigneeId: 'u-yh', date: '2024-05-20' },
];

export const USERS: User[] = [
    { id: 'u1', name: 'Gen. A. Abebe', email: 'a.abebe@deig.gov', role: 'Admin', lastLogin: '2024-05-23 10:00', status: 'Active' },
    { id: 'u2', name: 'C. Kebede', email: 'c.kebede@deig.gov', role: 'Editor', lastLogin: '2024-05-23 09:30', status: 'Active' },
    { id: 'u3', name: 'Dr. S. Makonnen', email: 's.makonnen@deig.gov', role: 'Industry Manager', lastLogin: '2024-05-22 15:00', status: 'Active' },
    { id: 'u4', name: 'HR Manager', email: 'hr@deig.gov', role: 'HR Manager', lastLogin: '2024-05-23 08:00', status: 'Active' },
    { id: 'u5', name: 'External Auditor', email: 'auditor@external.gov', role: 'Viewer', lastLogin: '2024-05-21 11:00', status: 'Inactive' },
];

export const ROLES: Role[] = [
    { id: 'r1', name: 'Admin', description: 'Full control over the entire system.' },
    { id: 'r2', name: 'Editor', description: 'Can manage news, pages, and media.' },
    { id: 'r3', name: 'Industry Manager', description: 'Manages content for their assigned division.' },
    { id: 'r4', name: 'HR Manager', description: 'Manages vacancies and applications.' },
    { id: 'r5', name: 'Viewer', description: 'Read-only access to specific modules.' },
];

const allPermissions: PermissionAction[] = ['Create', 'Read', 'Update', 'Delete'];
const readOnly: PermissionAction[] = ['Read'];
const readUpdate: PermissionAction[] = ['Read', 'Update'];
const createReadUpdate: PermissionAction[] = ['Create', 'Read', 'Update'];

export const ADMIN_MODULES = ['Dashboard', 'Industry Management', 'News Management', 'Vacancy Management', 'Pages Editor', 'Media Manager', 'Inquiry Management', 'User Management', 'Security & Audit', 'System Settings', 'Utilities'];

export const ROLE_PERMISSIONS: RolePermission[] = [
    // Admin has all permissions
    ...ADMIN_MODULES.map(module => ({ role: 'Admin' as UserRole, module, permissions: allPermissions })),
    // Editor permissions
    { role: 'Editor', module: 'Dashboard', permissions: readOnly },
    { role: 'Editor', module: 'Industry Management', permissions: [] },
    { role: 'Editor', module: 'News Management', permissions: allPermissions },
    { role: 'Editor', module: 'Vacancy Management', permissions: [] },
    { role: 'Editor', module: 'Pages Editor', permissions: createReadUpdate },
    { role: 'Editor', module: 'Media Manager', permissions: allPermissions },
    { role: 'Editor', module: 'Inquiry Management', permissions: readUpdate },
    { role: 'Editor', module: 'User Management', permissions: [] },
    { role: 'Editor', module: 'Security & Audit', permissions: [] },
    { role: 'Editor', module: 'System Settings', permissions: [] },
    { role: 'Editor', module: 'Utilities', permissions: [] },
    // Industry Manager
    { role: 'Industry Manager', module: 'Dashboard', permissions: readOnly },
    { role: 'Industry Manager', module: 'Industry Management', permissions: readUpdate },
    { role: 'Industry Manager', module: 'News Management', permissions: [] },
    { role: 'Industry Manager', module: 'Vacancy Management', permissions: [] },
    { role: 'Industry Manager', module: 'Pages Editor', permissions: [] },
    { role: 'Industry Manager', module: 'Media Manager', permissions: readOnly },
    { role: 'Industry Manager', module: 'Inquiry Management', permissions: [] },
    { role: 'Industry Manager', module: 'User Management', permissions: [] },
    { role: 'Industry Manager', module: 'Security & Audit', permissions: [] },
    { role: 'Industry Manager', module: 'System Settings', permissions: [] },
    { role: 'Industry Manager', module: 'Utilities', permissions: [] },
     // HR Manager
    { role: 'HR Manager', module: 'Dashboard', permissions: readOnly },
    { role: 'HR Manager', module: 'Industry Management', permissions: [] },
    { role: 'HR Manager', module: 'News Management', permissions: [] },
    { role: 'HR Manager', module: 'Vacancy Management', permissions: allPermissions },
    { role: 'HR Manager', module: 'Pages Editor', permissions: [] },
    { role: 'HR Manager', module: 'Media Manager', permissions: readOnly },
    { role: 'HR Manager', module: 'Inquiry Management', permissions: readUpdate },
    { role: 'HR Manager', module: 'User Management', permissions: [] },
    { role: 'HR Manager', module: 'Security & Audit', permissions: readOnly },
    { role: 'HR Manager', module: 'System Settings', permissions: [] },
    { role: 'HR Manager', module: 'Utilities', permissions: [] },
     // Viewer
    ...ADMIN_MODULES.map(module => ({ role: 'Viewer' as UserRole, module, permissions: readOnly })),
];

export const SECURITY_LOGS: SecurityLog[] = [
  { id: 'log1', user: 'Gen. A. Abebe', action: 'Login', details: 'Successful login', ipAddress: '192.168.1.1', timestamp: '2024-05-23 10:00:05' },
  { id: 'log2', user: 'C. Kebede', action: 'Update Content', details: 'Edited page: About', ipAddress: '192.168.1.5', timestamp: '2024-05-23 09:30:12' },
  { id: 'log3', user: 'HR Manager', action: 'Create Content', details: 'Posted new vacancy: "AI Research Scientist"', ipAddress: '192.168.1.8', timestamp: '2024-05-23 08:05:45' },
  { id: 'log4', user: 'Unknown', action: 'Failed Login', details: 'Attempted login for user: admin', ipAddress: '10.0.0.1', timestamp: '2024-05-23 07:15:22' },
  { id: 'log5', user: 'Dr. S. Makonnen', action: 'Upload File', details: 'Uploaded: raptor_field_test.jpg', ipAddress: '192.168.1.12', timestamp: '2024-05-22 15:00:30' },
  { id: 'log6', user: 'Gen. A. Abebe', action: 'User Role Change', details: 'Changed role for "External Auditor" to "Viewer"', ipAddress: '192.168.1.1', timestamp: '2024-05-22 11:30:00' },
  { id: 'log7', user: 'C. Kebede', action: 'Delete Content', details: 'Deleted news article: "Old Announcement"', ipAddress: '192.168.1.5', timestamp: '2024-05-21 14:20:10' },
];

export const ACTIVE_SESSIONS: ActiveSession[] = [
    { id: 'ses1', user: 'Gen. A. Abebe', ipAddress: '192.168.1.1', device: 'Chrome on Windows', location: 'Addis Ababa, ET', loginTime: '2024-05-23 10:00:05' },
    { id: 'ses2', user: 'C. Kebede', ipAddress: '192.168.1.5', device: 'Safari on macOS', location: 'Addis Ababa, ET', loginTime: '2024-05-23 09:30:12' },
    { id: 'ses3', user: 'HR Manager', ipAddress: '192.168.1.8', device: 'Firefox on Linux', location: 'Bishoftu, ET', loginTime: '2024-05-23 08:05:45' },
    { id: 'ses4', user: 'Dr. S. Makonnen', ipAddress: '192.168.1.12', device: 'Chrome on Android', location: 'Gafat, ET', loginTime: '2024-05-22 15:00:30' },
];

export const WHITELISTED_IPS: WhitelistedIp[] = [
    { id: 'ip1', ipAddress: '192.168.1.1', description: 'HQ Office Network', addedBy: 'Gen. A. Abebe', dateAdded: '2023-01-15' },
    { id: 'ip2', ipAddress: '203.0.113.55', description: 'R&D Center VPN', addedBy: 'Gen. A. Abebe', dateAdded: '2023-02-20' },
    { id: 'ip3', ipAddress: '198.51.100.10', description: 'Bishoftu Facility Gateway', addedBy: 'Admin', dateAdded: '2023-06-01' },
];

export const SECURITY_ALERTS: SecurityAlert[] = [
    { id: 'al1', type: 'Failed Login Attempts', details: 'User "admin" failed to log in 5 times from IP 10.0.0.1.', timestamp: '2024-05-23 07:15:22', severity: 'High' },
    { id: 'al2', type: 'Unusual Location Login', details: 'User "C. Kebede" logged in from an unrecognized location (IP: 95.217.134.110 - Helsinki, FI).', timestamp: '2024-05-22 23:10:00', severity: 'Medium' },
    { id: 'al3', type: 'Privilege Escalation', details: 'User "External Auditor" attempted to access Industry Management module.', timestamp: '2024-05-22 18:45:12', severity: 'Critical' },
    { id: 'al4', type: 'Content Deletion', details: 'User "C. Kebede" deleted 3 news articles in bulk.', timestamp: '2024-05-21 14:20:10', severity: 'Low' },
];