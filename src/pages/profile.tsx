import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  saldo: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://apifakedelivery.vercel.app/users/${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do usuário');
        }
        const data: User = await response.json(); // Tipando a resposta
        setUser(data);
      } catch (error: any) { // Capturando o erro como qualquer tipo
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove o ID do usuário
    navigate('/'); // Redireciona para a página de login
  };

  if (loading) {
    return <div className="text-center py-6">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center py-6 text-gray-600">Nenhum usuário encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
  <header className="bg-[#4E8A51] shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/logobranca.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shadow-md">
          <Link to={"/profile"}>
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </header>

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <img 
  src="/logoverde.png" 
  alt="Footer Image" 
  className="w-40 mx-auto my-5 object-cover rounded-lg" 
/>

    <Card className="mb-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center mb-4 mt-6">
          <User className="h-12 w-12 text-[#4E8A51] mr-3" />
          <h2 className="text-2xl font-bold text-[#4E8A51]">{user.name}</h2>
        </div>

        <div className="flex items-center mb-2">
          <Mail className="h-5 w-5 text-gray-600 mr-2" />
          <span className="text-lg text-gray-800">{user.email}</span>
        </div>

        <div className="flex items-center mb-4">
          <DollarSign className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-lg text-gray-800">Saldo: R$ {user.saldo}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end bg-[#4E8A51] rounded-b-lg py-4 px-6">
        <Button 
          variant="destructive" 
          onClick={handleLogout} 
          className="bg-[#592B1A] text-white hover:bg-[#4E8A51] transition-colors duration-300"
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  </div>

  {/* Imagem do rodapé com a mesma largura do card */}
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <div className="flex justify-center">
      <img 
        src="/footer.png" 
        alt="Footer Image" 
        className="w-full h-auto object-cover rounded-lg" 
      />
    </div>
  </div>
</div>

  );
}
