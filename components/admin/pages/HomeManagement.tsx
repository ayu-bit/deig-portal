
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import MediaPicker from '../ui/MediaPicker';
import { getSettings, updateSettings } from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';
import { Loader2, Plus, Trash2, Home, BarChart2, Video, Image as ImageIcon, Send, Clock, Info } from 'lucide-react';

const HomeManagement: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activePicker, setActivePicker] = useState<'hero' | 'whoweare' | null>(null);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to load settings", error);
                addToast("Failed to load home page settings", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [addToast]);

    const handleHeroChange = (field: string, value: string) => {
        setSettings({
            ...settings,
            homeHero: {
                ...settings.homeHero,
                [field]: value
            }
        });
    };

    const handleStatChange = (index: number, field: string, value: string | number) => {
        const newStats = [...settings.homeStats];
        newStats[index] = { ...newStats[index], [field]: value };
        setSettings({ ...settings, homeStats: newStats });
    };

    const addStat = () => {
        setSettings({
            ...settings,
            homeStats: [...settings.homeStats, { label: 'New Stat', value: 0, suffix: '' }]
        });
    };

    const removeStat = (index: number) => {
        const newStats = settings.homeStats.filter((_: any, i: number) => i !== index);
        setSettings({ ...settings, homeStats: newStats });
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            await updateSettings(settings);
            addToast("Home page changes deployed successfully", "success");
        } catch (error) {
            addToast("Deployment failed. Please check network status.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleMediaSelect = (url: string) => {
        if (activePicker === 'hero') {
            handleHeroChange('videoUrl', url);
        } else if (activePicker === 'whoweare') {
            setSettings({
                ...settings,
                whoWeAre: {
                    ...settings.whoWeAre,
                    imageUrl: url
                }
            });
        }
        setActivePicker(null);
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
                <p className="text-sm text-gray-600 mb-4">Unable to load home page settings. Please check your connection and try again.</p>
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
            {activePicker && (
                <MediaPicker 
                    onSelect={handleMediaSelect}
                    onClose={() => setActivePicker(null)}
                    title={activePicker === 'hero' ? 'Select Hero background Video' : 'Select "Who We Are" Illustration'}
                    allowedTypes={activePicker === 'hero' ? ['Video'] : ['Image']}
                />
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-[#B3D6F0] shadow-sm">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Home className="w-6 h-6 text-[#1075BB]" />
                        <h2 className="text-2xl font-black text-[#04253D] font-montserrat uppercase tracking-tight">Enterprise Home Management</h2>
                    </div>
                    <p className="text-sm text-gray-500 font-lato">Orchestrate the digital presence of Ethiopia's strategic defense tech group.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                        variant="primary" 
                        onClick={handleSave} 
                        disabled={saving}
                        className="px-8 shadow-lg shadow-[#1075BB]/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2 inline" /> : <Send className="w-4 h-4 mr-2 inline" />}
                        Deploy Configuration
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-8 space-y-8">
                    {/* Hero Branding */}
                    <Card className="!p-0 overflow-hidden border-[#B3D6F0]">
                        <div className="bg-[#04253D] p-4 text-white flex items-center gap-2">
                            <Home className="w-5 h-5 text-brand-blue-300" />
                            <h3 className="font-bold font-montserrat uppercase tracking-wider text-sm">Strategic Hero Identity</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Dominant Vision Title</label>
                                <input 
                                    className={inputClasses}
                                    value={settings.homeHero.title} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHeroChange('title', e.target.value)}
                                    placeholder="e.g. Engineering Ethiopia's Defense"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Mission Narrative Subtitle</label>
                                <textarea 
                                    className={textAreaClasses}
                                    value={settings.homeHero.subtitle} 
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleHeroChange('subtitle', e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Primary Call-to-Action</label>
                                    <input 
                                        className={inputClasses}
                                        value={settings.homeHero.exploreButtonText} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHeroChange('exploreButtonText', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Secondary Route Label</label>
                                    <input 
                                        className={inputClasses}
                                        value={settings.homeHero.aboutButtonText} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHeroChange('aboutButtonText', e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-gray-100">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Immersive Background Asset</label>
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="w-full sm:w-48 aspect-video bg-gray-900 rounded-lg overflow-hidden relative border border-gray-200 group">
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setActivePicker('hero')} className="text-white text-xs font-bold underline">Change Source</button>
                                        </div>
                                        {settings.homeHero.videoUrl ? (
                                            <video src={settings.homeHero.videoUrl} className="w-full h-full object-cover" muted loop />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-4 text-white/40 italic text-[10px] text-center">
                                                <Video className="w-6 h-6 mb-2" />
                                                No video link provided
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 w-full space-y-2">
                                        <div className="flex gap-2">
                                            <input 
                                                className={inputClasses}
                                                value={settings.homeHero.videoUrl} 
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHeroChange('videoUrl', e.target.value)}
                                                placeholder="Direct MP4 URL or select from library..."
                                            />
                                            <Button variant="secondary" onClick={() => setActivePicker('hero')} className="shrink-0">
                                                Library
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-gray-400 italic">Recommended: 1080p MP4, under 15MB for optimal performance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* About DEIG Branding */}
                    <Card className="!p-0 overflow-hidden border-[#B3D6F0]">
                        <div className="bg-[#1075BB] p-4 text-white flex items-center gap-2">
                            <Info className="w-5 h-5 text-white/80" />
                            <h3 className="font-bold font-montserrat uppercase tracking-wider text-sm">Industrial Profile Mastery</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Section Title</label>
                                        <input 
                                            className={inputClasses}
                                            value={settings.whoWeAre?.title || ''} 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({...settings, whoWeAre: {...settings.whoWeAre, title: e.target.value}})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Executive Summary</label>
                                        <textarea 
                                            className={textAreaClasses}
                                            value={settings.whoWeAre?.content || ''} 
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSettings({...settings, whoWeAre: {...settings.whoWeAre, content: e.target.value}})}
                                            rows={6}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Primary Visual</label>
                                    <div className="aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden border border-dashed border-gray-300 relative group cursor-pointer" onClick={() => setActivePicker('whoweare')}>
                                        {settings.whoWeAre?.imageUrl ? (
                                            <img src={settings.whoWeAre.imageUrl} alt="Who we are" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-4 text-gray-400 h-full text-center">
                                                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                                <span className="text-[10px]">Click to Select Illustration</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-[#04253D]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-xs font-bold px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full">Replace Image</span>
                                        </div>
                                    </div>
                                    <input 
                                        className={`${inputClasses} mt-2 text-[10px]`}
                                        value={settings.whoWeAre?.imageUrl || ''} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({...settings, whoWeAre: {...settings.whoWeAre, imageUrl: e.target.value}})}
                                        placeholder="Image URL..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Stats Management */}
                    <Card className="!p-0 overflow-hidden border-[#B3D6F0]">
                        <div className="bg-[#B3D6F0] p-4 text-[#04253D] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart2 className="w-5 h-5" />
                                <h3 className="font-bold font-montserrat uppercase tracking-wider text-sm">Quantifiable Impact Metrics</h3>
                            </div>
                            <Button variant="secondary" size="sm" onClick={addStat} className="bg-white border-transparent hover:bg-white/80">
                                <Plus className="w-4 h-4 mr-1 ml-[-2px]" /> Increment Metric
                            </Button>
                        </div>
                        
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {settings.homeStats.map((stat: any, index: number) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-[#1075BB]/30 transition-colors group">
                                    <div className="grid grid-cols-2 gap-2 flex-1">
                                        <div className="col-span-2">
                                            <input 
                                                className="w-full bg-transparent border-b border-gray-200 focus:border-[#1075BB] outline-none text-xs font-bold py-1 px-1 h-auto"
                                                value={stat.label} 
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStatChange(index, 'label', e.target.value)}
                                                placeholder="Metric Label"
                                            />
                                        </div>
                                        <input 
                                            type="number"
                                            className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#1075BB] outline-none"
                                            value={stat.value} 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStatChange(index, 'value', parseInt(e.target.value) || 0)}
                                        />
                                        <input 
                                            className="w-full bg-white border border-gray-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-[#1075BB] outline-none"
                                            value={stat.suffix} 
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStatChange(index, 'suffix', e.target.value)}
                                            placeholder="Unit/Suffix"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => removeStat(index)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar Utilities */}
                <div className="xl:col-span-4 space-y-6">
                    <Card className="sticky top-24 bg-[#04253D] text-white overflow-hidden border-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-500/20 blur-3xl -mr-16 -mt-16"></div>
                        <h4 className="font-bold font-montserrat flex items-center gap-2 mb-4 relative z-10">
                            <Clock className="w-4 h-4 text-brand-blue-300" />
                            Production Status
                        </h4>
                        <div className="space-y-4 relative z-10">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                <div className="flex justify-between text-[11px] mb-2">
                                    <span className="text-gray-400">Environment</span>
                                    <span className="text-green-400 font-bold uppercase tracking-widest">Live Production</span>
                                </div>
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-gray-400">Last Sync</span>
                                    <span className="text-white">Just now</span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-[11px] text-gray-400 leading-relaxed font-lato">
                                    Saving changes here commits assets and copy globally. Pre-verify all media dimensions for mobile responsiveness.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h4 className="font-bold text-[#04253D] mb-4 flex items-center gap-2">
                            <Home className="w-4 h-4" /> Component Registry
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors border-b border-gray-50">
                                <span className="text-xs text-gray-600 font-medium">Hero Section</span>
                                <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors border-b border-gray-50">
                                <span className="text-xs text-gray-600 font-medium">Impact Stats</span>
                                <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                                <span className="text-xs text-gray-600 font-medium">Map Registry</span>
                                <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold cursor-help" title="Controlled via Industry Management">Managed</span>
                            </div>
                        </div>
                    </Card>

                    <div className="p-4 bg-gradient-to-br from-[#1075BB]/10 to-transparent rounded-xl border border-[#1075BB]/20">
                        <h5 className="text-[11px] font-black text-[#1075BB] uppercase tracking-widest mb-2">Editorial Support</h5>
                        <p className="text-[11px] text-gray-600 leading-relaxed font-lato">
                            Need help with copywriting? Use technical language consistent with ISO 9001:2015 standards and national security directives.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeManagement;
