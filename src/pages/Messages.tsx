import BottomNav from '../components/layout/BottomNav';

export default function Messages() {
    return (
        <div className="pb-24 min-h-screen bg-gray-50">
            <header className="bg-white px-6 py-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </header>
            <main className="p-6">
                <p className="text-gray-500">Chat application will appear here.</p>
            </main>
            <BottomNav />
        </div>
    );
}
