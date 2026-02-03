import { ArrowRight, Camera, Video, Monitor, PenTool, Printer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const highlights = [
        { icon: Camera, title: 'Photography', desc: 'Global standard captures.' },
        { icon: Video, title: 'Videography', desc: 'Cinematic storytelling.' },
        { icon: Monitor, title: 'Web & App', desc: 'Digital excellence.' },
        { icon: PenTool, title: 'Graphic Design', desc: 'Unique visual identity.' },
        { icon: Printer, title: 'Printing', desc: 'High-quality finishes.' },
        { icon: Zap, title: 'AI Training', desc: 'Future-ready skills.' },
    ];

    return (
        <div className="bg-gray-950 min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-[100px]"></div>

                <div className="z-10 text-center space-y-6">
                    <div className="inline-block px-3 py-1 bg-red-600/10 border border-red-500/20 rounded-full mb-4">
                        <span className="text-red-500 text-[10px] uppercase font-bold tracking-widest">Black Owned & Global Ready</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        KASILAM <br />
                        <span className="text-red-600">MEDIA</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-lg max-w-md mx-auto font-light">
                        Futuristic media production platform rooted in township creativity and professional standards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
                        <Link to="/services" className="bg-red-600 px-8 py-3 rounded font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 group shadow-xl shadow-red-900/20 text-sm italic tracking-widest uppercase">
                            Book a Service <ArrowRight className="group-hover:translate-x-1 transition" size={16} />
                        </Link>
                        <Link to="/gallery" className="border border-gray-700 px-8 py-3 rounded font-bold hover:bg-gray-800 transition text-sm italic tracking-widest uppercase">
                            View Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Access Grid */}
            <section className="p-6 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 pb-20">
                {highlights.map((item, idx) => (
                    <div key={idx} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:border-red-600/50 transition group cursor-pointer">
                        <item.icon className="text-red-500 mb-4 group-hover:scale-110 transition" size={24} />
                        <h3 className="text-sm font-bold uppercase tracking-tight text-white">{item.title}</h3>
                        <p className="text-[10px] text-gray-500 mt-1">{item.desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
