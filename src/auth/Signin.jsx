import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail,
    Lock,
    ArrowRight,
    Calendar,
    Shield,
    AlertCircle,
    Eye,
    EyeOff
} from 'lucide-react';

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data));

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError(data.message || 'Erreur lors de la connexion');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            console.error('Signin error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center p-6">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}></div>

            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/40 to-transparent rounded-full blur-3xl"></div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Column - Branding */}
                <div className="hidden lg:flex flex-col gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-sky-200">
                            <Calendar className="text-white w-7 h-7" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gray-900">
                            Medeli<span className="text-sky-600">RDV</span>
                        </span>
                    </Link>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-black text-gray-900 leading-tight">
                            Bienvenue sur votre
                            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent"> Plateforme Médicale</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Gérez vos rendez-vous médicaux en toute simplicité et sécurité.
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Sécurité Maximale</p>
                                <p className="text-sm text-gray-600">Données cryptées et conformes RGPD</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-sky-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Gestion Simplifiée</p>
                                <p className="text-sm text-gray-600">Interface intuitive et moderne</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Signin Form */}
                <div className="w-full">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 lg:p-10">
                        {/* Mobile Logo */}
                        <Link to="/" className="lg:hidden flex items-center gap-2 group mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                                <Calendar className="text-white w-6 h-6" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">
                                Medeli<span className="text-sky-600">RDV</span>
                            </span>
                        </Link>

                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">
                                Connexion
                            </h2>
                            <p className="text-gray-600">
                                Accédez à votre espace personnel
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                                    <span className="text-sm text-gray-600">Se souvenir de moi</span>
                                </label>
                                <a href="#" className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full px-6 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl font-bold text-white shadow-xl shadow-sky-200 hover:shadow-sky-300 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? 'Connexion...' : 'Se connecter'}
                                    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                            </button>
                        </form>

                        {/* Signup Link */}
                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-gray-600">
                                Vous n'avez pas de compte ?{' '}
                                <Link to="/signup" className="font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
