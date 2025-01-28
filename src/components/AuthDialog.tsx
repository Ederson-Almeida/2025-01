"use client";

import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

interface AuthDialogProps {
    visible: boolean;
    onHide: () => void;
    mode: "login" | "register";
}

export default function AuthDialog({ visible, onHide, mode }: AuthDialogProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (formData.email && formData.password) {
            try {
                setLoading(true);
                const response = await fetch("/api/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        mode,
                        isProvider: false, // Todos os usuários começam como não prestadores
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Erro ao processar requisição"
                    );
                }

                toast.current?.show({
                    severity: "success",
                    summary:
                        mode === "login"
                            ? "Login realizado"
                            : "Cadastro realizado",
                    detail: "Operação concluída com sucesso!",
                    life: 3000,
                });

                // Limpa o formulário e fecha o diálogo
                setFormData({ email: "", password: "" });
                setSubmitted(false);
                onHide();

                // Redireciona para o dashboard
                router.push("/dashboard");
            } catch (error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Erro",
                    detail:
                        error instanceof Error
                            ? error.message
                            : "Erro desconhecido",
                    life: 3000,
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                visible={visible}
                onHide={onHide}
                modal
                className="w-full max-w-lg"
                showHeader={false}
                dismissableMask
                contentClassName="p-0 rounded-lg"
            >
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-8">
                        {mode === "login" ? "Log in" : "Cadastro"}
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex flex-col gap-2">
                            <InputText
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="Email"
                                className={classNames({
                                    "p-invalid": submitted && !formData.email,
                                })}
                                type="email"
                                disabled={loading}
                            />
                            {submitted && !formData.email && (
                                <small className="text-red-500">
                                    Email é obrigatório.
                                </small>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Password
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="Senha"
                                className={classNames({
                                    "p-invalid":
                                        submitted && !formData.password,
                                })}
                                toggleMask
                                feedback={mode === "register"}
                                promptLabel="Digite sua senha"
                                weakLabel="Fraca"
                                mediumLabel="Média"
                                strongLabel="Forte"
                                disabled={loading}
                                inputClassName="w-full"
                            />
                            {submitted && !formData.password && (
                                <small className="text-red-500">
                                    Senha é obrigatória.
                                </small>
                            )}
                        </div>

                        <Button
                            type="submit"
                            label={mode === "login" ? "Log in" : "Cadastrar"}
                            severity="info"
                            loading={loading}
                            className="w-full mt-4 p-button-lg"
                        />
                    </form>
                </div>
            </Dialog>
        </>
    );
}
