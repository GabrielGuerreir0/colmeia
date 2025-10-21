"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/validators";
import * as authService from "@/services/authService";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function AuthForm() {
  const [typeSubmit, setTypeSubmit] = useState<"login" | "register">("login");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isLogin = typeSubmit === "login";
  const schema = isLogin ? loginSchema : registerSchema;

  // Tipo correto para o formulário
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    form.reset();
  }, [typeSubmit, form]);

  const onSubmit = (data: LoginFormValues | RegisterFormValues) => {
    startTransition(async () => {
      try {
        console.log("Dados enviados:", data);
        await authService.authenticateUser(data.email, data.password);
        router.push("/home");
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-gray-800 dark:text-white">
          {isLogin ? "Login" : "Criar Conta"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Acesse sua conta para continuar."
            : "Preencha os dados para se registrar."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="exemplo@email.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Sua senha"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password (só registro) */}
            {!isLogin && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirme sua senha"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Botões */}
            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="link"
                className="p-0 text-sm"
                onClick={() => setTypeSubmit(isLogin ? "register" : "login")}
                disabled={isPending}
              >
                {isLogin ? "Criar conta" : "Já tem uma conta? Fazer login"}
              </Button>

              <Button type="submit" className="w-28" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isLogin ? (
                  "Entrar"
                ) : (
                  "Registrar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
