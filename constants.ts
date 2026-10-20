
// Fix: Updated import to use 'UserRolePermissions' to resolve type conflicts.
import type { Industry, Vacancy, Milestone, Partner, NewsArticle, Leader, Certification, Tender, Page, Applicant, MediaAsset, ContactInquiry, User, UserRolePermissions, SecurityLog, ActiveSession, GalleryItem } from './types';

export const PAGES: Page[] = [
    { id: 'p-home', title: 'Home Page', slug: '/', status: 'Published', lastEdited: '2023-10-26', editedBy: 'Admin' },
    { id: 'p-about', title: 'About Us', slug: '/about', status: 'Published', lastEdited: '2023-10-25', editedBy: 'Admin' },
    { id: 'p-industry', title: 'Industry Hub', slug: '/industry', status: 'Published', lastEdited: '2023-10-27', editedBy: 'Admin' },
    { id: 'p-news', title: 'News & Updates', slug: '/news', status: 'Published', lastEdited: '2023-10-28', editedBy: 'Editor' },
    { id: 'p-careers', title: 'Careers / Vacancy', slug: '/vacancy', status: 'Published', lastEdited: '2023-10-28', editedBy: 'HR Manager' },
    { id: 'p-contact', title: 'Contact Us', slug: '/contact', status: 'Draft', lastEdited: '2023-10-29', editedBy: 'Admin' },
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'gaei',
    name: 'Gafat Armament Engineering Industry',
    acronym: 'GAEI',
    description: 'GAEI is the cornerstone of national defense firepower, serving as a center of excellence for small arms, heavy weaponry, and precision armament technology. With a legacy of engineering superior kinetic solutions, GAEI ensures the Ethiopian National Defense Force is equipped with reliable, indigenous firepower.',
    focus: 'Armament systems, weapons technology, and precision engineering.',
    capabilities: [
        { name: 'Small Arms Manufacturing', description: 'Design and high-volume production of assault rifles (AK variants), sniper rifles, and sidearms meeting stringent military specifications.' },
        { name: 'Heavy Ordnance Production', description: 'Manufacturing of mortar systems (60mm, 81mm, 82mm), grenade launchers, and DShK heavy machine guns.' },
        { name: 'Rocket & Missile Integration', description: 'Development and assembly of short-range tactical rockets (107mm) and anti-tank guided missile (ATGM) systems.' },
        { name: 'Metallurgy & Heat Treatment', description: 'Advanced metallurgical processes for barrel rifling and hardening to extend weapon service life.' }
    ],
    products: [
        { name: 'ET-97 Assault Rifle', description: 'A modernized 7.62x39mm assault rifle featuring polymer furniture and picatinny rails for optics.', imageUrl: 'https://images.pexels.com/photos/1239857/pexels-photo-1239857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: '82mm Mortar System', description: 'A portable, medium-weight mortar system providing effective indirect fire support for infantry platoons.', imageUrl: 'https://images.pexels.com/photos/7388796/pexels-photo-7388796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: '12.7mm HMG', description: 'Heavy Machine Gun designed for anti-infantry and light anti-vehicle roles, mountable on tripods or vehicles.', imageUrl: 'https://images.pexels.com/photos/876344/pexels-photo-876344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'RPG-7 Launchers', description: 'Robust, reusable anti-tank grenade launchers manufactured with high-strength steel alloys.', imageUrl: 'https://images.pexels.com/photos/53874/torpedo-weapon-military-war-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/7388796/pexels-photo-7388796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1239857/pexels-photo-1239857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/876344/pexels-photo-876344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    location: { top: '38%', left: '56%' },
    video: 'https://videos.pexels.com/video-files/5945846/5945846-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
      { title: 'Cold Hammer Forging', description: 'Proprietary barrel manufacturing process increasing rifling durability by 40%.' },
      { title: 'CNC Precision Machining', description: 'Utilization of 5-axis CNC machines for receiver and bolt carrier group production.' },
    ],
    contact: {
      email: 'gaei.info@deig.gov.et',
      phone: '+251 11 200 1001'
    },
    facilityInfo: {
      location: 'Gafat, Central Command Zone',
      area: '1,200,000 m²',
      keyFeatures: ['Underground Ballistics Tunnel', 'Automated Anodizing Line', 'Weapon Prototyping Lab']
    },
    status: 'Published',
    contactPerson: 'Col. A. Tadesse'
  },
  {
    id: 'haei',
    name: 'Hommicho Ammunition Engineering Industry',
    acronym: 'HAEI',
    description: 'HAEI is the ammunition backbone of the defense forces, specializing in the mass production of high-grade munitions ranging from small arms cartridges to heavy artillery shells. Our facilities prioritize safety, precision, and yield.',
    focus: 'Ammunition manufacturing, pyrotechnics, and energetic materials.',
    capabilities: [
        { name: 'Small Arms Ammunition', description: 'Automated lines for 5.56mm, 7.62mm, and 9mm NATO standard cartridges.' },
        { name: 'Heavy Caliber Shells', description: 'Forging and filling of 122mm, 130mm, and 155mm artillery projectiles.' },
        { name: 'Propellant Chemistry', description: 'Synthesis of single and double-base propellants and high-explosive compounds (RDX, TNT).' },
        { name: 'Aerial Munitions', description: 'Production of unguided aircraft bombs (250kg, 500kg) and aircraft rockets.' }
    ],
    products: [
        { name: '155mm HE ERFB', description: 'High-Explosive Extended Range Full Bore artillery shell for long-distance engagement.', imageUrl: 'https://images.pexels.com/photos/6625129/pexels-photo-6625129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: '7.62x39mm Polymer Coated', description: 'Steel-cased ammunition with polymer coating for reliable feeding in adverse conditions.', imageUrl: 'https://images.pexels.com/photos/5202425/pexels-photo-5202425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: '23mm Anti-Aircraft', description: 'High-explosive incendiary rounds for ZU-23 anti-aircraft guns.', imageUrl: 'https://via.placeholder.com/150/2E3E50/EAEFF5?text=23mm+AA' },
        { name: 'Hand Grenades', description: 'Fragmentation and smoke grenades for infantry tactical use.', imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/6625129/pexels-photo-6625129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5202425/pexels-photo-5202425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8593456/pexels-photo-8593456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    location: { top: '75%', left: '48%' },
    video: 'https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
      { title: 'Automated Filling Lines', description: 'Robotic explosive filling ensures consistent density and detonation velocity.' },
      { title: 'X-Ray Quality Control', description: '100% X-ray inspection of artillery shells to detect voids or cracks in the explosive fill.' },
    ],
    contact: {
      email: 'haei.info@deig.gov.et',
      phone: '+251 11 200 1002'
    },
    facilityInfo: {
        location: 'Hommicho, Western Zone',
        area: '2,500,000 m²',
        keyFeatures: ['Chemical Synthesis Plant', 'Underground Bunkers', 'Ballistic Testing Range']
    },
    status: 'Published',
    contactPerson: 'Eng. B. Kebede'
  },
  {
    id: 'bveig',
    name: 'Bishoftu Vehicle Engineering Industry Group',
    acronym: 'BVEIG',
    description: 'BVEIG designs and manufactures the mobility platforms of the future. From heavy tactical trucks to armored fighting vehicles, we ensure our forces can move with speed, protection, and reliability.',
    focus: 'Military and specialized vehicle design, manufacturing, and maintenance.',
    capabilities: [
        { name: 'Armored Vehicle Assembly', description: 'Complete assembly of APCs and IFVs including hull welding, drivetrain installation, and armor fitting.' },
        { name: 'Heavy Truck Production', description: 'Manufacturing of 6x6 and 8x8 tactical logistics trucks for troop and cargo transport.' },
        { name: 'Vehicle Up-Armoring', description: 'Retrofitting civilian and military vehicles with ballistic steel and composite armor packages.' },
        { name: 'Tank Overhaul & Upgrade', description: 'Deep maintenance and modernization of Main Battle Tanks (MBTs), upgrading fire control and engines.' }
    ],
    products: [
        { name: 'Simien Shield APC', description: 'A 4x4 Mine-Resistant Ambush Protected (MRAP) vehicle designed for counter-insurgency operations.', imageUrl: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Bishoftu 6x6 Truck', description: 'A versatile military truck capable of hauling 15 tons of cargo over rough terrain.', imageUrl: 'https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Mobile Field Kitchen', description: 'Trailer-mounted field kitchen units capable of feeding battalion-sized units.', imageUrl: 'https://via.placeholder.com/150/2E3E50/EAEFF5?text=Field+Kitchen' },
        { name: 'Water Tanker', description: 'Tactical water distribution vehicles with filtration systems.', imageUrl: 'https://images.pexels.com/photos/11491032/pexels-photo-11491032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11491032/pexels-photo-11491032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1268551/pexels-photo-1268551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/2CylinderEngine/glTF-Binary/2CylinderEngine.glb',
    location: { top: '58%', left: '53%' },
    video: 'https://videos.pexels.com/video-files/7578335/7578335-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Robotic Hull Welding', description: 'Automated welding gantries for consistent, high-strength armored hull construction.' },
        { title: 'Dyno Testing Facility', description: 'Advanced engine dynamometer testing to certify power output and reliability under load.' },
    ],
    contact: {
        email: 'bveig.info@deig.gov.et',
        phone: '+251 11 200 1003'
    },
    facilityInfo: {
        location: 'Bishoftu Industrial Complex',
        area: '1,800,000 m²',
        keyFeatures: ['Vehicle Assembly Hall', 'Tank Test Track', 'Engine Remanufacturing Center']
    },
    status: 'Published',
    contactPerson: 'Brig. Gen. C. Desta'
  },
  {
    id: 'bpig',
    name: 'Brana Printing & Packaging Industry Group',
    acronym: 'BPIG',
    description: 'BPIG safeguards information and assets. We provide secure printing for sensitive government documents and military-grade packaging solutions that ensure equipment arrives safely in any theater of operation.',
    focus: 'Secure printing, labeling, and military-grade packaging solutions.',
    capabilities: [
        { name: 'Security Printing', description: 'Printing of passports, national IDs, and currency with advanced anti-counterfeiting features (holograms, UV inks).' },
        { name: 'Industrial Packaging', description: 'Manufacturing of wooden crates, pallets, and custom foam inserts for weapons and delicate electronics.' },
        { name: 'Plastic Molding', description: 'Injection molding of ammo boxes, jerry cans, and equipment cases.' },
        { name: 'Digital Archiving', description: 'Digitization and secure storage of sensitive physical records.' }
    ],
    products: [
        { name: 'Biometric Passports', description: 'E-passports with embedded chips and biometric data storage.', imageUrl: 'https://images.pexels.com/photos/4039164/pexels-photo-4039164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Ammo Crates', description: 'Stackable, moisture-resistant wooden and plastic crates for ammunition transport.', imageUrl: 'https://images.pexels.com/photos/4481329/pexels-photo-4481329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Security Seals', description: 'Tamper-evident seals for securing cargo containers and sensitive equipment.', imageUrl: 'https://via.placeholder.com/150/2E3E50/EAEFF5?text=Seals' },
        { name: 'Tactical Maps', description: 'Waterproof, tear-resistant tactical maps for field operations.', imageUrl: 'https://images.pexels.com/photos/7692998/pexels-photo-7692998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/163737/logistics-cardboard-boxes-distribution-channel-163737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4039164/pexels-photo-4039164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4481329/pexels-photo-4481329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7692998/pexels-photo-7692998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/Cube.gltf',
    location: { top: '63%', left: '50%' },
    video: 'https://videos.pexels.com/video-files/4039164/4039164-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Intaglio Printing', description: 'High-security printing technique used for currency and high-value documents.' },
        { title: 'Laser Engraving', description: 'Precision laser engraving for polycarbonate ID cards.' },
    ],
    contact: {
        email: 'bpig.info@deig.gov.et',
        phone: '+251 11 200 1004'
    },
    facilityInfo: {
        location: 'Addis Ababa',
        area: '50,000 m²',
        keyFeatures: ['High-Security Printing Zone', 'Climate Controlled Warehouse', 'Design Studio']
    },
    status: 'Published',
    contactPerson: 'Mr. D. Fikru'
  },
  {
    id: 'leeig',
    name: 'Legedadi Radio & Electronics Engineering Industry Group',
    acronym: 'LEEIG',
    description: 'LEEIG ensures our forces remain connected and aware. We specialize in the design and production of military-grade communications, radar systems, and optoelectronics.',
    focus: 'Electronics, sensors, radio, radar, and secure communications.',
    capabilities: [
        { name: 'Tactical Radio Production', description: 'Assembly of HF, VHF, and UHF handheld and manpack radios with encryption capabilities.' },
        { name: 'Radar Assembly', description: 'Assembly and testing of ground surveillance and air defense radar systems.' },
        { name: 'PCB Assembly', description: 'Surface Mount Technology (SMT) lines for producing complex printed circuit boards.' },
        { name: 'Cable Harnessing', description: 'Production of ruggedized cable harnesses for military vehicles and aircraft.' }
    ],
    products: [
        { name: 'PRC-117 Manpack Radio', description: 'Ruggedized manpack radio for secure voice and data communication in the field.', imageUrl: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Surveillance Radar', description: 'Portable ground surveillance radar for border security and perimeter defense.', imageUrl: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Thermal Sights', description: 'Weapon-mounted thermal imaging sights for night operations.', imageUrl: 'https://images.pexels.com/photos/8090145/pexels-photo-8090145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Field Telephones', description: 'Robust wired field telephones for secure, jam-proof communication.', imageUrl: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/4316/technology-computer-chips-gigabyte.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/SciFiHelmet.glb',
    location: { top: '60%', left: '58%' },
    video: 'https://videos.pexels.com/video-files/5900228/5900228-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Cleanroom Assembly', description: 'ISO Class 7 cleanrooms for sensitive optical and electronic assembly.' },
        { title: 'EMI/EMC Testing', description: 'Electromagnetic Interference and Compatibility testing lab to ensure equipment resilience.' },
    ],
    contact: {
        email: 'leeig.info@deig.gov.et',
        phone: '+251 11 200 1005'
    },
    facilityInfo: {
        location: 'Legedadi, Oromia Region',
        area: '300,000 m²',
        keyFeatures: ['SMT Production Lines', 'Anechoic Chamber', 'Optics Lab']
    },
    status: 'Published',
    contactPerson: 'Dr. E. Gizaw'
  },
  {
    id: 'rig',
    name: 'Research & Innovation Group',
    acronym: 'RIG',
    description: 'RIG is the brain of DEIG, driving the future of defense technology. We focus on indigenous R&D in critical areas like AI, cyber-security, and advanced materials to reduce dependency and enhance capability.',
    focus: 'Advanced materials, AI, cyber-security, and next-gen systems.',
    capabilities: [
        { name: 'Cyber Defense', description: 'Development of secure operating systems, encryption algorithms, and network defense tools.' },
        { name: 'AI & Robotics', description: 'Research into autonomous navigation, target recognition, and swarm intelligence.' },
        { name: 'Material Science', description: 'Development of lightweight composites for armor and aerospace applications.' },
        { name: 'Reverse Engineering', description: 'Analysis and replication of critical legacy components to maintain operational readiness.' }
    ],
    products: [
        { name: 'Secure OS', description: 'A hardened, Linux-based operating system for critical government infrastructure.', imageUrl: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Composite Armor Panels', description: 'Ceramic-Composite hybrid armor plates offering Level IV protection.', imageUrl: 'https://via.placeholder.com/150/2E3E50/EAEFF5?text=Composite+Armor' },
        { name: 'UAV Flight Controller', description: 'Indigenous flight control software and hardware for tactical drones.', imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Cipher Module', description: 'Hardware encryption module for secure voice and data transmission.', imageUrl: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/MaterialsVariantsShoe.glb',
    location: { top: '50%', left: '45%' },
    video: 'https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Quantum Encryption Research', description: 'Pioneering work in post-quantum cryptography algorithms.' },
        { title: 'Nanotech Lab', description: 'Research into carbon nanotubes for stronger, lighter structural materials.' },
    ],
    contact: {
        email: 'rig.info@deig.gov.et',
        phone: '+251 11 200 1006'
    },
    facilityInfo: {
        location: 'Addis Ababa (AASTU Campus)',
        area: '25,000 m²',
        keyFeatures: ['Supercomputing Cluster', 'Cyber Range', 'Nanomaterials Lab']
    },
    status: 'Published',
    contactPerson: 'Dr. F. Lemma'
  },
  {
    id: 'aei',
    name: 'Aerospace Engineering Industry',
    acronym: 'AEI',
    description: 'AEI is dedicated to securing the skies. We design, manufacture, and maintain aerial platforms, with a special focus on Unmanned Aerial Vehicles (UAVs) and aircraft maintenance, repair, and overhaul (MRO).',
    focus: 'Aerospace systems, UAVs, satellite technology, and avionics.',
    capabilities: [
        { name: 'UAV Production', description: 'Design and manufacturing of surveillance and combat drones.' },
        { name: 'Aircraft MRO', description: 'Maintenance, Repair, and Overhaul of fixed-wing and rotary-wing military aircraft.' },
        { name: 'Avionics Upgrade', description: 'Modernizing cockpit displays, navigation, and communication systems of legacy aircraft.' },
        { name: 'Composite Airframe Fab', description: 'Manufacturing of lightweight carbon-fiber airframes and components.' }
    ],
    products: [
        { name: 'Walia UAV', description: 'A medium-altitude long-endurance (MALE) UAV for intelligence, surveillance, and reconnaissance (ISR).', imageUrl: 'https://images.pexels.com/photos/89959/pexels-photo-89959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Training Aircraft', description: 'Propeller-driven basic trainer aircraft for pilot training.', imageUrl: 'https://images.pexels.com/photos/532353/pexels-photo-532353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Aerial Bombs', description: 'Precision-guided munitions for aerial delivery.', imageUrl: 'https://images.pexels.com/photos/41006/satellite-soyuz-rocket-space-41006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Helicopter Simulators', description: 'Full-motion flight simulators for pilot training.', imageUrl: 'https://via.placeholder.com/150/2E3E50/EAEFF5?text=Simulator' }
    ],
    gallery: [
      'https://images.pexels.com/photos/89959/pexels-photo-89959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/532353/pexels-photo-532353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/41006/satellite-soyuz-rocket-space-41006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/UAV.glb',
    location: { top: '25%', left: '35%' },
    video: 'https://videos.pexels.com/video-files/855321/855321-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Autoclave Curing', description: 'Large-scale autoclave for curing high-performance aerospace composites.' },
        { title: 'Wind Tunnel', description: 'Subsonic wind tunnel for aerodynamic testing and airframe optimization.' },
    ],
    contact: {
        email: 'aei.info@deig.gov.et',
        phone: '+251 11 200 1007'
    },
    facilityInfo: {
        location: 'Bishoftu Air Base Complex',
        area: '450,000 m²',
        keyFeatures: ['Aircraft Hangars', 'Composite Lab', 'Engine Test Cell']
    },
    status: 'Published',
    contactPerson: 'Col. G. Haile'
  },
  {
    id: 'nsei',
    name: 'Naval Systems Engineering Industry',
    acronym: 'NSEI',
    description: 'NSEI is rebuilding the nation\'s naval capabilities. We focus on the design, maintenance, and system integration for naval vessels, ensuring maritime security and projection of power.',
    focus: 'Naval architecture, shipbuilding, marine systems, and coastal defense.',
    capabilities: [
        { name: 'Patrol Boat Construction', description: 'Fabrication of aluminum and composite hull patrol boats for coastal and riverine operations.' },
        { name: 'Marine Radar Integration', description: 'Installation and calibration of maritime navigation and surveillance radars.' },
        { name: 'Naval Weapons Systems', description: 'Integration of naval guns and missile systems onto floating platforms.' },
        { name: 'Vessel Maintenance', description: 'Comprehensive repair and overhaul of naval vessels.' }
    ],
    products: [
        { name: 'Fast Patrol Craft', description: 'High-speed interceptor boats for maritime security.', imageUrl: 'https://images.pexels.com/photos/165576/pexels-photo-165576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Riverine Command Boat', description: 'Armored boat designed for operations in rivers and shallow waters.', imageUrl: 'https://images.pexels.com/photos/1575385/pexels-photo-1575385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Naval Gun Mount', description: 'Stabilized remote-controlled gun mount for naval vessels.', imageUrl: 'https://via.placeholder.com/150/2E3E50/EAEFF5?text=Gun+Mount' },
        { name: 'Maritime Surveillance System', description: 'Integrated sensor suite for coastal monitoring.', imageUrl: 'https://images.pexels.com/photos/1034657/pexels-photo-1034657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/165576/pexels-photo-165576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1575385/pexels-photo-1575385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2800552/pexels-photo-2800552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1034657/pexels-photo-1034657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/ToyTrain.glb',
    location: { top: '80%', left: '70%' },
    video: 'https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Marine Aluminum Welding', description: 'Certified welding processes for high-strength marine-grade aluminum hulls.' },
        { title: 'System Integration Lab', description: 'On-shore testing of naval combat management systems before ship installation.' },
    ],
    contact: {
        email: 'nsei.info@deig.gov.et',
        phone: '+251 11 200 1008'
    },
    facilityInfo: {
        location: 'Bahir Dar / Djibouti Logistics Hub',
        area: '600,000 m²',
        keyFeatures: ['Slipway', 'Marine Workshop', 'Radar Test Tower']
    },
    status: 'Published',
    contactPerson: 'Capt. H. Mariam'
  }
];

export const VACANCIES: Vacancy[] = [
    {
        id: 've-001',
        title: 'Senior Mechanical Engineer',
        description: 'Lead the design, analysis, and testing of complex mechanical systems for advanced ammunition engineering projects.',
        location: 'HAEI, Hommicho',
        role: 'Engineering',
        division: 'HAEI',
        experienceLevel: 'Senior',
        status: 'Open',
        type: 'Full-time',
        closingDate: '2023-12-15',
        responsibilities: [
            'Lead the design and analysis of complex mechanical systems.',
            'Develop prototypes and conduct rigorous testing.',
            'Collaborate with cross-functional teams.'
        ],
        requirements: [
            'M.Sc. in Mechanical Engineering or related field.',
            '8+ years of experience in heavy machinery design.',
            'Proficiency in SolidWorks, CATIA, or similar CAD software.'
        ],
        applicantCount: 12
    },
    {
        id: 've-002',
        title: 'Embedded Systems Programmer',
        description: 'Develop, debug, and maintain firmware for microcontrollers and embedded systems used in cutting-edge defense electronics.',
        location: 'LEEIG, Legedadi',
        role: 'Electronics',
        division: 'LEEIG',
        experienceLevel: 'Mid-level',
        status: 'Open',
        type: 'Full-time',
        closingDate: '2023-12-20',
        responsibilities: [
            'Develop firmware for microcontrollers and embedded systems.',
            'Debug and maintain existing embedded software.',
            'Work on real-time operating systems (RTOS).'
        ],
        requirements: [
            'B.Sc. in Computer Engineering or Electrical Engineering.',
            '3-5 years of experience with C/C++ for embedded systems.',
            'Experience with hardware interfaces like SPI, I2C, UART.'
        ],
        applicantCount: 28
    },
    {
        id: 've-003',
        title: 'Cybersecurity Analyst',
        description: 'Join our research group to monitor networks for security breaches, investigate incidents, and conduct vulnerability assessments.',
        location: 'RIG, Addis Ababa',
        role: 'IT & Cyber',
        division: 'RIG',
        experienceLevel: 'Mid-level',
        status: 'Closed',
        type: 'Full-time',
        closingDate: '2023-11-30',
        responsibilities: [
            'Monitor networks for security breaches.',
            'Investigate and respond to security incidents.',
            'Conduct vulnerability assessments.'
        ],
        requirements: [
            'B.Sc. in Computer Science or a related field.',
            'Certifications like CISSP, CEH are a plus.',
            'Experience with SIEM tools.'
        ],
        applicantCount: 45
    },
    {
        id: 've-004',
        title: 'Aerospace Structural Engineer',
        description: 'Perform critical stress and structural analysis on airframes, design composite structures for advanced UAVs, and utilize FEA software for simulations.',
        location: 'AEI, Bishoftu',
        role: 'Engineering',
        division: 'AEI',
        experienceLevel: 'Senior',
        status: 'Open',
        type: 'Contract',
        closingDate: '2023-12-25',
        responsibilities: [
            'Perform stress and structural analysis on airframes.',
            'Design composite structures for UAVs.',
            'Use FEA software for simulations.'
        ],
        requirements: [
            'M.Sc. or Ph.D. in Aerospace or Mechanical Engineering.',
            '7+ years of experience in aerospace structural design.',
            'Expertise with ANSYS, Abaqus, or NASTRAN.'
        ],
        applicantCount: 7
    }
];

export const APPLICANTS: Applicant[] = [
    { id: 'app-001', name: 'John Doe', email: 'john.d@example.com', appliedDate: '2023-11-10', vacancyId: 've-001', status: 'Reviewed', cvUrl: '#', rating: 4 },
    { id: 'app-002', name: 'Jane Smith', email: 'jane.s@example.com', appliedDate: '2023-11-12', vacancyId: 've-001', status: 'Interview', cvUrl: '#', rating: 5 },
    { id: 'app-003', name: 'Peter Jones', email: 'peter.j@example.com', appliedDate: '2023-11-15', vacancyId: 've-001', status: 'New', cvUrl: '#', rating: 3 },
    { id: 'app-004', name: 'Alice Williams', email: 'alice.w@example.com', appliedDate: '2023-11-18', vacancyId: 've-002', status: 'Hired', cvUrl: '#', rating: 5 },
    { id: 'app-005', name: 'Bob Brown', email: 'bob.b@example.com', appliedDate: '2023-11-20', vacancyId: 've-002', status: 'Rejected', cvUrl: '#', rating: 2 },
    { id: 'app-006', name: 'Charlie Davis', email: 'charlie.d@example.com', appliedDate: '2023-11-21', vacancyId: 've-004', status: 'New', cvUrl: '#', rating: 0 },
];


export const MILESTONES: Milestone[] = [
  { 
    year: '1984', 
    event: 'Foundational Establishment',
    details: 'The origins of DEIG begin with the establishment of the first specialized defense factories, laying the groundwork for Ethiopia\'s industrial ambitions.'
  },
  { 
    year: '2005', 
    event: 'Strategic Consolidation',
    details: 'Key engineering entities are consolidated, forming the core groups that would later become the pillars of DEIG, streamlining production and research.'
  },
  { 
    year: '2010', 
    event: 'DEIG Officially Formed',
    details: 'The Defense Industry Engineering Group is officially inaugurated to synergize national efforts, fostering collaboration and maximizing industrial output.'
  },
  { 
    year: '2018', 
    event: 'Launch of Project Cerberus',
    details: 'DEIG launches its flagship next-generation Armored Personnel Carrier program, marking a significant step in indigenous vehicle design.'
  },
  { 
    year: '2023', 
    event: 'SkyGuard Radar Inauguration',
    details: 'The successful development and deployment of the indigenous SkyGuard air surveillance radar system enhances national airspace sovereignty.'
  },
];

export const LEADERSHIP_TEAM: Leader[] = [
  {
    name: 'Abebe G.',
    title: 'Director General',
    imageUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Leading DEIG with a vision for technological sovereignty and strategic excellence, with over 20 years of experience in national defense and industrial management.'
  },
  {
    name: 'Tigist M.',
    title: 'Deputy Director, Research & Innovation',
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Spearheading the next generation of defense technologies, focusing on AI, materials science, and unmanned systems to secure Ethiopia\'s future.'
  },
  {
    name: 'Yonas T.',
    title: 'Chief of Operations',
    imageUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Overseeing the synergistic operations of all DEIG divisions, ensuring efficiency, quality, and timely delivery of critical defense assets.'
  },
];

export const CERTIFICATIONS: Certification[] = [
    { name: 'ISO 9001:2015 Quality Management', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=ISO+9001' },
    { name: 'AS9100D Aerospace Standard', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=AS9100D' },
    { name: 'ISO 14001 Environmental Management', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=ISO+14001' },
    { name: 'ISO/IEC 27001 Information Security', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=ISO+27001' },
];

export const PARTNERS: Partner[] = [
    { name: 'Ministry of Defense', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=MoD' },
    { name: 'Ethiopian National Defense Force', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=ENDF' },
    { name: 'Addis Ababa Science and Technology University', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=AASTU' },
    { name: 'National Innovation Council', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=NIC' },
    { name: 'Aerospace & Defense Alliance', logoUrl: 'https://via.placeholder.com/150/9BB0C2/0B1E39?text=ADA' },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: 'DEIG Unveils Next-Generation Armored Vehicle at National Defense Expo',
    date: 'October 26, 2023',
    excerpt: 'The BVEI division has officially launched the "Simien Shield," a state-of-the-art armored personnel carrier with enhanced mobility and protection...',
    content: '<p>The Bishoftu Vehicle Engineering Industry Group (BVEIG) is proud to announce the launch of the "Simien Shield," a next-generation 8x8 Armored Personnel Carrier (APC) designed and manufactured entirely in Ethiopia.</p><p>Unveiled at the National Defense Expo, the Simien Shield represents a significant leap forward in indigenous defense capabilities. Featuring modular armor protection, advanced situational awareness systems, and a high-performance drivetrain, the vehicle is built to withstand the rigorous demands of modern combat environments.</p><h3>Key Features:</h3><ul><li>Level 4 STANAG 4569 Ballistic Protection</li><li>V-hull design for enhanced blast resistance</li><li>Integrated remote weapon station (RWS) compatibility</li><li>Amphibious capability for diverse terrain operations</li></ul><p>The first batch of vehicles is scheduled for delivery to the Ethiopian National Defense Force later this year, marking a new era of self-reliance in military mobility.</p>',
    imageUrl: 'https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Projects',
    status: 'Published'
  },
  {
    id: 2,
    title: 'GAEI Achieves Breakthrough in Precision-Guided Munitions',
    date: 'October 15, 2023',
    excerpt: 'A new milestone in domestic defense capability has been reached as GAEI successfully tests its first indigenous precision-guided artillery shell...',
    content: '<p>Gafat Armament Engineering Industry (GAEI) has successfully conducted live-fire tests of its first domestically developed 155mm precision-guided artillery shell. This achievement places Ethiopia among a select group of nations capable of producing smart munitions.</p><p>The new shell utilizes a hybrid GPS/INS guidance kit coupled with semi-active laser seeking for terminal accuracy. During testing at the Awash range, the projectile demonstrated a circular error probable (CEP) of less than 5 meters at a range of 30 kilometers.</p><p>"This is a game-changer for our artillery forces," stated the Director General of GAEI. "We can now deliver precise effects with fewer rounds, reducing logistical burden and collateral damage while maximizing operational effectiveness."</p>',
    imageUrl: 'https://images.pexels.com/photos/53874/torpedo-weapon-military-war-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Innovation & Technology',
    status: 'Published'
  },
  {
    id: 3,
    title: 'LEEI Expands Secure Communication Network for National Forces',
    date: 'September 28, 2023',
    excerpt: 'The latest upgrades to the national defense communication grid by LEEI ensure encrypted, real-time data and voice transmission across all branches...',
    content: '<p>Legedadi Radio & Electronics Engineering Industry (LEEI) has completed phase two of the National Defense Secure Communication Network (NDSCN) expansion project. This critical infrastructure upgrade enhances the interoperability and security of communications across all branches of the armed forces.</p><p>The upgrade introduces advanced software-defined radios (SDRs) and quantum-resistant encryption protocols developed by DEIG\'s Research & Innovation Group. These technologies ensure that voice and data transmissions remain secure against sophisticated electronic warfare threats.</p><p>Field deployment of the new tactical radio sets has commenced, providing frontline units with reliable, high-bandwidth connectivity even in contested environments.</p>',
    imageUrl: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Industry News',
    status: 'Published'
  },
   {
    id: 4,
    title: 'HAEI Increases Production Capacity to Meet National Demand',
    date: 'September 10, 2023',
    excerpt: 'Hommicho Ammunition Engineering Industry has completed a major facility expansion, doubling its production capacity for small and medium caliber rounds...',
    content: '<p>In response to growing national security requirements, Hommicho Ammunition Engineering Industry (HAEI) has inaugurated a new automated production wing at its Hommicho complex. The expansion effectively doubles the facility\'s output capacity for small arms ammunition (5.56mm and 7.62mm).</p><p>The new lines feature state-of-the-art robotic assembly and quality control systems, significantly reducing production costs while improving consistency and reliability. This strategic investment ensures a steady and self-sufficient supply of essential munitions for national defense needs.</p>',
    imageUrl: 'https://images.pexels.com/photos/8593456/pexels-photo-8593456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Industry News',
    status: 'Archived'
  },
  {
    id: 5,
    title: 'DEIG Announces Annual Engineering Scholarship Program with AASTU',
    date: 'August 22, 2023',
    excerpt: 'In partnership with Addis Ababa Science and Technology University, DEIG is launching a new scholarship to foster the next generation of defense engineers.',
    content: '<p>DEIG is committed to nurturing the next generation of engineering talent. We are pleased to announce the launch of the "National Defense Engineering Scholarship" in partnership with Addis Ababa Science and Technology University (AASTU).</p><p>This program will provide full tuition and a monthly stipend to 50 outstanding undergraduate students pursuing degrees in mechanical, electrical, aerospace, and chemical engineering. Scholars will also have the opportunity to participate in summer internships at various DEIG industrial divisions, gaining hands-on experience in advanced manufacturing and R&D.</p><p>Applications are now open for the upcoming academic year. Interested students can apply through the university portal.</p>',
    imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Headquarters Updates',
    status: 'Published'
  },
  {
    id: 6,
    title: 'Public Notice: Scheduled Maintenance at Gafat Facility',
    date: 'November 5, 2023',
    excerpt: 'Please be advised of scheduled systems maintenance at the GAFEI facility on November 15, 2023. Access will be restricted to essential personnel only.',
    content: '<p><strong>NOTICE TO ALL STAFF AND VISITORS</strong></p><p>Please be advised that the Gafat Armament Engineering Industry (GAEI) facility will undergo scheduled maintenance on its main power grid and security systems on <strong>November 15, 2023</strong>.</p><p>During this period, access to the facility will be restricted to essential maintenance personnel and security staff only. Normal operations are expected to resume on November 16 at 08:00 AM.</p><p>We apologize for any inconvenience this may cause and appreciate your cooperation in ensuring the safety and reliability of our infrastructure.</p>',
    imageUrl: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Public Notice',
    status: 'Draft'
  },
];

export const TENDERS: Tender[] = [
    {
        id: 'TEN-001',
        title: 'Supply of CNC Machining Centers for GAEI',
        category: 'Equipment Supply',
        publishedDate: '2023-11-01',
        closingDate: '2023-11-30',
        status: 'Open',
        summary: 'Invitation to tender for the supply, installation, and commissioning of five (5) high-precision 5-axis CNC machining centers for the Gafat Armament Engineering Industry.'
    },
    {
        id: 'TEN-002',
        title: 'Construction of New Ammunition Storage Bunkers at HAEI',
        category: 'Construction',
        publishedDate: '2023-10-20',
        closingDate: '2023-11-25',
        status: 'Open',
        summary: 'Request for proposals for the construction of ten (10) reinforced, climate-controlled ammunition storage bunkers at the Hommicho facility.'
    },
    {
        id: 'TEN-003',
        title: 'Consultancy Services for ISO 45001 Certification',
        category: 'Consultancy',
        publishedDate: '2023-10-15',
        closingDate: '2023-11-10',
        status: 'Closed',
        summary: 'Seeking consultancy firm to guide DEIG corporate and all divisions through the process of achieving ISO 45001 (Occupational Health & Safety) certification.'
    },
    {
        id: 'TEN-004',
        title: 'Nationwide Logistics and Freight Forwarding Services',
        category: 'Logistics',
        publishedDate: '2023-09-05',
        closingDate: '2023-10-05',
        status: 'Awarded',
        summary: 'Long-term contract awarded for nationwide transportation, freight forwarding, and customs clearance services for all DEIG industries.'
    }
];

export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'med-001',
    name: 'simien_shield_apc.jpg',
    type: 'Image',
    size: '3.1 MB',
    url: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    uploadedBy: 'Admin',
    uploadedAt: '2023-10-28',
    usage: ['HomePage Projects', 'BVEIG Gallery'],
  },
  {
    id: 'med-002',
    name: 'skyguard_radar_system.jpg',
    type: 'Image',
    size: '2.5 MB',
    url: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    uploadedBy: 'Editor',
    uploadedAt: '2023-10-27',
    usage: ['HomePage Projects', 'LEEIG Gallery'],
  },
  {
    id: 'med-003',
    name: 'technical_brief.pdf',
    type: 'Document',
    size: '1.2 MB',
    url: '#',
    thumbnailUrl: '', // Will use an icon instead
    uploadedBy: 'Admin',
    uploadedAt: '2023-10-26',
    usage: ['TEN-001 Tender'],
  },
  {
    id: 'med-004',
    name: 'foundry_operations.mp4',
    type: 'Video',
    size: '25.6 MB',
    url: '#',
    thumbnailUrl: 'https://images.pexels.com/photos/8593456/pexels-photo-8593456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    uploadedBy: 'Industry Manager',
    uploadedAt: '2023-10-25',
    usage: ['HAEI Overview'],
  },
  {
    id: 'med-005',
    name: 'component_schematics.zip',
    type: 'Archive',
    size: '12.4 MB',
    url: '#',
    thumbnailUrl: '',
    uploadedBy: 'Admin',
    uploadedAt: '2023-10-24',
    usage: ['RIG Project Files'],
  },
  {
    id: 'med-006',
    name: 'leadership_portrait_dg.jpg',
    type: 'Image',
    size: '1.8 MB',
    url: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    uploadedBy: 'Admin',
    uploadedAt: '2023-10-23',
    usage: ['About Page'],
  },
];

export const CONTACT_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-001',
    name: 'Supplier Corp',
    email: 'contact@suppliercorp.com',
    subject: 'Inquiry about Tender TEN-001',
    message: 'We would like to request clarification on the specifications for the CNC machining centers...',
    receivedAt: '2023-11-02',
    status: 'Unread',
    assignedTo: 'Procurement',
  },
  {
    id: 'inq-002',
    name: 'Jane Doe',
    email: 'jane.d@example.com',
    subject: 'Career Opportunity Question',
    message: 'I am a recent graduate in aerospace engineering and was wondering if you accept speculative applications...',
    receivedAt: '2023-11-01',
    status: 'Read',
    assignedTo: 'HR Manager',
  },
  {
    id: 'inq-003',
    name: 'Media House',
    email: 'press@mediahouse.com',
    subject: 'Request for Interview',
    message: 'We would like to request an interview with the Director General regarding the recent launch of the Simien Shield APC.',
    receivedAt: '2023-10-30',
    status: 'Resolved',
  },
  {
    id: 'inq-004',
    name: 'John Smith',
    email: 'john.s@example.com',
    subject: 'Technical Support',
    message: 'I am having trouble accessing the supplier portal. Can you please assist?',
    receivedAt: '2023-11-03',
    status: 'Unread',
  },
];

// --- User Management Data ---
// Fix: Updated type annotation from 'Role[]' to 'UserRolePermissions[]'.
export const ROLES: UserRolePermissions[] = [
    {
        id: 'Admin',
        description: 'Full access to all system features and settings.',
        permissions: ['dashboard:view', 'pages:view', 'pages:create', 'pages:edit', 'pages:delete', 'news:view', 'news:create', 'news:edit', 'news:delete', 'industry:view', 'industry:edit', 'vacancies:view', 'vacancies:create', 'vacancies:edit', 'vacancies:delete', 'vacancies:manage_applicants', 'media:view', 'media:upload', 'media:delete', 'inquiries:view', 'inquiries:reply', 'inquiries:manage', 'users:view', 'users:invite', 'users:manage', 'security:view', 'settings:view', 'settings:edit'],
        userCount: 2,
    },
    {
        id: 'Editor',
        description: 'Can manage news, pages, and media content.',
        permissions: ['dashboard:view', 'pages:view', 'pages:edit', 'news:view', 'news:create', 'news:edit', 'media:view', 'media:upload'],
        userCount: 3,
    },
    {
        id: 'Industry Manager',
        description: 'Can only edit their assigned industry division page.',
        permissions: ['dashboard:view', 'industry:view', 'industry:edit', 'media:view', 'media:upload'],
        userCount: 8,
    },
    {
        id: 'HR Manager',
        description: 'Manages all vacancies and applicants.',
        permissions: ['dashboard:view', 'vacancies:view', 'vacancies:create', 'vacancies:edit', 'vacancies:delete', 'vacancies:manage_applicants', 'inquiries:view', 'inquiries:reply'],
        userCount: 2,
    },
    {
        id: 'Viewer',
        description: 'Read-only access to the admin panel.',
        permissions: ['dashboard:view', 'pages:view', 'news:view', 'industry:view', 'vacancies:view'],
        userCount: 5,
    },
];

export const USERS: User[] = [
    { id: 'usr-001', name: 'Admin User', email: 'admin@deig.gov.et', role: 'Admin', lastLogin: '2023-11-03 10:30', status: 'Active', avatarUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg' },
    { id: 'usr-002', name: 'Editor One', email: 'editor1@deig.gov.et', role: 'Editor', lastLogin: '2023-11-03 09:15', status: 'Active', avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg' },
    { id: 'usr-003', name: 'HR Manager', email: 'hr@deig.gov.et', role: 'HR Manager', lastLogin: '2023-11-02 14:00', status: 'Active', avatarUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg' },
    { id: 'usr-004', name: 'Industry Manager (GAEI)', email: 'manager.gaei@deig.gov.et', role: 'Industry Manager', lastLogin: '2023-10-31 11:45', status: 'Inactive', avatarUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg' },
    { id: 'usr-005', name: 'Viewer Account', email: 'viewer@deig.gov.et', role: 'Viewer', lastLogin: '2023-11-03 11:00', status: 'Active', avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
];

export const SECURITY_LOGS: SecurityLog[] = [
    { id: 'log-001', user: 'Admin User', avatarUrl: USERS[0].avatarUrl, action: 'Update', target: 'Page: "About Us"', timestamp: '2023-11-03 14:30', ipAddress: '192.168.1.1' },
    { id: 'log-002', user: 'Editor One', avatarUrl: USERS[1].avatarUrl, action: 'Create', target: 'News Article: "New Partnership Announced"', timestamp: '2023-11-03 11:15', ipAddress: '192.168.1.2' },
    { id: 'log-003', user: 'HR Manager', avatarUrl: USERS[2].avatarUrl, action: 'Delete', target: 'Vacancy: "Junior Technician"', timestamp: '2023-11-02 16:45', ipAddress: '192.168.1.3' },
    { id: 'log-004', user: 'Admin User', avatarUrl: USERS[0].avatarUrl, action: 'Login', target: 'System Login', timestamp: '2023-11-03 10:30', ipAddress: '192.168.1.1' },
    { id: 'log-005', user: 'Unknown', avatarUrl: '', action: 'Failed Login', target: 'System Login', timestamp: '2023-11-03 09:00', ipAddress: '203.0.113.5' },
];

export const ACTIVE_SESSIONS: ActiveSession[] = [
    { id: 'ses-001', user: 'Admin User', avatarUrl: USERS[0].avatarUrl, ipAddress: '192.168.1.1', device: 'Chrome on Windows', lastActivity: '2 minutes ago' },
    { id: 'ses-002', user: 'Editor One', avatarUrl: USERS[1].avatarUrl, ipAddress: '192.168.1.2', device: 'Safari on macOS', lastActivity: '15 minutes ago' },
    { id: 'ses-003', user: 'HR Manager', avatarUrl: USERS[2].avatarUrl, ipAddress: '10.0.5.12', device: 'Chrome on Linux', lastActivity: '1 hour ago' },
    { id: 'ses-004', user: 'Viewer Account', avatarUrl: USERS[4].avatarUrl, ipAddress: '172.16.0.55', device: 'Firefox on Windows', lastActivity: '3 hours ago' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g01', titleKey: 'gallery.item1.title', divisionKey: 'gallery.item1.division', imageUrl: 'https://images.pexels.com/photos/58597/pexels-photo-58597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Aerospace' },
  { id: 'g02', titleKey: 'gallery.item2.title', divisionKey: 'gallery.item2.division', imageUrl: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Land Systems' },
  { id: 'g03', titleKey: 'gallery.item3.title', divisionKey: 'gallery.item3.division', imageUrl: 'https://images.pexels.com/photos/165576/pexels-photo-165576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Naval' },
  { id: 'g04', titleKey: 'gallery.item4.title', divisionKey: 'gallery.item4.division', imageUrl: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Electronics' },
  { id: 'g05', titleKey: 'gallery.item5.title', divisionKey: 'gallery.item5.division', imageUrl: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Manufacturing' },
  { id: 'g06', titleKey: 'gallery.item6.title', divisionKey: 'gallery.item6.division', imageUrl: 'https://images.pexels.com/photos/53874/torpedo-weapon-military-war-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Aerospace' },
  { id: 'g07', titleKey: 'gallery.item7.title', divisionKey: 'gallery.item7.division', imageUrl: 'https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Land Systems' },
  { id: 'g08', titleKey: 'gallery.item8.title', divisionKey: 'gallery.item8.division', imageUrl: 'https://images.pexels.com/photos/2800552/pexels-photo-2800552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Naval' },
  { id: 'g09', titleKey: 'gallery.item9.title', divisionKey: 'gallery.item9.division', imageUrl: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Electronics' },
  { id: 'g10', titleKey: 'gallery.item10.title', divisionKey: 'gallery.item10.division', imageUrl: 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Manufacturing' }
];
