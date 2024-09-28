'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { BodyFont, TitleFont } from "@/config/fonts"
import { login } from "@/helpers"
import { useRouter } from "next/navigation"


type Inputs = {
  email: string;
  emailRequired: string;
  password: string;
  passwordRequired: string;
}

export const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    
    const result = login(data);
    console.log(result);
    
  }

  return (
    <>
      <Card className="w-full md:max-w-md xl:w-[800px] xl:h-[370px]  relative z-10 bg-white/90 backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className={`${TitleFont.className} text-3xl font-bold text-center`}>Iniciar sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a tu dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className={`${BodyFont.className}`}>Correo electrónico</Label>
              <div className="relative">
                <Input
                  id="email"
                  placeholder="tu@ejemplo.com"
                  type="email"
                  required
                  className="pl-10 bg-white/50 focus:bg-white transition-all duration-300"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El email es requerido"
                    }
                  })}
                />
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className={`${BodyFont.className}`}>Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="contraseña"
                  required
                  className="pl-10 bg-white/50 focus:bg-white transition-all duration-300"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida"
                    }
                  })}
                />
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className={`${BodyFont.className} w-full bg-sky-600 hover:bg-sky-700 xl:mt-3`}>Iniciar sesión</Button>
          </form>
        </CardContent>
      </Card>

    </>
  )
}
