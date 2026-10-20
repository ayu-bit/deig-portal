
import * as React from 'react';
import '../../types';
import Card from './ui/Card';
import { getDashboardStats } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { AdminPanelSection } from '../../types';
import Logo from '../Logo';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Tactical Sub-components ---

const SystemVitalityWave: React.FC = () => (
    <div className="flex items-center gap-1 h-8">
        {[...Array(12)].map((_, i) => (
            <div 
                key={i} 
                className="w-1 bg-[#1075BB] rounded-full animate-pulse" 
                style={{ 
                    height: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random()}s`,
                    opacity: 0.3 + Math.random() * 0.7
                }}
            />
        ))}
    </div>
);

const Sparkline: React.FC<{ color?: string }> = ({ color = "#1075BB" }) => (
    <svg viewBox="0 0 100 30" className="w-20 h-8">
        <path
            d={`M0,25 Q15,5 30,20 T60,10 T100,25`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-fade-in"
        />
    </svg>
);

const TacticalKPICard: React.FC<{ title: string; value: string; label: string; icon: React.ReactNode }> = ({ title, value, label, icon }) => (
    <div className="bg-[#04263D] border border-[#1075BB]/30 p-5 relative overflow-hidden group hover:border-[#1075BB] transition-all">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            {icon}
        </div>
        <div className="relative z-10">
            <p className="text-[10px] font-black text-[#1075BB] uppercase tracking-[0.2em] mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-white font-montserrat">{value}</h3>
                <Sparkline />
            </div>
            <p className="text-[10px] text-white/40 mt-2 font-mono uppercase tracking-widest">{label}</p>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 bg-[#1075BB] transition-all group-hover:w-full w-0"></div>
    </div>
);

const IndustryReadinessNode: React.FC<{ acronym: string; status: number }> = ({ acronym, status }) => (
    <div className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/10 rounded group hover:bg-[#1075BB]/20 transition-all">
        <div className="relative">
            <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/10" />
                <circle 
                    cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="transparent" 
                    strokeDasharray={125.6} 
                    strokeDashoffset={125.6 - (status / 100) * 125.6} 
                    className="text-[#1075BB] transition-all duration-1000"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{status}%</div>
        </div>
        <span className="text-[10px] font-bold text-white/60 group-hover:text-white uppercase tracking-tighter">{acronym}</span>
    </div>
);

const DeploymentLogItem: React.FC<{ user: string; action: string; time: string; level: 'INFO' | 'SEC' | 'CRIT' }> = ({ user, action, time, level }) => {
    const levelColors = {
        INFO: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        SEC: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        CRIT: 'text-red-400 bg-red-400/10 border-red-400/20'
    };
    return (
        <div className="flex items-start gap-4 p-3 border-b border-white/5 hover:bg-white/5 transition-colors font-mono">
            <span className={`text-[9px] font-black px-1.5 py-0.5 border rounded ${levelColors[level]}`}>{level}</span>
            <div className="flex-1">
                <p className="text-xs text-white/80"><span className="text-[#1075BB] font-bold">{user}</span> {action}</p>
                <p className="text-[9px] text-white/30 uppercase mt-1">{time}</p>
            </div>
        </div>
    );
};

interface AdminDashboardProps {
    onNavigate: (section: AdminPanelSection) => void;
}

const trafficData = [
    { time: '00:00', value: 400 },
    { time: '04:00', value: 600 },
    { time: '08:00', value: 450 },
    { time: '12:00', value: 900 },
    { time: '16:00', value: 650 },
    { time: '20:00', value: 850 },
    { time: '23:59', value: 700 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
    const [stats, setStats] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const { addToast } = useToast();

    const fetchStats = React.useCallback(async () => {
        setLoading(true);
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (err) {
            addToast('Encryption link unstable. Retrying...', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchStats();
        return () => clearInterval(timer);
    }, [fetchStats]);

    if (loading && !stats) return (
        <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-2 border-[#1075BB] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#1075BB] font-mono text-xs uppercase tracking-widest animate-pulse">Establishing Secure Uplink...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Top Command Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#04263D] p-6 border border-[#1075BB]/30 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-white font-montserrat uppercase tracking-tighter">Strategic Command</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">System Status: Optimal</p>
                        </div>
                    </div>
                    <div className="hidden xl:block h-10 w-px bg-white/10"></div>
                    <div className="hidden xl:block">
                        <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Network Throughput</p>
                        <SystemVitalityWave />
                    </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-right">
                    <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Global Time (UTC)</p>
                        <p className="text-xl font-bold text-white leading-none mt-1">
                            {currentTime.toLocaleTimeString('en-GB', { hour12: false })}
                        </p>
                    </div>
                    <div className="h-10 w-px bg-white/10"></div>
                    <div className="flex flex-col items-end">
                        <button onClick={fetchStats} className="text-[10px] font-black text-[#1075BB] hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
                            <svg className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Refresh Uplink
                        </button>
                        <p className="text-[9px] text-white/20 mt-1 uppercase">Node: ADDIS_CENTER_01</p>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <TacticalKPICard 
                    title="Total Traffic" 
                    value={stats.visitors.toLocaleString()} 
                    label="Estimated Reach"
                    icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                />
                <TacticalKPICard 
                    title="Staff Strength" 
                    value={stats.activeUsers.toString()} 
                    label="Active personnel"
                    icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /></svg>}
                />
                <TacticalKPICard 
                    title="Career Pipeline" 
                    value={stats.openVacancies.toString()} 
                    label="Recruitment active"
                    icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>}
                />
                <TacticalKPICard 
                    title="Secure Inquiries" 
                    value={stats.unreadMessages.toString()} 
                    label="Pending clearance"
                    icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7" /></svg>}
                />
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left: Industrial Matrix */}
                <div className="xl:col-span-2 space-y-6">
                    <Card title="Industrial Readiness Matrix" className="bg-[#04263D] !border-[#1075BB]/30 text-white" titleClassName="!border-white/10" bodyClassName="bg-[#04263D]/50">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { a: 'GAEI', s: 94 }, { a: 'HAEI', s: 88 }, { a: 'BVEIG', s: 91 }, { a: 'BPIG', s: 76 },
                                { a: 'LEEIG', s: 82 }, { a: 'RIG', s: 98 }, { a: 'AEI', s: 65 }, { a: 'NSEI', s: 42 }
                            ].map(ind => (
                                <IndustryReadinessNode key={ind.a} acronym={ind.a} status={ind.s} />
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                            <span>Aggregate Operational Readiness</span>
                            <span className="text-white font-black">{stats.aggregateReadiness}% Effective</span>
                        </div>
                    </Card>

                    <Card title="Traffic Intelligence (Live)" className="bg-[#04263D] !border-[#1075BB]/30 text-white" titleClassName="!border-white/10">
                        <div className="h-48 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1075BB" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#1075BB" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis 
                                        dataKey="time" 
                                        stroke="#ffffff40" 
                                        fontSize={10} 
                                        tickLine={false} 
                                        axisLine={false} 
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#04263D', border: '1px solid #1075BB30', fontSize: '10px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#1075BB" 
                                        fillOpacity={1} 
                                        fill="url(#colorValue)" 
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Right: Security & Activity */}
                <div className="space-y-6">
                    <Card title="Deployment Log" bodyClassName="!p-0 bg-[#04263D]/50 border border-[#1075BB]/30" className="bg-[#04263D] text-white" titleClassName="!border-white/10">
                        <div className="max-h-[420px] overflow-y-auto admin-scrollbar">
                            {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                stats.recentActivity.map((log: any) => (
                                    <DeploymentLogItem 
                                        key={log.id}
                                        level={log.level} 
                                        user={log.user} 
                                        action={log.action} 
                                        time={log.time} 
                                    />
                                ))
                            ) : (
                                <div className="p-8 text-center text-white/30 text-xs font-mono uppercase">No logs registered in this sector.</div>
                            )}
                        </div>
                        <div className="p-4 border-t border-white/10 text-center">
                            <button onClick={() => onNavigate('Security')} className="text-[10px] font-black text-[#1075BB] uppercase tracking-widest hover:underline">View Full Audit Trail</button>
                        </div>
                    </Card>

                    <div className="bg-[#1075BB] p-6 rounded shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                            <Logo className="w-48 h-48" showText={false} />
                        </div>
                        <h4 className="text-white font-black uppercase tracking-tighter text-xl mb-4">Strategic Modules</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 relative z-10">
                            {[
                                { l: 'Home Page', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', target: 'Home Management' },
                                { l: 'About DEIG', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04', target: 'About Management' },
                                { l: 'Contact Info', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', target: 'Contact Management' },
                                { l: 'News Center', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', target: 'News Management' },
                                { l: 'User Access', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', target: 'User Management' },
                                { l: 'Inquiries', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', target: 'Inquiry Management' },
                            ].map(act => (
                                <button 
                                    key={act.l}
                                    onClick={() => onNavigate(act.target as AdminPanelSection)}
                                    className="p-3 bg-white/10 hover:bg-white text-white hover:text-[#1075BB] border border-white/20 rounded flex flex-col items-center gap-2 transition-all group/btn shadow-lg min-h-[70px] justify-center"
                                >
                                    <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={act.icon} /></svg>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">{act.l}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
