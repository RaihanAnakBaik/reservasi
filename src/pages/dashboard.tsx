import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AvailableRooms from '../components/AvailableRooms';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const roomListRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const scrollToRooms = () => {
        roomListRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const rooms = [
        'Ruangan Auditorium 1',
        'Ruangan Rapat Kecil',
        'Ruangan Rapat Mandiri',
        'Ruangan Rapat Piring',
        'Ruangan Rapat Sanggar',
        'Ruangan Rapat Kencana',
        'Ruangan Sport GYM',
        'Ruangan Rapat Kualitas'
    ];

    const filteredRooms = rooms.filter(room =>
        room.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNotificationClick = () => {
        alert("Anda memiliki jadwal meeting di Ruangan Rapat Kecil pukul 14:00 WIB");
    };

    const handleViewDetail = (room: string) => {
        setSelectedRoom(room);
        setIsDetailOpen(true);
    };

    const closeDetail = () => {
        setSelectedRoom(null);
        setIsDetailOpen(false);
    };

    const handleReservasi = () => {
        if (selectedRoom) {
            router.push(`/reservasi?ruangan=${encodeURIComponent(selectedRoom)}`);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative min-h-screen bg-blue-300">
            <header className="header">
                <div className="flex items-center space-x-8">
                    <Image
                        src="/gabung.svg"
                        alt="Logo KAI dan LRT"
                        width={200}
                        height={80}
                        className="object-contain"
                    />
                    <nav>
                        <ul className="flex gap-6 text-gray-700">
                            <li className="hover:text-blue-600 cursor-pointer">
                                Halaman Utama
                            </li>
                            <li 
                                className="hover:text-blue-600 cursor-pointer"
                                onClick={scrollToRooms}
                            >
                                Ruangan
                            </li>
                            <li 
                                className="hover:text-blue-600 cursor-pointer"
                                onClick={() => router.push('/reservasi')}
                            >
                                Reservasi
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative cursor-pointer group" onClick={handleNotificationClick}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                            />
                        </svg>
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                1
                            </span>
                            <div className="hidden group-hover:block absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-gray-800">Notifikasi Terbaru</h4>
                                    <span className="text-xs text-blue-500 cursor-pointer hover:text-blue-700">
                                        Tandai sudah dibaca
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                        <div className="flex-shrink-0">
                                            <svg 
                                                className="h-8 w-8 text-blue-500" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800">
                                                Jadwal Meeting
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Anda memiliki jadwal meeting di Ruangan Rapat Kecil
                                            </p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <span className="text-xs font-medium text-blue-600">
                                                    14:00 WIB
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    • 2 menit yang lalu
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <button className="w-full text-center text-sm text-blue-500 hover:text-blue-700">
                                        Lihat Semua Notifikasi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">
                        <div className="cursor-pointer hover:text-blue-600 transition-colors text-xl" onClick={toggleMenu}>
                            👤
                        </div>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                                <div className="py-1">
                                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="main-content">
                <AvailableRooms />
                <section className="room-search mt-8">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Cari Ruangan untuk dilihat secara detail"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-4 border rounded-lg pl-12 focus:outline-none focus:border-blue-400" 
                        />
                        <svg 
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            width="20" 
                            height="20" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    {searchQuery && filteredRooms.length === 0 && (
                        <p className="text-gray-500 mt-4 text-center">
                            Tidak ada ruangan yang sesuai dengan pencarian "{searchQuery}"
                        </p>
                    )}
                </section>
                <section ref={roomListRef} className="room-list">
                    {filteredRooms.map((room, index) => (
                        <div className="room-card hover:shadow-lg transition-shadow duration-300" key={index}>
                            <img 
                                src="/mage.svg" 
                                alt={`Room ${room}`}
                                className="w-full h-48 object-cover rounded-t-lg" 
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">{room}</h3>
                                <button 
                                    className="w-full bg-blue-400 text-white px-6 py-2.5 rounded-lg 
                                             hover:bg-blue-500 transition-colors duration-200 
                                             flex items-center justify-center gap-2 font-medium"
                                    onClick={() => handleViewDetail(room)}
                                >
                                    <span>View Details</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            {isDetailOpen && selectedRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full mx-4 overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <svg 
                                className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" 
                                onClick={closeDetail} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Bagian Kiri - Informasi Ruangan */}
                            <div className="p-6 border-r border-gray-200">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedRoom}</h2>
                                </div>

                                <div className="mt-4">
                                    <img 
                                        src="/mage.svg" 
                                        alt={selectedRoom}
                                        className="w-full h-48 object-cover rounded-lg" 
                                    />
                                </div>

                                <div className="mt-6 space-y-4">
                                    <p className="font-medium text-gray-700">Fasilitas :</p>
                                    <div className="flex items-center gap-3">
                                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="text-gray-600">Kapasitas 50 Orang</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 10l1.5-1.5M3 14l1.5 1.5M21 10l-1.5-1.5M21 14l-1.5 1.5" />
                                        </svg>
                                        <span className="text-gray-600">Projector</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a4 4 0 004-4V6a4 4 0 10-8 0v4a4 4 0 004 4z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6m0 0a2 2 0 01-2 2h4a2 2 0 01-2-2zm0 0a2 2 0 01-2-2h4a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-gray-600">Mic</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bagian Kanan - Jadwal Booking */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Ruangan ini telah di booking pada:
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-medium text-gray-600 pb-2 border-b">
                                        <span className="w-1/3">Tanggal Pinjam</span>
                                        <span className="w-1/3 text-center">Jam Mulai</span>
                                        <span className="w-1/3 text-center">Jam Akhir</span>
                                    </div>

                                    {[
                                        { date: '10-25-2024', start: '08:00', end: '09:40' },
                                        { date: '10-26-2024', start: '08:00', end: '09:40' },
                                        { date: '10-27-2024', start: '08:00', end: '09:40' },
                                        { date: '10-28-2024', start: '08:00', end: '09:40' },
                                        { date: '10-29-2024', start: '08:00', end: '09:40' },
                                        { date: '10-30-2024', start: '08:00', end: '09:40' },
                                        { date: '10-31-2024', start: '08:00', end: '09:40' },
                                        { date: '11-01-2024', start: '08:00', end: '09:40' },
                                    ].map((booking, index) => (
                                        <div key={index} className="flex justify-between text-sm text-gray-600">
                                            <span className="w-1/3">{booking.date}</span>
                                            <span className="w-1/3 text-center">{booking.start}</span>
                                            <span className="w-1/3 text-center">{booking.end}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-between items-center">
                                <button 
                                    className="w-full bg-blue-400 text-white px-6 py-2.5 rounded-lg 
                                             hover:bg-blue-500 transition-colors duration-200 
                                             flex items-center justify-center gap-2 font-medium"
                                    onClick={handleReservasi}
                                >
                                    <span>Reservasi</span>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;