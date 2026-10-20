
require('dotenv').config();
const { sequelize } = require('./config/db');
const { User, Role, Industry } = require('./models');
const bcrypt = require('bcryptjs');

const rolesData = [
    { name: 'Admin', permissions: ['dashboard:view', 'pages:view', 'pages:create', 'pages:edit', 'pages:delete', 'news:view', 'news:create', 'news:edit', 'news:delete', 'industry:view', 'industry:edit', 'vacancies:view', 'vacancies:create', 'vacancies:edit', 'vacancies:delete', 'vacancies:manage_applicants', 'media:view', 'media:upload', 'media:delete', 'inquiries:view', 'inquiries:reply', 'inquiries:manage', 'users:view', 'users:invite', 'users:manage', 'security:view', 'settings:view', 'settings:edit'] },
    { name: 'Editor', permissions: ['dashboard:view', 'pages:view', 'pages:edit', 'news:view', 'news:create', 'news:edit', 'media:view', 'media:upload'] },
    { name: 'Industry Manager', permissions: ['dashboard:view', 'industry:view', 'industry:edit', 'media:view', 'media:upload'] },
    { name: 'HR Manager', permissions: ['dashboard:view', 'vacancies:view', 'vacancies:create', 'vacancies:edit', 'vacancies:delete', 'vacancies:manage_applicants', 'inquiries:view', 'inquiries:reply'] },
    { name: 'Viewer', permissions: ['dashboard:view', 'pages:view', 'news:view', 'industry:view', 'vacancies:view'] },
];

