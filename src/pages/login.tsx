import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirecionar automaticamente se o ID do usuário já estiver no localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://apifakedelivery.vercel.app/users');
      const users = await response.json();

      const user = users.find((u: any) => u.email === email && u.senha === password);

      if (user) {
        // Armazenar ID do usuário localmente
        localStorage.setItem('userId', user.id);
        navigate('/home');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#592B1A] to-[#592B1A]">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto mt-6">
    <div className="flex justify-center">
      <img 
        src="/footermarrom.png" 
        alt="Footer Image" 
        className="w-full h-auto object-cover " 
      />
    </div>
  </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full px-4 py-2 mt-2 text-white bg-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 mt-2 text-white bg-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end mt-2 text-sm text-gray-400 hover:text-gray-200">
            <a href="#">Esqueceu sua senha?</a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-[#4E8A51] rounded-lg hover:bg-[#416743] focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        </form>
        {error && (
          <div className="mt-4 text-sm text-center text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
