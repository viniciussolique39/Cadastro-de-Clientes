-- Depois de criar o banco sistema_simples,
-- conecte-se a ele e execute este arquivo.

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefone VARCHAR(30)
);

-- Exemplos para controlar o banco diretamente:

-- Ver todos os clientes:
-- SELECT * FROM clientes ORDER BY id;

-- Inserir manualmente:
-- INSERT INTO clientes (nome, email, telefone)
-- VALUES ('João da Silva', 'joao@email.com', '(67) 99999-9999');

-- Alterar manualmente:
-- UPDATE clientes
-- SET nome = 'João Atualizado'
-- WHERE id = 1;

-- Excluir manualmente:
-- DELETE FROM clientes WHERE id = 1;
