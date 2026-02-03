import { Grid, Image as ImageIcon, Plus } from 'lucide-react';

export default function MyFiles() {
    // South African inspired demo gallery content
    const media = [
        { id: 1, title: 'Cultural Portraits', theme: 'Ndebele Patterns', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Urban Skyline', theme: 'Johannesburg CBD', url: 'https://images.unsplash.com/photo-1549117130-36e2f6946059?auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Traditional Dance', theme: 'Zulu Heritage', url: 'https://images.unsplash.com/photo-1614749523305-6490a0701beb?auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Coastline Shoot', theme: 'Clifton Beach', url: 'https://images.unsplash.com/photo-1580971556637-64010b969c3a?auto=format&fit=crop&w=800&q=80' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase">Media <span className="text-red-500">Vault</span></h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Creative Standards</p>
                </div>
                <button className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-900/40">
                    <Plus size={20} />
                </button>
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
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-0.5">{item.theme}</p>
                            <p className="text-[10px] font-bold text-white uppercase">{item.title}</p>
                        </div>
                    </div>
                ))}

                {/* Empty Placeholder Slot */}
                <div className="aspect-square rounded-[2rem] border-2 border-dashed border-gray-800 flex flex-col items-center justify-center text-gray-700 gap-2 hover:border-gray-600 transition-colors">
                    <ImageIcon size={24} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">New Upload</span>
                </div>
            </div>

            <div className="bg-gray-950 border border-gray-900 rounded-3xl p-6 flex items-center gap-4 filter saturate-50">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Grid size={18} className="text-gray-600" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Storage Capacity</p>
                    <div className="w-32 h-1 bg-gray-800 rounded-full mt-1">
                        <div className="w-1/3 h-full bg-red-600 rounded-full shadow-[0_0_8px_#dc2626]"></div>
                    </div>
                </div>
                <p className="ml-auto text-[10px] font-mono text-gray-600 uppercase">3.2 GB / 10 GB</p>
            </div>
        </div>
    );
}
