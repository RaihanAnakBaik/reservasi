import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi username dan password
    if (!username || !password) {
      alert("Username dan password tidak boleh kosong!");
      return;
    }

    localStorage.setItem('token', 'dummy-token');
    router.push('/dashboard');
  };

  return (
    <main className="relative min-h-screen bg-blue-300">
      <div className="absolute top-12 left-12">
        <Image
          src="/gabung.svg"
          alt="Logo KAI dan LRT"
          width={200}
          height={80}
          className="object-contain"
        />
      </div>

      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full max-w-md p-12 bg-white rounded-3xl shadow-xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-700 mb-3">
              Sign in to
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700">
              Reservasi Ruangan
            </h2>
          </div>

          <div className="w-full h-0.5 bg-gray-200 mb-10"></div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-base font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full p-3.5 border-2 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Masukkan username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-base font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full p-3.5 border-2 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Masukkan password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="showPassword"
                type="checkbox"
                className="w-4 h-4 text-blue-400 border-2 rounded focus:ring-blue-400"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="showPassword" className="ml-3 text-sm text-gray-600">
                Show Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-lg bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 rounded-full transition-colors duration-200 mt-4"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Home;