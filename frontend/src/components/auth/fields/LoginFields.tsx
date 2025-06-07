'use client';

import { FormControl, FormField, FormItem, FormLabel } from "@ui/form";
import { Input } from "@ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { loginValidationRules } from "./validation-schema";
import { LoginFormInputs } from "@auth/types";

export const LoginFields = ({ form }: { form: UseFormReturn<LoginFormInputs> }) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          rules={loginValidationRules.email}
          render={({ field }: { field: ControllerRenderProps<LoginFormInputs, "email"> }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Correo electrónico
              </FormLabel>
              <FormControl>
                <Input
                  className="pl-10 bg-white/50 focus:bg-white transition-all duration-300"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  required
                  {...field}
                />
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          rules={loginValidationRules.password}
          render={({ field }: {field: ControllerRenderProps<LoginFormInputs, "password">}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Contraseña
              </FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="********"
                  {...field}
                  className="pl-10 bg-white/50 focus:bg-white transition-all duration-300"
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
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
}