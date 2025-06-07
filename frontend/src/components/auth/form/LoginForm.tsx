'use client';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { login } from "@apis/auth";
import { BodyFont, TitleFont } from "@config/fonts";

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
          background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
          color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
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
    <Card className="w-full max-w-md xl:max-w-[800px] xl:min-h-[400px] relative z-10 
                    bg-light-bg-container/95 dark:bg-dark-bg-container/95 
                    backdrop-blur-md shadow-2xl
                    border border-light-border-default/20 dark:border-dark-border-default/20">
      <CardHeader className="space-y-2 px-6 pt-8">
        <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-light-btn-primary to-light-btn-primary/70 dark:from-dark-btn-primary dark:to-dark-btn-primary/70 flex items-center justify-center">
          <LockIcon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className={`${TitleFont.className} text-3xl md:text-4xl font-bold text-center 
                             text-light-text-primary dark:text-dark-text-primary
                             tracking-tight`}>
          Bienvenido de nuevo
        </CardTitle>
        <CardDescription className="text-center text-light-text-secondary dark:text-dark-text-secondary text-base">
          Ingresa tus credenciales para acceder a tu dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${BodyFont.className} text-light-text-primary dark:text-dark-text-primary font-medium`}>
                      Correo electrónico
                    </FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          placeholder="tu@ejemplo.com"
                          type="email"
                          className="pl-10 h-11 bg-light-bg-container/50 dark:bg-dark-bg-container/50 
                                   focus:bg-light-bg-container dark:focus:bg-dark-bg-container
                                   border-light-border-default dark:border-dark-border-default
                                   text-light-text-primary dark:text-dark-text-primary
                                   transition-all duration-300
                                   focus:ring-2 focus:ring-light-border-focus dark:focus:ring-dark-border-focus
                                   hover:border-light-border-focus dark:hover:border-dark-border-focus"
                          {...field}
                        />
                      </FormControl>
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                         text-light-text-secondary dark:text-dark-text-secondary 
                                         group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary
                                         transition-colors duration-300"
                        size={18} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${BodyFont.className} text-light-text-primary dark:text-dark-text-primary font-medium`}>
                      Contraseña
                    </FormLabel>
                    <div className="relative group">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 h-11 bg-light-bg-container/50 dark:bg-dark-bg-container/50 
                                   focus:bg-light-bg-container dark:focus:bg-dark-bg-container
                                   border-light-border-default dark:border-dark-border-default
                                   text-light-text-primary dark:text-dark-text-primary
                                   transition-all duration-300
                                   focus:ring-2 focus:ring-light-border-focus dark:focus:ring-dark-border-focus
                                   hover:border-light-border-focus dark:hover:border-dark-border-focus"
                          {...field}
                        />
                      </FormControl>
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                         text-light-text-secondary dark:text-dark-text-secondary
                                         group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary
                                         transition-colors duration-300"
                        size={18} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                 text-light-text-secondary dark:text-dark-text-secondary 
                                 hover:text-light-text-primary dark:hover:text-dark-text-primary
                                 focus:outline-none focus:text-light-text-primary dark:focus:text-dark-text-primary
                                 transition-colors duration-300"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`${BodyFont.className} w-full h-11 text-base font-medium
                         bg-light-btn-primary hover:bg-light-btn-primary-hover active:bg-light-btn-primary-active 
                         dark:bg-dark-btn-primary dark:hover:bg-dark-btn-primary-hover dark:active:bg-dark-btn-primary-active
                         text-white
                         transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};