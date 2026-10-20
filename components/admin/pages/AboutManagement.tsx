
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import MediaPickerModal from '../ui/MediaPickerModal';
import { getSettings, updateSettings } from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';
import { Loader2, Info, Image as ImageIcon, Send, History, Award, Shield } from 'lucide-react';
import type { MediaAsset } from '../../../types';

const AboutManagement: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pickerConfig, setPickerConfig] = useState<{ field: string, isOpen: boolean, types: MediaAsset['type'][] }>({
        field: '',
        isOpen: false,
        types: ['Image']
    });
    const { addToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to load settings", error);
                addToast("Failed to load about page settings", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [addToast]);

    const info = settings?.aboutInfo || {
        heroTitle: '',
        heroSubtitle: '',
        heroImageUrl: '',
        introTitle: '',
        introP1: '',
        introP2: '',
        introImageUrl: ''
    };

    const handleFieldChange = (section: string, field: string, value: string) => {
        setSettings({
            ...settings,
            [section]: {
                ...(settings[section] || {}),
                [field]: value
            }
        });
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            await updateSettings(settings);
            addToast("About page changes deployed successfully", "success");
        } catch (error) {
            addToast("Deployment failed. Please check network status.", "error");
        } finally {
            setSaving(false);
        }
    };

    const openPicker = (field: string, section: string = 'aboutInfo') => {
        setPickerConfig({ field: `${section}.${field}`, isOpen: true, types: ['Image'] });
    };

    const handleMediaSelect = (asset: MediaAsset) => {
        const [section, field] = pickerConfig.field.split('.');
        setSettings({
            ...settings,
            [section]: {
                ...settings[section],
                [field]: asset.url
            }
        });
        setPickerConfig({ ...pickerConfig, isOpen: false });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-24 text-[#1075BB]">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium animate-pulse">Initializing Management Engine...</p>
        </div>
    );

    if (!settings) return (
        <div className="flex flex-col items-center justify-center p-24 text-red-600">
            <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
                <p className="text-sm text-gray-600 mb-4">Unable to load about page settings. Please check your connection and try again.</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        </div>
    );

    const inputClasses = "w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-[#1E2B2B] font-lato focus:outline-none focus:border-[#1075BB] focus:ring-2 focus:ring-[#1075BB]/10 transition-all text-sm";
    const textAreaClasses = "w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-[#1E2B2B] font-lato focus:outline-none focus:border-[#1075BB] focus:ring-2 focus:ring-[#1075BB]/10 transition-all text-sm resize-none";

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {pickerConfig.isOpen && (
                <MediaPickerModal 
                    onClose={() => setPickerConfig({ ...pickerConfig, isOpen: false })}
                    onSelect={handleMediaSelect}
                    allowedTypes={pickerConfig.types}
                    title="Select Section Asset"
                />
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-[#B3D6F0] shadow-sm">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Info className="w-6 h-6 text-[#1075BB]" />
                        <h2 className="text-2xl font-black text-[#04253D] font-montserrat uppercase tracking-tight">About Us Management</h2>
                    </div>
                    <p className="text-sm text-gray-500 font-lato">Narrating the story of DEIG's strategic importance and engineering legacy.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                        variant="primary" 
                        onClick={handleSave} 
                        disabled={saving}
                        className="px-8 shadow-lg shadow-[#1075BB]/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2 inline" /> : <Send className="w-4 h-4 mr-2 inline" />}
                        Publish Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-8 space-y-8">
                    {/* Hero Section */}
                    <Card className="!p-0 overflow-hidden border-[#B3D6F0]">
                        <div className="bg-[#04253D] p-4 text-white flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-brand-blue-300" />
                            <h3 className="font-bold font-montserrat uppercase tracking-wider text-sm">Hero Visual & Identity</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Page Headline</label>
                                <input 
                                    className={inputClasses}
                                    value={info.heroTitle} 
                                    onChange={(e) => handleFieldChange('aboutInfo', 'heroTitle', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sub-Headline Label</label>
                                <input 
                                    className={inputClasses}
                                    value={info.heroSubtitle} 
                                    onChange={(e) => handleFieldChange('aboutInfo', 'heroSubtitle', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Hero Background Image</label>
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="w-full sm:w-48 aspect-video bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 group">
                                        <img src={info.heroImageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => openPicker('heroImageUrl')} className="text-white text-xs font-bold underline">Replace</button>
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full flex gap-2">
                                        <input 
                                            className={inputClasses}
                                            value={info.heroImageUrl} 
                                            onChange={(e) => handleFieldChange('aboutInfo', 'heroImageUrl', e.target.value)}
                                            placeholder="URL..."
                                        />
                                        <Button variant="secondary" onClick={() => openPicker('heroImageUrl')}>Library</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Introduction Section */}
                    <Card className="!p-0 overflow-hidden border-[#B3D6F0]">
                        <div className="bg-[#1075BB] p-4 text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-white/80" />
                            <h3 className="font-bold font-montserrat uppercase tracking-wider text-sm">Strategic Introduction</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Section Heading</label>
                                        <input 
                                            className={inputClasses}
                                            value={info.introTitle} 
                                            onChange={(e) => handleFieldChange('aboutInfo', 'introTitle', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Primary Narrative Paragraph</label>
                                        <textarea 
                                            className={textAreaClasses}
                                            value={info.introP1} 
                                            onChange={(e) => handleFieldChange('aboutInfo', 'introP1', e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Supporting Narrative Paragraph</label>
                                        <textarea 
                                            className={textAreaClasses}
                                            value={info.introP2} 
                                            onChange={(e) => handleFieldChange('aboutInfo', 'introP2', e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Visual Accent</label>
                                    <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden border border-dashed border-gray-300 relative group cursor-pointer" onClick={() => openPicker('introImageUrl')}>
                                        <img src={info.introImageUrl} alt="Intro Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#04253D]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-xs font-bold px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">Replace Image</span>
                                        </div>
                                    </div>
                                    <input 
                                        className={`${inputClasses} text-[10px]`}
                                        value={info.introImageUrl} 
                                        onChange={(e) => handleFieldChange('aboutInfo', 'introImageUrl', e.target.value)}
                                        placeholder="Image URL..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="xl:col-span-4 space-y-6">
                    <Card>
                        <h4 className="font-bold text-[#04253D] mb-4 flex items-center gap-2 uppercase tracking-tighter">
                            <Award className="w-4 h-4 text-[#1075BB]" /> Advanced Modules
                        </h4>
                        <div className="space-y-2">
                             <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between opacity-60">
                                <span className="text-xs font-bold text-gray-600">Milestone Timeline</span>
                                <span className="text-[9px] px-2 py-0.5 bg-gray-200 text-gray-500 rounded font-bold">LOCKED</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between opacity-60">
                                <span className="text-xs font-bold text-gray-600">Leadership Roster</span>
                                <span className="text-[9px] px-2 py-0.5 bg-gray-200 text-gray-500 rounded font-bold">LOCKED</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between opacity-60">
                                <span className="text-xs font-bold text-gray-600">Partner Ecosystem</span>
                                <span className="text-[9px] px-2 py-0.5 bg-gray-200 text-gray-500 rounded font-bold">LOCKED</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2 italic px-1">
                                Modules for Timeline and Leadership are globally managed via the Corporate Constants registry. Contact developer for structural changes.
                            </p>
                        </div>
                    </Card>

                    <div className="p-4 bg-brand-blue-900 text-white rounded-xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 blur-2xl"></div>
                        <History className="w-6 h-6 mb-4 text-brand-blue-300" />
                        <h4 className="font-bold text-sm mb-2">Did You Know?</h4>
                        <p className="text-xs text-brand-blue-100 leading-relaxed font-lato">
                            The "About Us" page is the second most visited section after the Home page. Ensuring a professional narrative directly correlates with high stakeholder trust units.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutManagement;
