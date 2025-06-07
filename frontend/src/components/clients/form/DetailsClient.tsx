'use client'
import { Badge } from "@ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Phone, Mail, MapPin, ShoppingBag, Heart, Calendar, TrendingUp, Star, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { ClientResponse } from "@interfaces/clients"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs"
import { Button } from "@ui/button"
import { useRouter } from "next/navigation"


interface ClientProps {
  client: ClientResponse;
}

export function DetailsClient({ client }: ClientProps) {

  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true)
  }, []);

  const handleButton = () => {
    router.push('/dashboard/clientes');
  }

  return (
    <div className={`w-full transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="grid md:grid-cols-4 gap-6">
        {/* Client Profile Card */}
        <Card className="md:col-span-1 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex justify-center">
              <div className="transition-transform duration-300 ease-in-out hover:scale-105 relative">
                <div className="absolute -bottom-3 -right-3">
                  <Badge className="bg-amber-400 text-amber-950 font-bold">PREMIUM</Badge>
                </div>
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src="https://res.cloudinary.com/dkhcnoajp/image/upload/v1740513280/users/fb1e0558d7e13c78185b99ce7dbcf01f.png" alt={client.name} />
                  <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-center">{client.name}</h1>

            <div className="mt-6 space-y-3">
              <div className="flex items-center p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <p className="text-sm">{client.phone}</p>
              </div>
              <div className="flex items-center p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <p className="text-sm">{client.email}</p>
              </div>
              <div className="flex items-center p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <p className="text-sm">{client.address}</p>
              </div>
              <div className="flex items-center p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                <p className="text-sm">Cliente desde: {client.inicio?.slice(0, 4)}</p>
              </div>
            </div>
            {/* 
            <div className="flex justify-center items-center mt-4">
              <ModalCreateAuto clientId={client.id} />
            </div> */}
            <div className="flex justify-center items-center mt-4">
              <Button onClick={handleButton}>
                Regresar
              </Button>
            </div>

          </div>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Compras Totales</CardTitle>
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-800">20</div>
                <p className="text-xs text-blue-600 mt-1">+3 últimos 30 días</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-800">Puntos de Fidelidad</CardTitle>
                <Heart className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-800">50</div>
                <p className="text-xs text-purple-600 mt-1">Próximo nivel: 75 pts</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Valor de Vida</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-800">€2.450</div>
                <p className="text-xs text-green-600 mt-1">+€350 este año</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">Satisfacción</CardTitle>
                <Star className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-800">4.8/5</div>
                <p className="text-xs text-amber-600 mt-1">Basado en 15 compras</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="recent">Compras Recientes</TabsTrigger>
              <TabsTrigger value="products">Productos Favoritos</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Historial de Compras</CardTitle>
                  <CardDescription>Las últimas transacciones del cliente</CardDescription>
                </CardHeader>
                <CardContent>
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Pedido #{1000 + index}</p>
                          <p className="text-sm text-gray-500">{new Date(2025, 1, 25 - index * 7).toLocaleDateString('es-ES')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">€{(150 - index * 25).toFixed(2)}</p>
                        <Badge variant={index === 0 ? "default" : "outline"} className={index === 0 ? "bg-green-500" : ""}>
                          {index === 0 ? "Entregado" : index === 1 ? "En camino" : "Completado"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Ver todo el historial
                  </button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Productos Preferidos</CardTitle>
                  <CardDescription>Los productos que el cliente compra con más frecuencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">Producto {index + 1}</p>
                          <p className="text-sm text-gray-500">Comprado {5 - index} veces</p>
                          <p className="text-sm font-bold text-blue-600">€{(50 - index * 5).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Notas del Cliente</CardTitle>
                  <CardDescription>Información importante sobre este cliente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">Prefiere entregas por la tarde, después de las 17:00</p>
                      <p className="text-xs text-yellow-600 mt-1">Añadido el 15/02/2025</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">Cliente muy satisfecho con el servicio premium.</p>
                      <p className="text-xs text-green-600 mt-1">Añadido el 05/01/2025</p>
                    </div>
                    <textarea
                      className="w-full mt-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Añadir una nueva nota..."
                      rows={3}
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Guardar Nota
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}