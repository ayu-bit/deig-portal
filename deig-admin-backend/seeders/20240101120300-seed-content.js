
'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const industries = [
      {
        id: 'heig',
        shortName: 'HEIG',
        fullName: JSON.stringify({ en: 'Heavy Engineering Industry Group', am: 'ከባድ ምህንድስና ኢንዱስትሪ ቡድን' }),
        description: JSON.stringify({ en: 'Focuses on large-scale manufacturing, metal fabrication, and production of heavy machinery required for national infrastructure and defense projects.', am: 'ለሀገር አቀፍ መሠረተ ልማት እና ለመከላከያ ፕሮጀክቶች የሚያስፈልጉ ከባድ ማሽነሪዎችን በማምረት፣ በብረታ ብረት ማቀነባበሪያ እና በትላልቅ ደረጃ ማምረት ላይ ያተኩራል።' }),
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>`,
        capabilities: JSON.stringify({ en: ['Heavy Fabrication', 'Foundry & Casting', 'Industrial Machinery Production', 'Structural Steel Works'], am: ['ከባድ የብረታ ብረት ስራዎች', 'ፋውንድሪ እና ቀረጻ', 'የኢንዱስትሪ ማሽነሪዎች ማምረት', 'የህንጻ ብረት ስራዎች'] }),
        productsOrServices: JSON.stringify({ en: ['Industrial Boilers', 'Bridge Components', 'Custom Heavy Machinery', 'Large-scale Metal Forging'], am: ['የኢንዱስትሪ ቦይለሮች', 'የድልድይ አካላት', 'ብጁ ከባድ ማሽነሪዎች', 'ትልቅ ደረጃ የብረት ቀረጻ'] }),
        image: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800&auto=format&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=1920&auto=format&fit=crop',
        coordinates: JSON.stringify({ top: '65%', left: '35%' }),
        // Added dummy image to prevent empty array error
        facilityPhotos: ['https://images.unsplash.com/photo-1556132194-2f2de153a817?q=80&w=800'],
        technicalHighlights: JSON.stringify({ en: [], am: [] }),
        contactPerson: 'Eng. T. Gebru',
        status: 'Online',
        divisionalContact: JSON.stringify({ email: 'inquiries.heig@deig.gov', phone: '+251-11-555-0077', address: 'HEIG Complex, Industrial Zone' }),
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 'geig',
        shortName: 'GEIG',
        fullName: JSON.stringify({ en: 'General Engineering Industry Group', am: 'አጠቃላይ ምህንድስና ኢንዱስትሪ ቡድን' }),
        description: JSON.stringify({ en: 'Provides a broad range of general engineering services, including precision machining, component manufacturing, and maintenance support for various defense and civilian sectors.', am: 'ለተለያዩ የመከላከያ እና የሲቪል ዘርፎች ትክክለኛ የማሽን ስራ፣ የአካል ክፍሎች ማምረት እና የጥገና ድጋፍን ጨምሮ ሰፊ አጠቃላይ የምህንድስና አገልግሎቶችን ይሰጣል።' }),
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>`,
        capabilities: JSON.stringify({ en: ['CNC Machining', 'Tool & Die Making', 'General Fabrication', 'Maintenance, Repair & Overhaul (MRO)'], am: ['ሲኤንሲ ማሽኒንግ', 'መሳሪያ እና ዳይ መስራት', 'አጠቃላይ የብረታ ብረት ስራ', 'ጥገና፣ સમારકામ እና እድሳት (MRO)'] }),
        productsOrServices: JSON.stringify({ en: ['Custom Components', 'Spare Parts Manufacturing', 'Prototyping Services', 'Industrial Maintenance'], am: ['ብጁ አካላት', 'መለዋወጫ ማምረት', 'የፕሮቶታይፕ አገልግሎቶች', 'የኢንዱስትሪ ጥገና'] }),
        image: 'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=800&auto=format&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=1920&auto=format&fit=crop',
        coordinates: JSON.stringify({ top: '40%', left: '40%' }),
        // Added dummy image to prevent empty array error
        facilityPhotos: ['https://images.unsplash.com/photo-1617814086915-d98686d1f061?q=80&w=800'],
        technicalHighlights: JSON.stringify({ en: [], am: [] }),
        contactPerson: 'Ms. F. Alemayehu',
        status: 'Online',
        divisionalContact: JSON.stringify({ email: 'inquiries.geig@deig.gov', phone: '+251-11-555-0088', address: 'GEIG Center, Capital City' }),
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 'haei',
        shortName: 'HAEI',
        fullName: JSON.stringify({ en: 'Hommicho Ammunition Engineering Industry', am: 'ሆሚቾ የጥይት ምህንድስና ኢንዱስትሪ' }),
        description: JSON.stringify({ en: 'A core provider of ammunition, from small caliber to heavy artillery. HAEI also excels in heavy engineering and manufacturing, supporting broad defense production needs with precision and scale.', am: 'ከትንሽ ካሊበር እስከ ከባድ መድፍ ድረስ የጥይት አቅርቦት ዋና አቅራቢ ነው። ሆሚቾ በከባድ ምህንድስና እና በማኑፋክቸሪንግ ዘርፍም የላቀ ሲሆን፣ ሰፊ የመከላከያ ምርት ፍላጎቶችን በትክክለኛነት እና በስፋት ይደግፋል።' }),
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.36-3.112-.995-4.428" /></svg>`,
        capabilities: JSON.stringify({ en: ['Ammunition Manufacturing', 'Propellant and Explosives Production', 'Ballistic Testing', 'Quality Assurance', 'Heavy Engineering & Manufacturing'], am: ['የጥይት ማምረት', 'ፕሮፔላንት እና ፈንጂ ማምረት', 'የባለስቲክ ሙከራ', 'የጥራት ማረጋገጫ', 'ከባድ ምህንድስና እና ማምረት'] }),
        productsOrServices: JSON.stringify({ en: ['Small Caliber Ammunition', 'Mortar Shells', 'Artillery Projectiles', 'Specialized Ordnance'], am: ['አነስተኛ ካሊበር ጥይቶች', 'የሞርታር ሼሎች', 'የመድፍ ጥይቶች', 'ልዩ የጦር መሳሪያዎች'] }),
        image: 'https://images.unsplash.com/photo-1678662999051-6339d3a21a88?q=80&w=800&auto=format&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1593106578502-28fa7475d129?q=80&w=1920&auto=format&fit=crop',
        coordinates: JSON.stringify({ top: '70%', left: '45%' }),
        facilityPhotos: ['https://images.unsplash.com/photo-1593106578502-28fa7475d129?q=80&w=800', 'https://images.unsplash.com/photo-1614926019318-7ac52ae818a7?q=80&w=800'],
        technicalHighlights: JSON.stringify({ en: ['Automated high-volume production lines', 'Advanced propellant formulation research'], am: ['ከፍተኛ መጠን ያለው አውቶማቲክ የማምረቻ መስመሮች', 'የላቀ የፕሮፔላንት ቀመር ምርምር'] }),
        contactPerson: 'Mr. K. Belay',
        status: 'Online',
        divisionalContact: JSON.stringify({ email: 'inquiries.haei@deig.gov', phone: '+251-22-119-0011', address: 'HAEI Main Complex, Hommicho Industrial Zone' }),
        createdAt: new Date(), updatedAt: new Date()
      }
    ];

    const news = [
      {
        id: uuidv4(),
        title: JSON.stringify({ en: 'Project Sentinel Goes Live', am: 'ፕሮጀክት ሴንቲነል ስራ ጀመረ' }),
        date: new Date('2023-10-10'),
        content: JSON.stringify({ en: 'LEEI successfully deploys the next-generation national surveillance sensor network, enhancing situational awareness across all operational theaters.', am: 'ለገዳዲ የቀጣዩን ትውልድ ሀገራዊ የክትትል ሴንሰር ኔትዎርክ በተሳካ ሁኔታ በመዘርጋት በሁሉም የኦፕሬሽን ቲያትሮች ላይ ያለውን የግንዛቤ ደረጃ አሳድጓል።' }),
        category: 'Innovation & Technology',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1517976487612-1f3dd222f77c?q=80&w=800',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: JSON.stringify({ en: 'BVEI Unveils New Tactical Vehicle', am: 'ቢሾፍቱ አዲስ ታክቲካል ተሽከርካሪ ይፋ አደረገ' }),
        date: new Date('2023-09-25'),
        content: JSON.stringify({ en: 'The \'Raptor\' MRAP vehicle completes rigorous field testing, setting new standards for troop protection and mobility in hostile environments.', am: 'የ\'ራፕተር\' MRAP ተሽከርካሪ ጥብቅ የመስክ ሙከራዎችን በማጠናቀቅ ለሰራዊት ጥበቃ እና ለተንቀሳቃሽነት አዲስ መስፈርት አስቀምጧል።' }),
        category: 'Industry News',
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1603512338521-4b18218a5541?q=80&w=800',
        createdAt: new Date(), updatedAt: new Date()
      }
    ];

    const milestones = [
      { id: uuidv4(), year: '1998', event: JSON.stringify({ en: 'Foundation of DEIG established as a key national strategic project.', am: 'የመኢኢኮ መሰረት እንደ ቁልፍ ሀገራዊ ስትራቴጂካዊ ፕሮጀክት ተቋቋመ።' }), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), year: '2003', event: JSON.stringify({ en: 'First heavy vehicle assembly line inaugurated at BVEI.', am: 'የመጀመሪያው የከባድ ተሽከርካሪ መሰብሰቢያ መስመር በቢሾፍቱ ተመረቀ።' }), createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), year: '2008', event: JSON.stringify({ en: 'GAEI successfully develops and tests its first indigenous assault rifle.', am: 'ጋፋት የመጀመሪያውን ሀገር በቀል ጠመንጃ በተሳካ ሁኔታ አዘጋጅቶ ፈተሸ።' }), createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Industries', industries, {});
    await queryInterface.bulkInsert('News', news, {});
    await queryInterface.bulkInsert('Milestones', milestones, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Industries', null, {});
    await queryInterface.bulkDelete('News', null, {});
    await queryInterface.bulkDelete('Milestones', null, {});
  }
};
