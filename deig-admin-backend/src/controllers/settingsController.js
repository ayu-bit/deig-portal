const { Settings } = require('../models');

// In-memory storage for settings (can be replaced with database table later)
let settingsCache = {
    siteTitle: 'DEIG - Defense Industry Engineering Group',
    contactEmail: 'contact@deig.gov.et',
    hrEmail: 'hr@deig.gov.et',
    logoUrl: '/images/deiglogo.png',
    expiryDate: '2026-12-31',
    systemStatus: 'Active',
    homeHero: {
        title: 'Engineering Excellence for National Defense',
        subtitle: "DEIG is Ethiopia's leading force in defense technology, innovation, and engineering excellence, driving national self-reliance and industrial modernization.",
        videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4',
        exploreButtonText: 'Explore Our Industries',
        aboutButtonText: 'About DEIG'
    },
    homeStats: [
        { label: 'Employees', value: 5000, suffix: '+' },
        { label: 'Production Units', value: 12, suffix: '' },
        { label: 'Years of Experience', value: 13, suffix: '' },
        { label: 'Patents', value: 25, suffix: '+' }
    ],
    contactInfo: {
        addressLabel: 'Headquarters Address',
        addressValue: 'African Avenue, Bole District, Addis Ababa, Ethiopia',
        phoneLabel: 'Emergency/Support Hotline',
        phoneValue: '+251 11 200 1000',
        emailLabel: 'General Correspondence',
        emailValue: 'info@deig.gov.et',
        hqLocationTitle: 'DEIG Headquarters & Strategic Command'
    },
    whoWeAre: {
        title: 'Who We Are',
        content: 'Defense Industry Engineering Group (DEIG) is a premier state-owned enterprise dedicated to the development, manufacturing, and maintenance of defense systems and dual-use technologies. Our mission is to ensure national security through engineering excellence and technological sovereignty.',
        imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    aboutInfo: {
        heroTitle: 'Our Strategic Legacy',
        heroSubtitle: 'Driving Ethiopia\'s Industrial Innovation since 2011',
        heroImageUrl: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        introTitle: 'Engineering Sovereignty & National Strength',
        introP1: 'Defense Industry Engineering Group (DEIG) stands as the cornerstone of our nation\'s industrial-military complex. We are committed to developing homegrown technological solutions that ensure our strategic independence.',
        introP2: 'With over a decade of dedicated service, we have expanded our reach across multiple industrial sectors, from aerospace and naval engineering to advanced electronics and naval systems.',
        introImageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
};

const getSettings = async (req, res) => {
    try {
        // TODO: Load from database if Settings model exists
        res.status(200).json(settingsCache);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        const newSettings = req.body;
        // Merge with existing settings
        settingsCache = { ...settingsCache, ...newSettings };
        // TODO: Save to database if Settings model exists
        res.status(200).json({ message: 'Settings updated successfully', settings: settingsCache });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getSettings,
    updateSettings
};