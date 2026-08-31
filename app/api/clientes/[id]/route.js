import db from "@/lib/db";

export async function PUT(request, { params }) {

  try{

    const {id} = await params;
    const dados = await request.json();

    const { nome, email, telefone } = dados;

    await db.query(
       `UPDATE clientes
       SET nome = $1,
           email = $2,
           telefone = $3
       WHERE id = $4`,

       [nome, email, telefone, id]
    );
    return Response.json({
      mensagem:"Cliente atualizado com sucesso"

    });
  
  } catch (erro) {
    console.log("ERRO AO ATUALIZAR INFORMAÇÕES");
    console.log(erro);
    
    return Response.json(
      {
        erro: "Erro ao atualizar",
        detalhe: erro.mensssage
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, {params}) {
  try{

    const { id } = await params;

    await db.query(
      "DELETE FROM clientes WHERE id = $1",
      [id]
    );

    return Response.json({

      mensagem: "Cliente foi excluído com sucesso"

    });

  } catch (erro) {
    console.log("ERRO AO EXCLUIR:");
    console.log(erro);

    return Response.json(
{
        erro: "Erro ao excluir cliente",
        detalhe: erro.message
      },
      { status: 500 }
    );

}

}
