import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resultado = await db.query(
      'SELECT id, nome, email, telefone FROM clientes ORDER BY id DESC'
    );

    return NextResponse.json(resultado.rows);
  } catch (erro) {
    return NextResponse.json(
      { erro: 'Erro ao buscar clientes', detalhe: erro.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nome, email, telefone } = await request.json();

    if (!nome || !email) {
      return NextResponse.json(
        { erro: 'Nome e e-mail são obrigatórios.' },
        { status: 400 }
      );
    }

    const resultado = await db.query(
      `INSERT INTO clientes (nome, email, telefone)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [nome, email, telefone || null]
    );

    return NextResponse.json({
      mensagem: 'Cliente cadastrado com sucesso.',
      id: resultado.rows[0].id
    });
  } catch (erro) {
    return NextResponse.json(
      { erro: 'Erro ao cadastrar cliente', detalhe: erro.message },
      { status: 500 }
    );
  }
}
