import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Reservasi: React.FC = () => {
    const router = useRouter();
    const roomListRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [formData, setFormData] = useState({
        tanggal: '',
        waktu: '',
        unit: '',
        jumlahPeserta: '',
        bookingAN: '',
        agenda: '',
        pilihRuangan: ''
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const scrollToRooms = () => {
        roomListRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNotificationClick = () => {
        alert("Anda memiliki jadwal meeting di Ruangan Rapat Kecil pukul 14:00 WIB");
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        router.push('/selesai');
    };

    return (
        <div className="relative min-h-screen bg-blue-300">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
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
                            <li 
                                className="hover:text-blue-600 cursor-pointer"
                                onClick={() => router.push('/dashboard')}
                            >
                                Halaman Utama
                            </li>
                            <li 
                                className="hover:text-blue-600 cursor-pointer"
                                onClick={() => {
                                    router.push('/dashboard');
                                    setTimeout(() => {
                                        const detailSection = document.getElementById('view-detail');
                                        detailSection?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100); // Delay to ensure the page has loaded
                                }}
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

            <main className="main-content flex justify-center items-center py-8 px-4">
                <div className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-lg w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Buat Reservasi</h1>
                        <p className="text-sm text-gray-600">Isi formulir untuk membooking Ruangan</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                <input
                                    type="date"
                                    className="input-field py-2"
                                    value={formData.tanggal}
                                    onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                                <input
                                    type="time"
                                    className="input-field py-2"
                                    value={formData.waktu}
                                    onChange={(e) => setFormData({...formData, waktu: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Unit</label>
                            <select
                                className="input-field py-2 bg-blue-500 text-white"
                                value={formData.unit}
                                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                            >
                                <option className="input-field py-2 bg-white text-black" value="" disabled selected>Pilih Ruangan</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang1">SDM</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang2">Ruangan Rapat Kecil</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang3">Ruangan Rapat Mandiri</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang4">Ruangan Rapat Piring</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang5">Ruangan Rapat Sangar</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang6">Ruangan Rapat Kencana</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang7">Ruangan Sport GYM</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang8">Ruangan Rapat Kualitas</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Ruangan</label>
                            <select
                                className="input-field py-2 bg-blue-500 text-white"
                                value={formData.pilihRuangan}
                                onChange={(e) => setFormData({...formData, pilihRuangan: e.target.value})}
                            >
                                <option className="input-field py-2 bg-white text-black" value="" disabled selected>Pilih Ruangan</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang1">Auditorium 1</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang2">Ruangan Rapat Kecil</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang3">Ruangan Rapat Mandiri</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang4">Ruangan Rapat Piring</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang5">Ruangan Rapat Sangar</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang6">Ruangan Rapat Kencana</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang7">Ruangan Sport GYM</option>
                                <option className="input-field py-2 bg-white text-black" value="ruang8">Ruangan Rapat Kualitas</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Peserta</label>
                            <input
                                type="number"
                                placeholder="Masukkan jumlah peserta"
                                className="input-field py-2"
                                value={formData.jumlahPeserta}
                                onChange={(e) => setFormData({...formData, jumlahPeserta: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Atas Nama</label>
                            <input
                                type="text"
                                placeholder="Masukkan nama pemesan"
                                className="input-field py-2"
                                value={formData.bookingAN}
                                onChange={(e) => setFormData({...formData, bookingAN: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
                            <input
                                type="text"
                                placeholder="Masukkan agenda"
                                className="input-field py-2"
                                value={formData.agenda}
                                onChange={(e) => setFormData({...formData, agenda: e.target.value})}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                            text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 
                            shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm mt-2"
                        >
                            Submit Reservasi
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Reservasi;