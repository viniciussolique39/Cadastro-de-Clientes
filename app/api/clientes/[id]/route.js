import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { nome, email, telefone } = await request.json();

    if (!nome || !email) {
      return NextResponse.json(
        { erro: 'Nome e e-mail são obrigatórios.' },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE clientes
       SET nome = ${nome}, email = ${email}, telefone = ${telefone}
       WHERE id = ${id}`,
      [nome, email, telefone || null, id]
    );

    return NextResponse.json({ mensagem: 'Cliente atualizado com sucesso.' });
  } catch (erro) {
    return NextResponse.json(
      { erro: 'Erro ao atualizar cliente', detalhe: erro.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await db.query('DELETE FROM clientes WHERE id = $1', [id]);

    return NextResponse.json({ mensagem: 'Cliente excluído com sucesso.' });
  } catch (erro) {
    return NextResponse.json(
      { erro: 'Erro ao excluir cliente', detalhe: erro.message },
      { status: 500 }
    );
  }
}
