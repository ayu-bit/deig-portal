
import '../types';
import * as React from 'react';
import { AnimatedSection } from '../components/AnimatedComponents';
import { getTenders, createInquiry } from '../services/api';
import type { Tender } from '../types';
import Loader from '../components/Loader';
import { useToast } from '../contexts/ToastContext';

const TenderDetailModal: React.FC<{ tender: Tender; onClose: () => void }> = ({ tender, onClose }) => {
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await createInquiry({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                subject: `Clarification Request: ${tender.id}`,
                message: formData.get('message') as string
            });
            addToast('Inquiry submitted to procurement office.', 'success');
            onClose();
        } catch (err) {
            addToast('Submission failed.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="w-full md:w-1/2 p-8 bg-gray-50 border-r border-gray-200">
                    <button onClick={onClose} className="mb-6 text-[#1075BB] flex items-center gap-2 font-bold uppercase text-xs hover:underline">
                        &larr; Back to list
                    </button>
                    <span className="inline-block px-3 py-1 bg-[#1075BB] text-white text-[10px] font-bold uppercase rounded-full mb-4">{tender.category}</span>
                    <h2 className="text-3xl font-black text-[#1075BB] font-montserrat leading-tight mb-4">{tender.title}</h2>
                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-bold">Tender Reference:</span>
                            <span className="font-mono">{tender.id}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-bold">Date Published:</span>
                            <span>{new Date(tender.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-bold">Closing Deadline:</span>
                            <span className="text-red-600 font-bold">{new Date(tender.closingDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className="font-bold text-[#1075BB] uppercase text-xs tracking-widest mb-3">Tender Summary</h4>
                        <p className="text-gray-700 leading-relaxed font-lato">{tender.summary}</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-[#1075BB] mb-6 font-montserrat">Request Tender Documents</h3>
                    <form onSubmit={handleInquiry} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company / Full Name</label>
                            <input name="name" type="text" required className="w-full p-3 bg-gray-100 border border-gray-200 rounded focus:ring-2 focus:ring-[#1075BB] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Email</label>
                            <input name="email" type="email" required className="w-full p-3 bg-gray-100 border border-gray-200 rounded focus:ring-2 focus:ring-[#1075BB] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message / Requirements</label>
                            <textarea name="message" rows={4} required placeholder="Request specific blueprints or RFP documents..." className="w-full p-3 bg-gray-100 border border-gray-200 rounded focus:ring-2 focus:ring-[#1075BB] outline-none resize-none"></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[#1075BB] hover:bg-[#0E62A1] text-white font-bold uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? 'Transmitting...' : 'Submit Request'}
                        </button>
                    </form>
                    <p className="mt-4 text-[10px] text-gray-400 text-center font-lato">
                        By submitting, you agree to DEIG's standard confidentiality and procurement protocols.
                    </p>
                </div>
            </div>
        </div>
    );
};

const TenderCard: React.FC<{ tender: Tender; onOpen: (t: Tender) => void }> = ({ tender, onOpen }) => {
    const statusColor = {
        Open: 'bg-green-100 text-green-800 border-green-200',
        Closed: 'bg-red-100 text-red-800 border-red-200',
        Awarded: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1075BB] bg-blue-50 px-2 py-1 rounded">DEIG Procurement</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${statusColor[tender.status]}`}>{tender.status}</span>
            </div>
            <h3 className="text-xl font-bold text-[#04253D] group-hover:text-[#1075BB] transition-colors mb-2 font-montserrat">{tender.title}</h3>
            <div className="flex gap-4 mb-4 text-xs font-mono text-gray-500">
                <span>Ref: {tender.id}</span>
                <span>Due: {new Date(tender.closingDate).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-6 font-lato">{tender.summary}</p>
            <button 
                onClick={() => onOpen(tender)}
                className="w-full py-2 bg-gray-50 hover:bg-[#1075BB] border border-[#1075BB] text-[#1075BB] hover:text-white font-bold uppercase text-xs tracking-widest transition-all rounded"
            >
                View Details
            </button>
        </div>
    );
};

const TendersPage: React.FC = () => {
    const [tenders, setTenders] = React.useState<Tender[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedTender, setSelectedTender] = React.useState<Tender | null>(null);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        getTenders().then(setTenders).finally(() => setLoading(false));
    }, []);

    const filtered = tenders.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {selectedTender && <TenderDetailModal tender={selectedTender} onClose={() => setSelectedTender(null)} />}
            
            <header className="bg-[#1075BB] py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 blueprint-overlay opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-6xl font-black font-montserrat uppercase tracking-tight mb-4">Official Tenders</h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto font-lato">DEIG procurement opportunities for local and international suppliers.</p>
                    </AnimatedSection>
                </div>
            </header>

            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                        <div className="relative w-full md:w-96">
                            <input 
                                type="text" 
                                placeholder="Search by title or ref ID..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded shadow-inner focus:ring-2 focus:ring-[#1075BB] outline-none"
                            />
                            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div className="flex gap-2">
                             <span className="text-xs font-bold text-gray-500 uppercase self-center mr-2">Status:</span>
                             <button className="px-3 py-1 bg-[#1075BB] text-white text-xs font-bold rounded">All Active</button>
                        </div>
                    </div>

                    {loading ? <Loader /> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map(tender => (
                                <AnimatedSection key={tender.id}>
                                    <TenderCard tender={tender} onOpen={setSelectedTender} />
                                </AnimatedSection>
                            ))}
                            {filtered.length === 0 && (
                                <div className="col-span-full py-20 text-center bg-white border border-dashed border-gray-300 rounded-lg">
                                    <p className="text-gray-500 font-bold">No matching tenders found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TendersPage;
