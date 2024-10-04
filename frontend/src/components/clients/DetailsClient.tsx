'use client'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientResponse } from "@/interfaces"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Phone, Mail, MapPin, CreditCard, ShoppingBag, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


interface ClientProps {
  client: ClientResponse;
}

export function DetailsClient({ client }: ClientProps) {

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true)
  }, []);




  return (

    <div className={`w-full max-w-6xl transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400 text-white">
              <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                {/* <Avatar className="w-48 h-48 border-4 border-white shadow-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar> */}
              </div>
              <h1 className="mt-4 text-3xl font-bold text-center">{client.name}</h1>
              <Badge className="mt-2 bg-white text-purple-600">Cliente Premium</Badge>
              <div className="mt-6 space-y-2 w-full">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <p>{client.phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <p>{client.email}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <p className="text-sm">{client.address}</p>
                </div>

                <div className="w-full flex justify-center items-center">
                  <Dialog>
                    <DialogTrigger asChild className="mt-8">
                      <Button variant="secondary">Agrega un automóvil</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Registre un automóvil</DialogTitle>
                        <DialogDescription>
                          Puedes registrar no solo uno sino muchos automoviles a tu comodidad
                        </DialogDescription>
                      </DialogHeader>

                      <form className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="modelo" className="text-right">
                            Modelo
                          </Label>
                          <Input
                            id="modelo"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="kilometraje" className="text-right">
                            Kilometraje
                          </Label>
                          <Input
                            id="kilometraje"
                            type="number"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="matricula" className="text-right">
                            Matricula
                          </Label>
                          <Input
                            id="matricula"
                            type="text"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="marca" className="text-right">
                            Marca
                          </Label>
                          <Input
                            id="marca"
                            type="text"
                            className="col-span-3"
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Guardar</Button>
                        </DialogFooter>
                      </form>

                    </DialogContent>
                  </Dialog>
                </div>



              </div>
            </div>
            <div className="md:col-span-2 p-6 bg-white">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Compras Totales</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{20}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Puntos de Fidelidad</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{50}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cliente Desde</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{2015}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                {/* <div>
                  <h2 className="text-xl font-semibold mb-2">Categorías Preferidas</h2>
                  <div className="flex flex-wrap gap-2">
                    {preferredCategories.map((category, index) => (
                      <Badge key={index} variant="secondary">{category}</Badge>
                    ))}
                  </div>
                </div> */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Compras Recientes</h2>
                  {/* <div className="space-y-4">
                    {recentPurchases.map((purchase) => (
                      <Card key={purchase.id}>
                        <CardContent className="flex justify-between items-center p-4">
                          <div>
                            <p className="font-semibold">Pedido #{purchase.id}</p>
                            <p className="text-sm text-muted-foreground">{purchase.date}</p>
                            <p className="text-sm">{purchase.items.join(", ")}</p>
                          </div>
                          <p className="font-bold">{purchase.amount.toFixed(2)} €</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}