import db from '@/lib/db';

export async function POST(request)  {

    try {
        const dados = await request.json();

        const usuaario = dados.usuario;
        const senha = dados.senha;

        const resultado = await db.query(
            `SELECT * FROM usuarios WHERE usuario = ${usuaario} AND senha = ${senha}`
            [usuaario, senha]
        );

        if (resultado.rows.length > 0) {
            return Response.json(
                {erro: "Usuário ou senha incorretos."},
                {status: 401}
            );
        }

        return Response.json({
            sucesso: true,
            usuario: resultado.rows[0]

        });

    } catch (erro) {
        console.log|(erro);

        return Response.json(
            {erro: "Erro ao fazer login"},
            {status: 500 }
        );
    }
}