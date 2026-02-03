import { Grid, Image as ImageIcon, Plus, Filter, Download } from 'lucide-react';

export default function MyFiles() {
    // South African inspired demo gallery content - expanded to 6+ nodes
    const media = [
        { id: 1, title: 'Cultural Portraits', theme: 'Ndebele Patterns', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Urban Skyline', theme: 'Johannesburg CBD', url: 'https://images.unsplash.com/photo-1453928332380-fc3ad95c0241?auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Traditional Dance', theme: 'Zulu Heritage', url: 'https://images.unsplash.com/photo-1614749523305-6490a0701beb?auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Coastline Shoot', theme: 'Clifton Beach', url: 'https://images.unsplash.com/photo-1580971556637-64010b969c3a?auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'Heritage Architecture', theme: 'Bo-Kaap Colors', url: 'https://images.unsplash.com/photo-1549117130-36e2f6946059?auto=format&fit=crop&w=800&q=80' },
        { id: 6, title: 'Natural Wonders', theme: 'Drakensberg Peaks', url: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase">Media <span className="text-red-500">Vault</span></h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Creative Standards</p>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center text-gray-400">
                        <Filter size={18} />
                    </button>
                    <button className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-900/40 hover:scale-105 transition-transform">
                        <Plus size={20} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-4">
                {media.map((item) => (
                    <div key={item.id} className="relative aspect-square rounded-[2rem] overflow-hidden border border-gray-800 group cursor-pointer shadow-xl">
                        <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/20">
                                <Download size={14} className="text-white" />
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-0.5">{item.theme}</p>
                            <p className="text-[10px] font-bold text-white uppercase">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-950 border border-gray-900 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-inner">
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 shadow-xl">
                    <Grid size={24} className="text-red-600" />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Allocation Yield</p>
                        <p className="text-[10px] font-mono text-gray-600 uppercase">3.2 GB / 10 GB</p>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                </div>
            </div>

            <p className="text-center text-[8px] font-black text-gray-800 uppercase tracking-[0.5em] pt-8">
                Blockchain Asset Verification: ACTIVE
            </p>
        </div>
    );
}