const usersData = [
    { name: 'Admin User', email: 'admin@deig.gov.et', roleName: 'Admin', avatarUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg' },
    { name: 'Editor One', email: 'editor1@deig.gov.et', roleName: 'Editor', avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg' },
];

const industriesData = [
  {
    id: 'gaei',
    name: 'Gafat Armament Engineering Industry',
    acronym: 'GAEI',
    description: 'GAEI is a center of excellence for weapons systems and defense manufacturing, driving innovation in armament technology.',
    focus: 'Armament systems, weapons technology, and precision engineering.',
    capabilities: [
        { name: 'Small Arms Manufacturing', description: 'Design and high-volume production of assault rifles, carbines, and sidearms meeting stringent military specifications.' },
        { name: 'Ordnance Production', description: 'Manufacturing of mortar systems, grenade launchers, and medium-caliber cannons for infantry and vehicle applications.' },
        { name: 'Rocket and Missile Systems', description: 'Development and assembly of short-range tactical rockets and anti-tank guided missile (ATGM) systems.' },
        { name: 'Advanced Materials Research', description: 'Research and application of composite materials and advanced alloys for weapon components and ballistic protection.' }
    ],
    products: [
        { name: 'DK-21 Assault Rifle', description: 'A rugged, reliable 7.62x39mm assault rifle, designed for performance in harsh environments.', imageUrl: 'https://images.pexels.com/photos/1239857/pexels-photo-1239857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: '81mm Mortar System', description: 'A medium-weight mortar system providing effective indirect fire support for infantry units.', imageUrl: 'https://images.pexels.com/photos/53874/torpedo-weapon-military-war-53874.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Simien ATGM', description: 'A man-portable anti-tank guided missile system capable of defeating modern main battle tanks.', imageUrl: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Ceramic Composite Armor', description: 'Lightweight, multi-hit capable armor panels for vehicle and personal protection applications.', imageUrl: 'https://images.pexels.com/photos/7388796/pexels-photo-7388796.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    gallery: [
      'https://images.pexels.com/photos/7388796/pexels-photo-7388796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1239857/pexels-photo-1239857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/53874/torpedo-weapon-military-war-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    location: { top: '38%', left: '56%' },
    video: 'https://videos.pexels.com/video-files/5945846/5945846-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
      { title: 'Advanced Barrel Rifling Technology', description: 'Proprietary cold hammer forging process that increases barrel life and accuracy by over 30%.' },
      { title: 'Composite Material Ballistics', description: 'Development of lightweight, multi-layered composite armor capable of defeating modern kinetic energy threats.' },
    ],
    contact: {
      email: 'gaei.info@deig.gov.et',
      phone: '+251 11 200 1001'
    },
    facilityInfo: {
      location: 'Gafat, Amhara Region',
      area: '1,200,000 sq. meters',
      keyFeatures: ['Automated Production Lines', 'Advanced Ballistics Testing Range', 'Metallurgy and Composites Lab']
    },
    status: 'Published',
    contactPerson: 'A. Tadesse'
  },
  {
    id: 'haei',
    name: 'Hommicho Ammunition Engineering Industry',
    acronym: 'HAEI',
    description: 'HAEI is at the forefront of ammunition engineering, specializing in the production of a wide range of reliable and advanced munitions for national defense.',
    focus: 'Ammunition manufacturing, pyrotechnics, and energetic materials.',
    capabilities: [
        { name: 'Caliber Ammunition Production', description: 'Automated production lines for small (5.56mm, 7.62mm), medium (12.7mm, 14.5mm), and large caliber (122mm, 155mm) ammunition.' },
        { name: 'Propellant & Explosive Formulation', description: 'Specialized facilities for the safe formulation and production of high-energy propellants and explosive compounds.' },
        { name: 'Fuse and Detonator Assembly', description: 'Precision assembly of mechanical and electronic fuses for artillery shells, mortars, and other ordnance.' },
        { name: 'Ballistic Testing', description: 'Comprehensive quality assurance through rigorous ballistic testing for velocity, accuracy, and reliability.' }
    ],
    products: [
        { name: '155mm Artillery Shells', description: 'High-Explosive (HE) long-range artillery projectiles for modern howitzer systems.', imageUrl: 'https://images.pexels.com/photos/6625129/pexels-photo-6625129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: '7.62x51mm Cartridges', description: 'High-quality, reliable cartridges for designated marksman rifles and general-purpose machine guns.', imageUrl: 'https://images.pexels.com/photos/6625129/pexels-photo-6625129.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'PG-7 Rocket Warheads', description: 'High-Explosive Anti-Tank (HEAT) warheads for rocket-propelled grenade systems.', imageUrl: 'https://images.pexels.com/photos/6625129/pexels-photo-6625129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Demolition Charges', description: 'Stable and powerful explosive charges for engineering and demolition applications.', imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
    ],
    gallery: [
      'https://images.pexels.com/photos/6625129/pexels-photo-6625129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8593456/pexels-photo-8593456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    location: { top: '75%', left: '48%' },
    video: 'https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
      { title: 'High-Yield Propellant Chemistry', description: 'Formulation of advanced propellants that offer higher energy density and improved stability, increasing projectile range and consistency.' },
      { title: 'Smart Fuse Technology', description: 'Integration of programmable, multi-option fuses (proximity, delay, impact) for enhanced artillery effectiveness.' },
    ],
    contact: {
      email: 'haei.info@deig.gov.et',
      phone: '+251 11 200 1002'
    },
    facilityInfo: {
        location: 'Hommicho, Oromia Region',
        area: '2,500,000 sq. meters',
        keyFeatures: ['Large-Scale Propellant Mixing Bays', 'Automated Cartridge Assembly Lines', 'Indoor and Outdoor Ballistic Test Ranges']
    },
    status: 'Published',
    contactPerson: 'B. Kebede'
  },
  {
    id: 'bveig',
    name: 'Bishoftu Vehicle Engineering Industry Group',
    acronym: 'BVEIG',
    description: 'BVEIG designs and manufactures a wide range of military vehicles and transport systems, ensuring mobility and protection for armed forces.',
    focus: 'Military and specialized vehicle design, manufacturing, and maintenance.',
    capabilities: [
        { name: 'Armored Vehicle Design', description: 'Indigenous design and prototyping of Armored Personnel Carriers (APCs) and Infantry Fighting Vehicles (IFVs).' },
        { name: 'Tactical Truck Manufacturing', description: 'Assembly lines for producing logistics trucks, troop carriers, and other specialized transport vehicles.' },
        { name: 'Systems Integration', description: 'Integration of weapons systems, communications suites, and C4I systems onto vehicle platforms.' },
        { name: 'Mobility System Testing', description: 'A dedicated test track for evaluating vehicle performance in off-road conditions, including gradient and obstacle crossing.' }
    ],
    products: [
        { name: 'Simien Shield 8x8 APC', description: 'A modern, modular armored personnel carrier with superior mobility and crew protection.', imageUrl: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Bishoftu 10T Logistics Truck', description: 'A robust 6x6 tactical truck for transporting troops, supplies, and equipment in demanding environments.', imageUrl: 'https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Mobile Command Center', description: 'A specialized vehicle equipped with advanced communication and command-and-control systems.', imageUrl: 'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'MRAP Vehicle', description: 'Mine-Resistant Ambush Protected vehicle with a V-hull design to deflect explosive blasts.', imageUrl: 'https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    gallery: [
      'https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/13693441/pexels-photo-13693441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1268551/pexels-photo-1268551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    model3d: 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/2CylinderEngine/glTF-Binary/2CylinderEngine.glb',
    location: { top: '58%', left: '53%' },
    video: 'https://videos.pexels.com/video-files/7578335/7578335-hd_1920_1080_25fps.mp4',
    technicalHighlights: [
        { title: 'Modular Armor System', description: 'Scalable and field-replaceable armor packages that allow vehicles to be adapted for specific threat environments.' },
        { title: 'Hybrid-Electric Drivetrain', description: 'Development of a prototype hybrid-electric drivetrain for tactical vehicles, enabling silent watch capability and improved fuel efficiency.' },
    ],
    contact: {
        email: 'bveig.info@deig.gov.et',
        phone: '+251 11 200 1003'
    },
    facilityInfo: {
        location: 'Bishoftu, Oromia Region',
        area: '1,800,000 sq. meters',
        keyFeatures: ['Vehicle Assembly Lines', 'Robotic Welding Stations', 'Mobility Test Track & Obstacle Course']
    },
    status: 'Published',
    contactPerson: 'C. Desta'
  },
  {
    id: 'bpig',
    name: 'Brana Printing & Packaging Industry Group',
    acronym: 'BPIG',
    description: 'BPIG delivers secure printing, labeling, and military-grade packaging solutions, safeguarding sensitive materials and equipment.',
    focus: 'Secure printing, labeling, and military-grade packaging solutions.',
    capabilities: [
        { name: 'High-Security Printing', description: 'Production of sensitive documents, identification cards, and certificates with anti-counterfeiting features.' },
        { name: 'Tamper-Evident Labeling', description: 'Design and printing of labels that provide clear evidence of any tampering attempts.' },
        { name: 'Durable Goods Packaging', description: 'Manufacturing of rugged, military-standard packaging for weapons, ammunition, and electronics.' },
        { name: 'Logistics Marking', description: 'Stenciling, labeling, and RFID tagging for effective supply chain and inventory management.' }
    ],
    products: [
        { name: 'Secure ID Documents', description: 'Official identification documents incorporating holograms, microprinting, and other security features.', imageUrl: 'https://images.pexels.com/photos/4039164/pexels-photo-4039164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'MIL-STD Packaging Crates', description: 'Custom-built wooden and composite crates designed to meet military standards for durability and transport.', imageUrl: 'https://images.pexels.com/photos/163737/logistics-cardboard-boxes-distribution-channel-163737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Ammunition Box Stencils', description: 'Precise and durable markings for ammunition containers, ensuring clear identification and safety.', imageUrl: 'https://images.pexels.com/photos/4481329/pexels-photo-4481329.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'RFID Tracking Labels', description: 'Smart labels with embedded RFID chips for real-time tracking of high-value assets.', imageUrl: 'https://images.pexels.com/photos/7692998/pexels-photo-7692998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
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
        { title: 'Holographic Security Printing', description: 'Multi-layered holographic printing techniques for anti-counterfeiting applications on sensitive documents.' },
        { title: 'RFID-Embedded Packaging', description: 'Smart packaging solutions with embedded RFID tags for real-time asset tracking and inventory management.' },
    ],
    contact: {
        email: 'bpig.info@deig.gov.et',
        phone: '+251 11 200 1004'
    },
    facilityInfo: {
        location: 'Addis Ababa',
        area: '50,000 sq. meters',
        keyFeatures: ['Secure Printing Vaults', 'Automated Packaging Lines', 'Climate-Controlled Storage']
    },
    status: 'Published',
    contactPerson: 'D. Fikru'
  },
  {
    id: 'leeig',
    name: 'Legedadi Radio & Electronics Engineering Industry Group',
    acronym: 'LEEIG',
    description: 'LEEIG develops cutting-edge electronic systems, radio, radar, and secure communication modules tailored for critical defense applications.',
    focus: 'Electronics, sensors, radio, radar, and secure communications.',
    capabilities: [
        { name: 'PCB Design and Fabrication', description: 'In-house capability for designing and manufacturing multi-layered Printed Circuit Boards (PCBs) for defense electronics.' },
        { name: 'Software-Defined Radio (SDR)', description: 'Development of flexible and secure tactical communication systems based on SDR technology.' },
        { name: 'Radar System Development', description: 'Design and assembly of air surveillance, ground surveillance, and fire control radar systems.' },
        { name: 'Opto-electronics', description: 'Production of night vision devices, thermal imagers, and laser rangefinders for enhanced situational awareness.' }
    ],
    products: [
        { name: 'Battlefield Management System', description: 'A networked command and control system providing real-time tactical information to commanders.', imageUrl: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'SkyGuard Air Surveillance Radar', description: 'A long-range radar system for detecting and tracking aerial threats, ensuring airspace sovereignty.', imageUrl: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Secure Tactical Radios', description: 'A family of encrypted, frequency-hopping radios for secure voice and data communication.', imageUrl: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Night Vision Goggles', description: 'Advanced image-intensifying goggles for nighttime operations, providing a clear tactical advantage.', imageUrl: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
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
        { title: 'Gallium Nitride (GaN) Radar Amplifiers', description: 'Use of GaN technology to create more powerful, efficient, and compact radar systems with extended range.' },
        { title: 'Quantum-Resistant Encryption', description: 'Development of next-generation cryptographic protocols to secure communications against future quantum computing threats.' },
    ],
    contact: {
        email: 'leeig.info@deig.gov.et',
        phone: '+251 11 200 1005'
    },
    facilityInfo: {
        location: 'Legedadi, Oromia Region',
        area: '300,000 sq. meters',
        keyFeatures: ['Class 10,000 Cleanrooms', 'Anechoic Chambers for RF Testing', 'Automated PCB Assembly (SMT) Lines']
    },
    status: 'Published',
    contactPerson: 'E. Gizaw'
  },
  {
    id: 'rig',
    name: 'Research & Innovation Group',
    acronym: 'RIG',
    description: 'RIG is the central hub for advanced research, development, and innovation, driving the future of defense technology for all DEIG divisions.',
    focus: 'Advanced materials, AI, cyber-security, and next-gen systems.',
    capabilities: [
        { name: 'Material Science Research', description: 'Fundamental research into advanced composites, nanomaterials, and specialty alloys for defense applications.' },
        { name: 'Artificial Intelligence in Defense', description: 'Developing AI/ML algorithms for autonomous systems, predictive maintenance, and intelligence analysis.' },
        { name: 'Cyber Warfare Simulation', description: 'Creating sophisticated virtual environments to test and strengthen national cyber defense capabilities.' },
        { name: 'Unmanned Systems Prototyping', description: 'Rapid prototyping and testing of next-generation unmanned aerial, ground, and surface vehicles.' }
    ],
    products: [
        { name: 'AI Threat Analysis Software', description: 'An AI-driven platform that analyzes sensor data to identify and prioritize potential threats in real-time.', imageUrl: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Graphene-Composite Armor', description: 'Experimental lightweight armor panels leveraging the unique properties of graphene for enhanced protection.', imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Secure Communication Protocols', description: 'Development of quantum-resistant encryption algorithms for future-proof secure communications.', imageUrl: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Autonomous Drone Platforms', description: 'Modular drone platforms designed for rapid adaptation to reconnaissance, logistics, and combat roles.', imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
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
        { title: 'AI-Powered Threat Recognition', description: 'Machine learning models that can autonomously identify and classify threats from sensor data in real-time.' },
        { title: 'Graphene-Based Armor', description: 'Experimental research into graphene-enhanced composites for ultra-lightweight and high-strength ballistic protection.' },
    ],
    contact: {
        email: 'rig.info@deig.gov.et',
        phone: '+251 11 200 1006'
    },
    facilityInfo: {
        location: 'Addis Ababa Science and Technology University Campus',
        area: '25,000 sq. meters',
        keyFeatures: ['Advanced Computing Cluster', 'Cyber Range Simulation Lab', 'Materials Science & Nanotechnology Wing']
    },
    status: 'Published',
    contactPerson: 'F. Lemma'
  },
  {
    id: 'aei',
    name: 'Aerospace Engineering Industry',
    acronym: 'AEI',
    description: 'AEI leads the design, development, and manufacturing of advanced aerospace systems, including unmanned aerial vehicles (UAVs) and satellite components.',
    focus: 'Aerospace systems, UAVs, satellite technology, and avionics.',
    capabilities: [
        { name: 'UAV Design & Manufacturing', description: 'End-to-end design, prototyping, and serial production of tactical and strategic Unmanned Aerial Vehicles.' },
        { name: 'Avionics Integration', description: 'Integration of advanced flight control systems, sensors, and communication suites for aerial platforms.' },
        { name: 'Satellite Subsystem Development', description: 'Development and assembly of key satellite components, including communication payloads and control systems.' },
        { name: 'Aerodynamic Testing', description: 'Utilizing wind tunnels and computational fluid dynamics (CFD) for airframe design and optimization.' }
    ],
    products: [
        { name: 'Tekeze Reconnaissance Drone', description: 'A medium-altitude, long-endurance (MALE) UAV for surveillance and intelligence gathering.', imageUrl: 'https://images.pexels.com/photos/89959/pexels-photo-89959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Ras Dejen Combat UAV', description: 'An unmanned combat aerial vehicle (UCAV) capable of carrying precision-guided munitions.', imageUrl: 'https://images.pexels.com/photos/89959/pexels-photo-89959.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'EthioSat-Com', description: 'A series of communication satellite modules designed for secure national data and voice transmission.', imageUrl: 'https://images.pexels.com/photos/41006/satellite-soyuz-rocket-space-41006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Aircraft Modernization Kits', description: 'Avionics and structural upgrade packages to extend the service life of existing military aircraft.', imageUrl: 'https://images.pexels.com/photos/532353/pexels-photo-532353.jpeg?auto=compress&cs=tinysrgb&w=800' }
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
        { title: 'Autonomous Flight Control Systems', description: 'Advanced AI-driven flight controllers for UAVs, enabling complex mission execution without constant human intervention.' },
        { title: 'Hypersonic Aerodynamics Simulation', description: 'Computational Fluid Dynamics (CFD) modeling of flight characteristics at speeds exceeding Mach 5.' },
    ],
    contact: {
        email: 'aei.info@deig.gov.et',
        phone: '+251 11 200 1007'
    },
    facilityInfo: {
        location: 'Bishoftu Air Base Complex',
        area: '450,000 sq. meters',
        keyFeatures: ['UAV Assembly Hangar', 'Wind Tunnel Test Facility', 'Avionics Integration Lab', 'Satellite Cleanroom Assembly']
    },
    status: 'Published',
    contactPerson: 'G. Haile'
  },
  {
    id: 'nsei',
    name: 'Naval Systems Engineering Industry',
    acronym: 'NSEI',
    description: 'NSEI specializes in the construction and maintenance of naval vessels and marine systems, bolstering maritime security and sovereignty.',
    focus: 'Naval architecture, shipbuilding, marine systems, and coastal defense.',
    capabilities: [
        { name: 'Patrol Boat Construction', description: 'Design and construction of fast and agile patrol boats for coastal and maritime security operations.' },
        { name: 'Marine Propulsion Systems', description: 'Maintenance, repair, and overhaul (MRO) of marine engines and propulsion systems.' },
        { name: 'Naval Weapons Integration', description: 'Integration of naval guns, missile systems, and torpedoes onto marine platforms.' },
        { name: 'Ship Repair and Overhaul', description: 'Providing comprehensive repair and life-extension services for naval and commercial vessels.' }
    ],
    products: [
        { name: 'Awash-Class Patrol Boat', description: 'A fast coastal patrol vessel designed for interception, surveillance, and maritime law enforcement.', imageUrl: 'https://images.pexels.com/photos/165576/pexels-photo-165576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Coastal Surveillance System', description: 'A networked system of radar and electro-optical sensors for monitoring maritime traffic.', imageUrl: 'https://images.pexels.com/photos/1034657/pexels-photo-1034657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { name: 'Naval Fire Control Systems', description: 'Integrated systems for controlling and directing naval gun and missile fire with high accuracy.', imageUrl: 'https://images.pexels.com/photos/1575385/pexels-photo-1575385.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Baro-Class USV', description: 'An Unmanned Surface Vessel for autonomous mine countermeasures and intelligence gathering missions.', imageUrl: 'https://images.pexels.com/photos/2800552/pexels-photo-2800552.jpeg?auto=compress&cs=tinysrgb&w=800' }
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
        { title: 'Stealth Hull Design', description: 'Advanced hull shaping and material coating to reduce the radar cross-section (RCS) of naval patrol vessels.' },
        { title: 'Unmanned Surface Vessel (USV) Swarm Logic', description: 'Development of command-and-control software for coordinating the autonomous operation of multiple USVs.' },
    ],
    contact: {
        email: 'nsei.info@deig.gov.et',
        phone: '+251 11 200 1008'
    },
    facilityInfo: {
        location: 'Port of Djibouti / National Shipyard',
        area: '600,000 sq. meters',
        keyFeatures: ['Dry Dock Facilities', 'Shipbuilding Berths', 'Marine Engine Overhaul Workshop', 'Naval Systems Integration Lab']
    },
    status: 'Draft',
    contactPerson: 'H. Mariam'
  }
];

const seed = async () => {
    try {
        await sequelize.authenticate();
        // Force sync to clear tables and start fresh
        await sequelize.sync({ force: true });
        console.log('Database cleared.');

        // Roles
        const roles = await Role.bulkCreate(rolesData);
        const roleMap = {};
        roles.forEach(r => roleMap[r.name] = r.id);

        // Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        
        for (const u of usersData) {
            await User.create({
                ...u,
                password: hashedPassword,
                roleId: roleMap[u.roleName],
                status: 'Active'
            });
        }
        console.log('Users & Roles Seeded.');

        // Industries
        for (const industry of industriesData) {
            await Industry.create(industry);
        }
        console.log('Industries Seeded.');

        console.log('Seeding Complete. Admin: admin@deig.gov.et / password123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
