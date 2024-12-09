'use client'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import { Button } from "@ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@ui/form"
import { Input } from "@ui/input"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { login } from "@apis/auth"
import { BodyFont, TitleFont } from "@config/fonts"

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormInputs) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await login(data);

      if (result.statusCode === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message,
        });
        return;
      }

      Cookies.set("authToken", result.token);
      router.replace("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full md:max-w-md xl:w-[800px] xl:h-[370px] relative z-10 bg-white/90 backdrop-blur-md shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className={`${TitleFont.className} text-3xl font-bold text-center`}>
          Iniciar sesión
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder a tu dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "El email es requerido"
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${BodyFont.className}`}>Correo electrónico</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="tu@ejemplo.com"
                          type="email"
                          className="pl-10 bg-white/50 focus:bg-white transition-all duration-300"
                          {...field}
                        />
                      </FormControl>
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "La contraseña es requerida"
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${BodyFont.className}`}>Contraseña</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          className="pl-10 bg-white/50 focus:bg-white transition-all duration-300"
                          {...field}
                        />
                      </FormControl>
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
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${BodyFont.className} w-full bg-sky-600 hover:bg-sky-700`}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}