import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ShoppingBag, User } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Definindo a interface para o tipo de restaurante
interface Restaurant {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
}

export default function Component() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get<Restaurant[]>('https://apifakedelivery.vercel.app/restaurants');
                setRestaurants(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRestaurants();
    }, []);

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


            <div className="bg-gradient-to-r from-primary to-primary-foreground text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <img 
                        src="/frente cartao.png"  // Caminho para a imagem na pasta public
                        alt="Cimarmitas Banner"
                        className="w-full h-auto rounded-lg shadow-md" // Ajuste o tamanho da imagem conforme necessário
                    />
                </div>
            </div>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restaurants.map(restaurant => (
                        <Card key={restaurant.id} className="overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="relative">
                                <img 
                                    src={restaurant.image} 
                                    alt={restaurant.name} 
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                            <CardHeader className="p-4 bg-[#4E8A51] text-white rounded-b-lg">
                                <CardTitle className="text-2xl font-semibold">{restaurant.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 py-2">
                                <p className="text-gray-700 text-sm">{restaurant.description}</p>
                                <div className="flex items-center mt-2">
                                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                                    <span className="text-sm">{restaurant.rating}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between px-4 py-2 bg-gray-50 rounded-b-lg">
                                <Link to={`/restaurant/${restaurant.id}`}>
                                    <Button className="bg-[#592B1A] text-white hover:bg-[#4E8A51] transition-colors duration-300">Ver restaurante</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

        </div>
    );
}
