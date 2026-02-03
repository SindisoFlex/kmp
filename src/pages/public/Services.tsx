import ServiceList from '../customer/services/ServiceList';

export default function ServicesPage() {
    return (
        <div className="p-10 text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Global Standard Services</h1>
            <ServiceList />
        </div>
    );
}
