// src/components/Selesai.tsx
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Selesai: React.FC = () => {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-blue-300">
            <div className="absolute top-8 left-8">
                <Image
                    src="/gabung.svg"
                    alt="Logo KAI dan LRT"
                    width={200}
                    height={80}
                    className="object-contain"
                />
            </div>

            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full mx-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Terimakasih
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Reservasi anda telah berhasil dibuat...
                    </p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-blue-300 hover:bg-blue-400 text-white font-medium py-2 px-6 rounded-full transition-colors"
                    >
                        Kembali ke Halaman Utama
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Selesai;