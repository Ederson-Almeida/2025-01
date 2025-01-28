import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password, mode, isProvider } = await request.json();

    // Login
    if (mode === 'login') {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Senha incorreta' },
          { status: 401 }
        );
      }

      // Gera o token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, isProvider: user.isProvider },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Cria a resposta com os dados do usuário
      const response = NextResponse.json({
        id: user.id,
        email: user.email,
        isProvider: user.isProvider
      });

      // Define o cookie
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 horas
      });

      return response;
    }

    // Registro
    if (mode === 'register') {
      // Verifica se já existe um usuário com este email
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email já cadastrado' },
          { status: 400 }
        );
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          isProvider: isProvider || false
        }
      });

      // Gera o token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, isProvider: user.isProvider },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Cria a resposta com os dados do usuário
      const response = NextResponse.json({
        id: user.id,
        email: user.email,
        isProvider: user.isProvider
      });

      // Define o cookie
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 horas
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Modo inválido' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 
