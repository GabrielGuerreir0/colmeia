"use client";

import React, { useEffect, useState, useRef } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { OrderStatus } from "@/shared/types/payment";
import { CartService } from "@/services/cartService";
import { useCart } from "@/context/CartContext";

export default function StatusPaymentPage() {
  const { data, resetCheckout } = useCheckout();
  const { refreshCart } = useCart();
  const router = useRouter();

  const [status, setStatus] = useState<OrderStatus>("inicial");
  const [showPixQR, setShowPixQR] = useState(false);
  const [qrKey, setQrKey] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const escolherResultado = (): OrderStatus => {
    const rand = Math.random();
    if (rand < 0.75) return "pago";
    if (rand < 0.9) return "falhado";
    return "expirado";
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (data.paymentMethod === "pix") {
      gerarPixQR();
    } else if (data.paymentMethod === "boleto") {
      gerarBoleto();
    } else {
      iniciarProcessamento();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data.paymentMethod]);

  useEffect(() => {
    if (status === "pago") {
      CartService.clearCart();
      refreshCart();
    }
  }, [status, refreshCart]);

  const gerarPixQR = () => {
    setShowPixQR(true);
    setQrKey(Date.now());

    timerRef.current = setTimeout(() => {
      setShowPixQR(false);
      iniciarProcessamento();
    }, 8000);
  };

  const gerarBoleto = () => {
    setShowPixQR(false);
    setStatus("inicial");

    timerRef.current = setTimeout(() => {
      iniciarProcessamento();
    }, 8000);
  };

  const iniciarProcessamento = () => {
    if (status === "pago" || status === "falhado") return;

    setStatus("processando");

    timerRef.current = setTimeout(() => {
      const resultado = escolherResultado();
      setStatus(resultado);
    }, 3000);
  };

  const handleTryAgain = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    resetCheckout();
    router.push("/checkout");
  };

  const handleFinish = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    resetCheckout();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-200 text-center ">
      {showPixQR && (
        <>
          <img
            key={qrKey ?? 0}
            src="/qr.png"
            alt="QR Code Pix"
            className="w-48 h-48"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Pague com Pix
          </h2>
          <p className="text-gray-600">
            Escaneie o QR Code com seu app bancário para concluir o pagamento.
          </p>
          <p className="text-sm text-gray-400">
            (QR Code válido por 8 segundos)
          </p>
        </>
      )}

      {!showPixQR &&
        data.paymentMethod === "boleto" &&
        status === "inicial" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">
              Boleto Bancário
            </h2>
            <p className="text-gray-600">
              Use o código abaixo para pagar o boleto. Pagamento será confirmado
              em alguns segundos.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono mt-3 select-all">
              34191.79001 01043.510047 91020.150008 8 98400026000
            </div>
            <p className="text-sm text-gray-400 mt-2">(Boleto simulado)</p>
          </>
        )}

      {!showPixQR &&
        (status !== "inicial" || data.paymentMethod === "card") && (
          <>
            {status === "processando" && (
              <>
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <h2 className="text-2xl font-semibold text-gray-800 text-[#11286b]">
                  Processando pagamento...
                </h2>
                <p className="text-gray-500">
                  Aguarde enquanto confirmamos sua transação.
                </p>
              </>
            )}

            {status === "pago" && (
              <>
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h2 className="text-3xl font-semibold text-green-600">
                  Pagamento Aprovado!
                </h2>
                <p className="text-gray-600">
                  Seu pedido foi confirmado e está sendo preparado.
                </p>
                <Button
                  onClick={handleFinish}
                  className="mt-4 bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                  Voltar para o Catalogo
                </Button>
              </>
            )}

            {status === "falhado" && (
              <>
                <XCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-3xl font-semibold text-red-600">
                  Pagamento Falhou
                </h2>
                <p className="text-gray-600">
                  Não foi possível concluir o pagamento. Tente novamente.
                </p>
                <Button
                  onClick={handleTryAgain}
                  className="mt-4 hover:text-[#11286b] hover:bg-[#ffbd00] bg-[#11286b] text-[#ffbd00] cursor-pointer"
                >
                  repetir o pedido
                </Button>
              </>
            )}

            {status === "expirado" && (
              <>
                <Clock className="w-16 h-16 text-yellow-500" />
                <h2 className="text-3xl font-semibold text-yellow-600">
                  Pagamento Expirado
                </h2>
                <p className="text-gray-600">
                  O tempo para concluir o pagamento foi excedido.
                </p>
                <Button
                  onClick={handleTryAgain}
                  className="mt-4 hover:text-[#11286b] hover:bg-[#ffbd00] bg-[#11286b] text-[#ffbd00] cursor-pointer"
                >
                  repetir o pedido
                </Button>
              </>
            )}
          </>
        )}
    </div>
  );
}
