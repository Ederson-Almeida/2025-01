import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Cria uma resposta com o cookie expirado
    const response = NextResponse.json({ message: 'Logout realizado com sucesso' });
    
    // Remove o cookie definindo uma data de expiração no passado
    response.cookies.set('auth_token', '', {
      expires: new Date(0),
      path: '/'
    });
    

    return response;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer logout' },
      { status: 500 }
    );
  }
} 