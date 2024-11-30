import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, ArrowLeft, Clock, Truck, Minus, Plus, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';


interface FoodItem {
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    restaurantId: string;
    description: string;
}

export default function Food() {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  
    useEffect(() => {
      const fetchFoodItem = async () => {
        try {
          const response = await fetch(`https://apifakedelivery.vercel.app/foods/${id}`);
          const data: FoodItem = await response.json();
          setFoodItem(data);
        } catch (error) {
          console.error("Error fetching food item:", error);
        }
      };
  
      fetchFoodItem();
    }, [id]);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    if (!foodItem) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white">
  <header className="bg-[#4E8A51] shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center">
        <Button variant="ghost" className="mr-4 hover:scale-110 transition-transform duration-300" onClick={() => window.history.back()}>
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>
        <h1 className="text-2xl font-bold text-white">{foodItem.name}</h1>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shadow-md ml-auto hover:bg-[#4E8A51] transition-all">
          <Link to={"/profile"}>
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </header>

  <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate__animated animate__fadeIn">
    <Card className="rounded-lg shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-6">
        <img src={foodItem.image} alt={foodItem.name} className="w-full h-64 object-cover rounded-lg mb-6 hover:scale-105 transition-all duration-300" />
        <h2 className="text-3xl font-bold mb-2 text-[#592B1A]">{foodItem.name}</h2>
        <p className="text-gray-600 mb-4 text-sm">{foodItem.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#4E8A51]">R$ {foodItem.price.toFixed(2)}</span>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="font-bold text-[#4E8A51]">{foodItem.rating}</span>
          </div>
        </div>
        
        {/* Barra de avaliação */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Qualidade do produto</span>
            <span className="font-bold text-[#4E8A51]">{foodItem.rating} / 5</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${(foodItem.rating / 5) * 100}%` }}></div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Clock className="h-4 w-4 mr-1" />
          <span className="mr-4">{foodItem.time}</span>
          <Truck className="h-4 w-4 mr-1" />
          <span className="text-[#4E8A51]">Delivery: R$ {foodItem.delivery.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={decrementQuantity} className="hover:bg-[#592B1A] hover:text-white transition-colors duration-300">
              <Minus className="h-4 w-4 text-[#592B1A]" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 mx-2 text-center text-[#4E8A51] border-[#4E8A51] bg-transparent"
            />
            <Button variant="outline" size="icon" onClick={incrementQuantity} className="hover:bg-[#592B1A] hover:text-white transition-colors duration-300">
              <Plus className="h-4 w-4 text-[#592B1A]" />
            </Button>
          </div>
          <Button className="ml-4 bg-[#592B1A] text-white hover:bg-[#4E8A51] transition-colors duration-300">
            Adicionar ao carrinho - R$ {(foodItem.price * quantity).toFixed(2)}
          </Button>
        </div>
      </CardContent>
    </Card>
  </main>
</div>

    );
}
