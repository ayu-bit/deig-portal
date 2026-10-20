
import * as React from 'react';
import '../types';
import { AnimatedSection } from '../components/AnimatedComponents';
import { createSupplier } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const FormField: React.FC<{ label: string; name: string; type?: string; required?: boolean; children?: React.ReactNode }> = ({ label, name, type = 'text', required = true, children }) => (
    <div>
        <label htmlFor={name} className="block text-brand-blue-50 mb-2 text-sm">{label} {required && '*'}</label>
        {children || <input type={type} id={name} name={name} className="w-full bg-[#04253D] border border-[#1075BB]/30 rounded-md py-3 px-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder-white/20" required={required} />}
    </div>
);

const SupplierRegistrationPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            await createSupplier(formData);
            addToast('Registration successful! Our procurement team will review your application.', 'success');
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            addToast('Submission failed. Please check your connection.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#1075BB] min-h-screen">
            <header className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/4481329/pexels-photo-4481329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-[#1075BB]/90 mix-blend-multiply"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-6xl font-black text-white font-montserrat uppercase tracking-tight mb-4">Supplier Registration</h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-lato">Join our strategic supply chain and partner in Ethiopia's industrial future.</p>
                    </AnimatedSection>
                </div>
            </header>
            
            <main className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <AnimatedSection>
                        <div className="bg-[#0E62A1] p-10 rounded-xl shadow-2xl border border-white/10">
                             <p className="text-center text-white/70 mb-12 font-lato text-lg">
                                Complete the form below to register your company. Your data will be transmitted via a secure encrypted channel directly to our procurement office.
                            </p>
                            <form onSubmit={handleSubmit} className="font-lato space-y-8">
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-px bg-white/20 flex-1"></div>
                                    <h2 className="text-lg font-bold text-white uppercase tracking-widest font-roboto-condensed">1. Entity Details</h2>
                                    <div className="h-px bg-white/20 flex-1"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField label="Legal Company Name" name="companyName" />
                                    <FormField label="Business Reg. Number (TIN/VAT)" name="regNumber" />
                                </div>
                                <FormField label="Registered Office Address" name="address" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField label="Country of Operation" name="country" />
                                    <FormField label="Corporate Website" name="website" type="url" required={false} />
                                </div>
                                
                                <div className="flex items-center gap-4 py-6">
                                    <div className="h-px bg-white/20 flex-1"></div>
                                    <h2 className="text-lg font-bold text-white uppercase tracking-widest font-roboto-condensed">2. Point of Contact</h2>
                                    <div className="h-px bg-white/20 flex-1"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField label="Authorized Liaison Name" name="contactName" />
                                    <FormField label="Official Job Title" name="contactTitle" />
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField label="Official Email Address" name="contactEmail" type="email" />
                                    <FormField label="Direct Phone Number" name="contactPhone" type="tel" />
                                </div>

                                <div className="flex items-center gap-4 py-6">
                                    <div className="h-px bg-white/20 flex-1"></div>
                                    <h2 className="text-lg font-bold text-white uppercase tracking-widest font-roboto-condensed">3. Strategic Profile</h2>
                                    <div className="h-px bg-white/20 flex-1"></div>
                                </div>

                                <FormField label="Core Products / Manufacturing Capabilities" name="services">
                                    <textarea id="services" name="services" rows={4} className="w-full bg-[#04253D] border border-[#1075BB]/30 rounded-md py-3 px-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder-white/20" required placeholder="e.g., Heavy Machinery, Specialized Tooling, Electronic Components..."></textarea>
                                </FormField>
                                
                                <FormField label="Company Profile & Certifications (PDF)" name="documents" required={false}>
                                    <input 
                                        type="file" 
                                        id="documents" 
                                        name="documents" 
                                        className="w-full text-sm text-blue-200 file:mr-4 file:py-3 file:px-6 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-white file:text-[#1075BB] hover:file:bg-gray-100 cursor-pointer" 
                                        accept=".pdf" 
                                    />
                                </FormField>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-white hover:bg-gray-100 text-[#1075BB] font-black py-4 px-8 rounded-lg shadow-xl transition-all duration-300 font-montserrat uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                >
                                    {isSubmitting ? 'Transmitting Secure Data...' : 'Submit Official Registration'}
                                </button>
                                
                                <p className="text-[10px] text-center text-white/50 font-lato">
                                    By submitting this form, you acknowledge that all provided data is accurate and subject to DEIG's strategic background verification protocols.
                                </p>
                            </form>
                        </div>
                    </AnimatedSection>
                </div>
            </main>
        </div>
    );
};

export default SupplierRegistrationPage;
