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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function AuthForm() {
  const [typeSubmit, setTypeSubmit] = useState<"login" | "register">("login");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { login } = useUser();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"default" | "destructive">(
    "default"
  );
  const [showAlert, setShowAlert] = useState(false);

  const isLogin = typeSubmit === "login";
  const schema = isLogin ? loginSchema : registerSchema;

  const defaultValues: LoginFormValues | RegisterFormValues = isLogin
    ? { email: "", password: "" }
    : { name: "", email: "", password: "", confirmPassword: "" };

  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [typeSubmit]);

  const showToast = (message: string, variant: "default" | "destructive") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

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
          router.push("/");
        } else {
          const registerData = data as RegisterFormValues;
          await authService.registerUser({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
          });

          setTypeSubmit("login");
          form.reset({ email: registerData.email, password: "" });

          showToast(
            "Registro realizado com sucesso! Faça login para continuar.",
            "default"
          );
        }
      } catch (err: unknown) {
        console.error(err);
        showToast("Credenciais inválidas", "destructive");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-8 sm:px-6 relative">
      <div className="w-full sm:w-[90%] md:w-[420px] lg:w-[450px] space-y-4">
        <Card className="p-6 sm:p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all duration-300">
          <CardHeader className="text-center space-y-2 mb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-[#11286b]">
              {isLogin ? "Login" : "Criar Conta"}
            </CardTitle>
            <CardDescription className="text-sm text-[#11286b] dark:text-gray-300">
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
                        <FormLabel className="text-sm font-medium text-[#11286b]">
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
                      <FormLabel className="text-sm font-medium text-[#11286b]">
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
                      <FormLabel className="text-sm font-medium text-[#11286b]">
                        Senha
                      </FormLabel>
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
                        <FormLabel className="text-sm font-medium text-[#11286b]">
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
                    className="text-sm text-blue-500 dark:text-blue-400 hover:underline p-0 text-[#11286b] hover:text-[#ffbd00]"
                    onClick={() =>
                      setTypeSubmit(isLogin ? "register" : "login")
                    }
                    disabled={isPending}
                  >
                    {isLogin ? "Criar conta" : "Já tem uma conta? Fazer login"}
                  </Button>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-lg bg-[#11286b] hover:bg-[#ffbd00] hover:text-[#11286b]"
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

      {showAlert && (
        <div className="fixed bottom-5 right-5 z-[9999] w-[300px] md:w-[400px]">
          <Alert variant={alertVariant}>
            <AlertTitle>
              {alertVariant === "destructive" ? "Erro" : "Sucesso"}
            </AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
