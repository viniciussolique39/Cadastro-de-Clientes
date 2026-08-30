# Sistema simples - Next.js + PostgreSQL

Projeto didático de cadastro de clientes usando Next.js e PostgreSQL.

A ideia é manter tudo simples:
- sem Prisma;
- sem ORM;
- SQL visível no código;
- acesso direto ao PostgreSQL pelo pgAdmin ou psql;
- uma única tabela para facilitar o aprendizado.

## 1. Criar o banco

Abra o pgAdmin, conecte-se ao banco padrão `postgres` e execute:

```sql
CREATE DATABASE sistema_simples;
```

Depois selecione/conecte-se ao banco `sistema_simples` e execute o arquivo:

`sql/banco.sql`

Ele cria a tabela `clientes`.

## 2. Configurar a conexão

Copie `.env.example` para `.env.local`.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=sistema_simples
```

## 3. Instalar e executar

```bash
npm install
npm run dev
```

Abra no navegador:

http://localhost:3000

## 4. Onde está cada coisa

- `app/page.js`: tela principal.
- `app/api/clientes/route.js`: listar e cadastrar clientes.
- `app/api/clientes/[id]/route.js`: editar e excluir clientes.
- `lib/db.js`: conexão com PostgreSQL.
- `sql/banco.sql`: criação da tabela.

## 5. Consultar diretamente no PostgreSQL

```sql
SELECT * FROM clientes ORDER BY id;
```

Cadastrar manualmente:

```sql
INSERT INTO clientes (nome, email, telefone)
VALUES ('Maria', 'maria@email.com', '(67) 99999-9999');
```

Editar:

```sql
UPDATE clientes
SET nome = 'Maria Silva'
WHERE id = 1;
```

Excluir:

```sql
DELETE FROM clientes
WHERE id = 1;
```

## Diferença principal no código

No PostgreSQL, os parâmetros das consultas usam `$1`, `$2`, `$3` em vez dos `?` usados no MySQL.

Exemplo:

```javascript
await db.query(
  'SELECT * FROM clientes WHERE id = $1',
  [id]
);
```

A biblioteca usada para conectar ao PostgreSQL é `pg`.
