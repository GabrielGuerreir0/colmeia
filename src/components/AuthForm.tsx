"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  LoginFormValues,
  RegisterFormValues,
} from "@/shared/lib/validators";
import * as authService from "@/services/authService";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
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
import { setAuthToken } from "@/shared/lib/cookies";

export function AuthForm() {
  const [typeSubmit, setTypeSubmit] = useState<"login" | "register">("login");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { login } = useUser();

  const isLogin = typeSubmit === "login";
  const schema = isLogin ? loginSchema : registerSchema;

  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    form.reset(
      isLogin
        ? { email: "", password: "" }
        : { name: "", email: "", password: "", confirmPassword: "" }
    );
  }, [typeSubmit, form]);

  const onSubmit = (data: LoginFormValues | RegisterFormValues) => {
    startTransition(async () => {
      try {
        if (isLogin) {
          const userData = await authService.authenticateUser(
            data.email,
            data.password
          );
          setAuthToken(userData.token);
          login(userData);
          router.push("/home");
        } else {
          const registerData = data as RegisterFormValues;
          await authService.registerUser({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
          });
          setTypeSubmit("login");
          form.reset({ email: registerData.email, password: "" });
          alert("Registro realizado com sucesso! Faça login para continuar.");
        }
      } catch (err: unknown) {
        console.error(err);
        alert((err as Error).message || "Erro desconhecido");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-8 sm:px-6">
      <Card className="w-full sm:w-[90%] md:w-[420px] lg:w-[450px] p-6 sm:p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all duration-300">
        <CardHeader className="text-center space-y-2 mb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLogin ? "Login" : "Criar Conta"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
            {isLogin
              ? "Acesse sua conta para continuar."
              : "Preencha os dados para se registrar."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              key={typeSubmit}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome"
                          disabled={isPending}
                          className="text-sm h-10"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="exemplo@email.com"
                        disabled={isPending}
                        className="text-sm h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Sua senha"
                        disabled={isPending}
                        className="text-sm h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {!isLogin && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Confirmar Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirme sua senha"
                          disabled={isPending}
                          className="text-sm h-10"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline p-0"
                  onClick={() => setTypeSubmit(isLogin ? "register" : "login")}
                  disabled={isPending}
                >
                  {isLogin ? "Criar conta" : "Já tem uma conta? Fazer login"}
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-lg"
                  disabled={isPending}
                >
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
    </div>
  );
}
