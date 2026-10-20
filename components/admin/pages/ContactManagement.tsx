
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import MediaPickerModal from '../ui/MediaPickerModal';
import { getSettings, updateSettings } from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';
import { Phone, MapPin, Globe, Loader2, Image as ImageIcon, Trash2, Camera } from 'lucide-react';
import type { MediaAsset } from '../../../types';

const ContactManagement: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pickerConfig, setPickerConfig] = useState<{ field: string, isOpen: boolean, types: MediaAsset['type'][] }>({
        field: '',
        isOpen: false,
        types: ['Image', 'Video']
    });
    const { addToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to load settings", error);
                addToast("Failed to load contact settings", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [addToast]);

    const handleInfoChange = (field: string, value: string) => {
        setSettings({
            ...settings,
            contactInfo: {
                ...settings.contactInfo,
                [field]: value
            }
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSettings(settings);
            addToast("Contact settings updated successfully", "success");
        } catch (error) {
            addToast("Failed to update contact settings", "error");
        } finally {
            setSaving(false);
        }
    };

    const openPicker = (field: string, types: MediaAsset['type'][] = ['Image', 'Video']) => {
        setPickerConfig({ field, isOpen: true, types });
    };

    const handleMediaSelect = (asset: MediaAsset) => {
        setSettings({
            ...settings,
            contactInfo: {
                ...settings.contactInfo,
                [pickerConfig.field]: asset.url
            }
        });
        setPickerConfig({ ...pickerConfig, isOpen: false });
    };

    const removeMedia = (field: string) => {
        setSettings({
            ...settings,
            contactInfo: {
                ...settings.contactInfo,
                [field]: ''
            }
        });
    };

    if (loading) return <div className="flex justify-center p-12 text-[#1075BB]"><Loader2 className="w-8 h-8 animate-spin" /></div>;

    if (!settings) return (
        <div className="flex flex-col items-center justify-center p-24 text-red-600">
            <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
                <p className="text-sm text-gray-600 mb-4">Unable to load contact settings. Please check your connection and try again.</p>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        </div>
    );

    const MediaPreview = ({ field, label }: { field: string, label: string }) => {
        const url = settings.contactInfo[field];
        const isVideo = url?.toLowerCase().endsWith('.mp4') || url?.toLowerCase().endsWith('.webm');

        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                {url ? (
                    <div className="relative group rounded-lg overflow-hidden border bg-gray-100 aspect-video max-w-sm">
                        {isVideo ? (
                            <video src={url} className="w-full h-full object-cover" />
                        ) : (
                            <img src={url} alt={label} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button variant="secondary" size="sm" onClick={() => openPicker(field)}>Change</Button>
                            <button 
                                onClick={() => removeMedia(field)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => openPicker(field)}
                        className="w-full max-w-sm aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-brand-blue-500 hover:border-brand-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium">Add {label}</span>
                        <span className="text-xs mt-1">Image or Video</span>
                    </button>
                )}
            </div>
        );
    };

    const inputClasses = "w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-[#1E2B2B] focus:outline-none focus:border-[#1075BB] focus:ring-1 focus:ring-[#1075BB]";

    return (
        <div className="space-y-6 text-[#1E2B2B]">
            {pickerConfig.isOpen && (
                <MediaPickerModal 
                    onClose={() => setPickerConfig({ ...pickerConfig, isOpen: false })}
                    onSelect={handleMediaSelect}
                    allowedTypes={pickerConfig.types}
                    title={`Select ${pickerConfig.field.replace('ImageUrl', '').replace(/([A-Z])/g, ' $1')}`}
                />
            )}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Contact Page Management</h2>
                    <p className="text-sm text-gray-500">Update corporate contact details and headquarters location info.</p>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2 inline" /> : null}
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Card>
                         <div className="flex items-center gap-2 mb-6 text-[#1075BB]">
                             <ImageIcon className="w-5 h-5" />
                            <h3 className="text-lg font-bold">Page Visuals</h3>
                        </div>
                        <div className="space-y-6">
                            <MediaPreview field="heroImageUrl" label="Contact Page Hero Media" />
                            <MediaPreview field="hqImageUrl" label="Headquarters Display Media" />
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-2 mb-6 text-[#1075BB]">
                            <Phone className="w-5 h-5" />
                            <h3 className="text-lg font-bold">Direct Contact Channels</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Label</label>
                                    <input 
                                        className={inputClasses}
                                        value={settings.contactInfo.phoneLabel} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('phoneLabel', e.target.value)}
                                        placeholder="Main Switchboard"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input 
                                        className={inputClasses}
                                        value={settings.contactInfo.phoneValue} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('phoneValue', e.target.value)}
                                        placeholder="+251 11..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Label</label>
                                    <input 
                                        className={inputClasses}
                                        value={settings.contactInfo.emailLabel} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('emailLabel', e.target.value)}
                                        placeholder="General Inquiry"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        className={inputClasses}
                                        value={settings.contactInfo.emailValue} 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('emailValue', e.target.value)}
                                        placeholder="info@..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-2 mb-6 text-[#1075BB]">
                             <MapPin className="w-5 h-5" />
                            <h3 className="text-lg font-bold">Headquarters Location</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location Heading</label>
                                <input 
                                    className={inputClasses}
                                    value={settings.contactInfo.hqLocationTitle} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('hqLocationTitle', e.target.value)}
                                    placeholder="Strategic Command Center"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Label</label>
                                <input 
                                    className={inputClasses}
                                    value={settings.contactInfo.addressLabel} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('addressLabel', e.target.value)}
                                    placeholder="HQ Address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Street Address</label>
                                <input 
                                    className={inputClasses}
                                    value={settings.contactInfo.addressValue} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInfoChange('addressValue', e.target.value)}
                                    placeholder="African Avenue..."
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-[#04253D] text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-5 h-5 text-brand-blue-300" />
                            <h4 className="font-bold">Map Configuration</h4>
                        </div>
                        <p className="text-sm text-white/80 mb-4">The interactive map pins for industrial divisions are managed in <span className="text-brand-blue-300 font-semibold">Industry Management</span>. Each industry can have its own GPS coordinates pinned to the national map.</p>
                        <div className="aspect-video bg-white/10 rounded-md border border-white/20 flex items-center justify-center italic text-xs text-white/40">
                            Map Layout Preview (Placeholder)
                        </div>
                    </Card>

                    <Card>
                        <h4 className="font-bold text-[#04253D] mb-4">Operational Notice</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                                <p className="text-xs text-gray-600">Ensure the email addresses provided are monitored daily.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                <p className="text-xs text-gray-600">Phone numbers should include the country code (+251) for international accessibility.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactManagement;
