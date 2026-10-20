import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const backendApp = require("./deig-admin-backend/src/app.js");
const db = require("./deig-admin-backend/src/models/index.js");
const { sequelize } = db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.JWT_SECRET = process.env.JWT_SECRET || 'deig-default-secret-jwt-key-2026';

async function seedDatabase() {
  const { User, Role, Industry, News, Milestone } = db;
  
  const rolesCount = await Role.count();
  if (rolesCount === 0) {
    console.log('Seeding roles...');
    await Role.bulkCreate([
      { name: 'Admin', description: 'Full control over the entire system.' },
      { name: 'Editor', description: 'Can manage news, pages, and media.' },
      { name: 'Industry Manager', description: 'Manages content for their assigned division.' },
      { name: 'HR Manager', description: 'Manages vacancies and applications.' },
      { name: 'Viewer', description: 'Read-only access to specific modules.' },
    ]);
  }

  const adminRole = await Role.findOne({ where: { name: 'Admin' } });
  if (adminRole) {
    // Ensure any existing admin users without roleId are linked to adminRole
    await User.update({ roleId: adminRole.id }, { where: { roleId: null } });

    // Ensure primary admin user exists
    const adminUser = await User.findOne({ where: { email: 'admin@deig.gov.et' } });
    if (!adminUser) {
      console.log('Seeding admin user (admin@deig.gov.et)...');
      await User.create({
        name: 'Admin User',
        email: 'admin@deig.gov.et',
        password: 'AdminPassword123!',
        roleId: adminRole.id,
        status: 'Active'
      });
    }

    // Also support admin@deig.gov as alias
    const adminGovUser = await User.findOne({ where: { email: 'admin@deig.gov' } });
    if (!adminGovUser) {
      console.log('Seeding alias admin user (admin@deig.gov)...');
      await User.create({
        name: 'Admin User',
        email: 'admin@deig.gov',
        password: 'AdminPassword123!',
        roleId: adminRole.id,
        status: 'Active'
      });
    }
  }

  const industriesCount = await Industry.count();
  if (industriesCount === 0) {
    console.log('Seeding industries...');
    await Industry.bulkCreate([
      {
        id: 'heig',
        shortName: 'HEIG',
        fullName: { en: 'Heavy Engineering Industry Group', am: 'ከባድ ምህንድስና ኢንዱስትሪ ቡድን' },
        description: { en: 'Focuses on large-scale manufacturing, metal fabrication, and production of heavy machinery required for national infrastructure and defense projects.', am: 'ለሀገር አቀፍ መሠረተ ልማት እና ለመከላከያ ፕሮጀክቶች የሚያስፈልጉ ከባድ ማሽነሪዎችን በማምረት፣ በብረታ ብረት ማቀነባበሪያ እና በትላልቅ ደረጃ ማምረት ላይ ያተኩራል።' },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>`,
        capabilities: { en: ['Heavy Fabrication', 'Foundry & Casting', 'Industrial Machinery Production', 'Structural Steel Works'], am: ['ከባድ የብረታ ብረት ስራዎች', 'ፋውንድሪ እና ቀረጻ', 'የኢንዱስትሪ ማሽነሪዎች ማምረት', 'የህንጻ ብረት ስራዎች'] },
        productsOrServices: { en: ['Industrial Boilers', 'Bridge Components', 'Custom Heavy Machinery', 'Large-scale Metal Forging'], am: ['የኢንዱስትሪ ቦይለሮች', 'የድልድይ አካላት', 'ብጁ ከባድ ማሽነሪዎች', 'ትልቅ ደረጃ የብረት ቀረጻ'] },
        image: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800&auto=format&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=1920&auto=format&fit=crop',
        coordinates: { top: '65%', left: '35%' },
        facilityPhotos: ['https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800'],
        technicalHighlights: { en: [], am: [] },
        contactPerson: 'Eng. T. Gebru',
        status: 'Online',
        divisionalContact: { email: 'inquiries.heig@deig.gov.et', phone: '+251-11-555-0077', address: 'HEIG Complex, Industrial Zone' }
      },
      {
        id: 'geig',
        shortName: 'GEIG',
        fullName: { en: 'General Engineering Industry Group', am: 'አጠቃላይ ምህንድስና ኢንዱስትሪ ቡድን' },
        description: { en: 'Provides a broad range of general engineering services, including precision machining, component manufacturing, and maintenance support for various defense and civilian sectors.', am: 'ለተለያዩ የመከላከያ እና የሲቪል ዘርፎች ትክክለኛ የማሽን ስራ፣ የአካል ክፍሎች ማምረት እና የጥገና ድጋፍን ጨምሮ ሰፊ አጠቃላይ የምህንድስና አገልግሎቶችን ይሰጣል።' },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>`,
        capabilities: { en: ['CNC Machining', 'Tool & Die Making', 'General Fabrication', 'Maintenance, Repair & Overhaul (MRO)'], am: ['ሲኤንሲ ማሽኒንግ', 'መሳሪያ እና ዳይ መስራት', 'አጠቃላይ የብረታ ብረት ስራ', 'ጥገና፣ சமாርካም እና እድሳት (MRO)'] },
        productsOrServices: { en: ['Custom Components', 'Spare Parts Manufacturing', 'Prototyping Services', 'Industrial Maintenance'], am: ['ብጁ አካላት', 'መለዋወጫ ማምረት', 'የፕሮቶታይፕ አገልግሎቶች', 'የኢንዱስትሪ ጥገና'] },
        image: 'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=800&auto=format&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=1920&auto=format&fit=crop',
        coordinates: { top: '40%', left: '40%' },
        facilityPhotos: ['https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=800'],
        technicalHighlights: { en: [], am: [] },
        contactPerson: 'Ms. F. Alemayehu',
        status: 'Online',
        divisionalContact: { email: 'inquiries.geig@deig.gov.et', phone: '+251-11-555-0088', address: 'GEIG Center, Capital City' }
      },
      {
        id: 'haei',
        shortName: 'HAEI',
        fullName: { en: 'Hommicho Ammunition Engineering Industry', am: 'ሆሚቾ የጥይት ምህንድስና ኢንዱስትሪ' },
        description: { en: 'A core provider of ammunition, from small caliber to heavy artillery. HAEI also excels in heavy engineering and manufacturing, supporting broad defense production needs with precision and scale.', am: 'ከትንሽ ካሊበር እስከ ከባድ መድፍ ድረስ የጥይት አቅርቦት ዋና አቅራቢ ነው። ሆሚቾ በከባድ ምህንድስና እና በማኑፋክቸሪንግ ዘርፍም የላቀ ሲሆን፣ ሰፊ የመከላከያ ምርት ፍላጎቶችን በትክክለኛነት እና በስፋት ይደግፋል።' },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.995-4.428" /></svg>`,
        capabilities: { en: ['Ammunition Manufacturing', 'Propellant and Explosives Production', 'Ballistic Testing', 'Quality Assurance', 'Heavy Engineering & Manufacturing'], am: ['የጥይት ማምረት', 'ፕሮፔላንት እና ፈንጂ ማምረት', 'የባለስቲክ ሙከራ', 'የጥራት ማረጋገጫ', 'ከባድ ምህንድስና እና ማምረት'] },
        productsOrServices: { en: ['Small Caliber Ammunition', 'Mortar Shells', 'Artillery Projectiles', 'Specialized Ordnance'], am: ['አነስተኛ ካሊበር ጥይቶች', 'የሞርታር ሼሎች', 'የመድፍ ጥይቶች', 'ልዩ የጦር መሳሪያዎች'] },
        image: 'https://images.unsplash.com/photo-1678662999051-6339d3a21a88?q=80&w=800&auto=format&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1593106578502-28fa7475d129?q=80&w=1920&auto=format&fit=crop',
        coordinates: { top: '70%', left: '45%' },
        facilityPhotos: ['https://images.unsplash.com/photo-1593106578502-28fa7475d129?q=80&w=800', 'https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800'],
        technicalHighlights: { en: ['Automated high-volume production lines', 'Advanced propellant formulation research'], am: ['ከፍተኛ መጠን ያለው አውቶማቲክ የማምረቻ መስመሮች', 'የላቀ የፕሮፔላንት ቀመር ምርምር'] },
        contactPerson: 'Mr. K. Belay',
        status: 'Online',
        divisionalContact: { email: 'inquiries.haei@deig.gov.et', phone: '+251-22-119-0011', address: 'HAEI Main Complex, Hommicho Industrial Zone' }
      }
    ]);
  }

  const newsCount = await News.count();
  if (newsCount === 0) {
    console.log('Seeding news...');
    await News.bulkCreate([
      {
        title: { en: 'Project Sentinel Goes Live', am: 'ፕሮጀክት ሴንቲነል ስራ ጀመረ' },
        date: new Date('2023-10-10'),
        content: { en: 'LEEI successfully deploys the next-generation national surveillance sensor network, enhancing situational awareness across all operational theaters.', am: 'ለገዳዲ የቀጣዩን ትውልድ ሀገራዊ የክትትል ሴንሰር ኔትዎርክ በተሳካ ሁኔታ በመዘርጋት በሁሉም የኦፕሬሽን ቲያትሮች ላይ ያለውን የግንዛቤ ደረጃ አሳድጓል።' },
        category: 'Innovation & Technology',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800'
      },
      {
        title: { en: 'BVEI Unveils New Tactical Vehicle', am: 'ቢሾፍቱ አዲስ ታክቲካል ተሽከርካሪ ይፋ አደረገ' },
        date: new Date('2023-09-25'),
        content: { en: 'The \'Raptor\' MRAP vehicle completes rigorous field testing, setting new standards for troop protection and mobility in hostile environments.', am: 'የ\'ራፕተር\' MRAP ተሽከርካሪ ጥብቅ የመስክ ሙከራዎችን በማጠናቀቅ ለሰራዊት ጥበቃ እና ለተንቀሳቃሽነት አዲስ መስፈርት አስቀምጧል።' },
        category: 'Industry News',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1603512338521-4b18218a5541?q=80&w=800'
      }
    ]);
  }

  const milestonesCount = await Milestone.count();
  if (milestonesCount === 0) {
    console.log('Seeding milestones...');
    await Milestone.bulkCreate([
      { year: '1998', event: { en: 'Foundation of DEIG established as a key national strategic project.', am: 'የመኢኢኮ መሰረት እንደ ቁልፍ ሀገራዊ ስትራቴጂካዊ ፕሮጀክት ተቋቋመ።' } },
      { year: '2003', event: { en: 'First heavy vehicle assembly line inaugurated at BVEI.', am: 'የመጀመሪያው የከባድ ተሽከርካሪ መሰብሰቢያ መስመር በቢሾፍቱ ተመረቀ።' } },
      { year: '2008', event: { en: 'GAEI successfully develops and tests its first indigenous assault rifle.', am: 'ጋፋት የመጀመሪያውን ሀገር በቀል ጠመንጃ በተሳካ ሁኔታ አዘጋጅቶ ፈተሸ።' } },
    ]);
  }
}

async function startServer() {
  const app = express();
  // In development, dev server runs on port 3000. In cloud hosting (Render, etc.), respect process.env.PORT.
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  // Sync database
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synced.');
    await seedDatabase();
    console.log('Database seeding checked/completed.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Use the backend app for /api routes
  app.use(backendApp);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use((_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
