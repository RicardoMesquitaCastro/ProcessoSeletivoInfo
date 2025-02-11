# CRUD de Veículos - Frontend

Este projeto é uma implementação do frontend em Angular para um CRUD (Create, Read, Update, Delete) de veículos. O sistema permite visualizar, adicionar, atualizar e excluir veículos. Ele se comunica com uma API para persistir os dados dos veículos.

# Tecnologias Usadas no Frontend:

* Angular v19
* HttpClientModule (para comunicação com a API)
* Material Design (para componentes de UI)

# Estrutura do Projeto
#   Componentes do Angular
* VeiculosComponent: Componente que exibe os veículos em uma tabela e permite as ações de adicionar, editar e excluir veículos.
* VeiculoService: Serviço Angular responsável por fazer as requisições HTTP para a API de veículos.

# Funcionalidades
* Listagem de Veículos: Exibe todos os veículos cadastrados em uma tabela.
* Adicionar Veículo: Permite adicionar um novo veículo via formulário.
* Atualizar Veículo: Permite editar as informações de um veículo existente.
* Excluir Veículo: Permite excluir um veículo.

# Como Rodar o Projeto
* Após clonar execute npm install para instalação das dependências.
* Execute npm start. Esse comando irá executar tanto o projeto na porta http://localhost:4200/ quanto o serviço da API http://localhost:3000/

# Estrutura dos Arquivos
   # VeiculoService
   *  O serviço VeiculoService faz as requisições HTTP para a API e retorna os dados. Ele implementa as operações CRUD (Create, Read, Update, Delete).

   # VeiculosComponent
   * O componente VeiculosComponent exibe a lista de veículos e permite ao usuário interagir com eles, como adicionar, editar ou excluir.

 # Como Usar
   # Visualizar Veículos
   * Ao iniciar o aplicativo, a lista de veículos será carregada automaticamente da API e exibida em uma tabela (caso haja dados salvos na API).

   # Adicionar Veículo
   * Para adicionar um novo veículo, basta clicar no botão ADICIONAR VEÍCULO e preencher o formulário. É importante que todos os campos sejam preenchidos 
     com os parâmetros requisitados para que o botão Salvar habilite!

* Placa (Deve ter 7 caracteres e não pode estar vazio)
* Chassi (Deve ter 17 caracteres e não pode estar vazio)
* Renavam (Deve ter 11 caracteres e não pode estar vazio)
* Modelo (Não pode estar vazio)
* Marca  (Não pode estar vazio)
* Ano  (Não pode estar vazio)
* Após preencher, clique em Salvar ou caso deseje cancelar clique no botão Cancelar.

# Atualizar Veículo
* Para atualizar um veículo, basta clicar no botão de editar ao lado do veículo desejado na coluna Ações. Após o clique liberará os campos input para a edição. 
  Alem do indicativo de liberação dos inputs, percebe-se que o botão muda o nome para Atualizar. Após feitas as edições desejadas, clique em Adicionar. Os dados 
  serão salvos e a tela atualizada!
* Importante resalvar que a coluna Id não pode ser alterada pois ela é reservada a desenvolvedoras e está diponibilizada na tela a fim de avaliação e conferência de dados
  para os recrutadores!

# Excluir Veículo
* Para excluir um veículo, clique no botão de excluir ao lado do veículo desejado na coluna Ações. O veículo em questão será excluido da lista e da API.


# Possíveis Melhorias
* Validação de Dados: Implementar validação adicional nos campos do formulário, como verificar o formato da placa, chassi, etc.
* Descrição: Integrar o sistema com APIs externas, como serviços que validam a placa do veículo ou serviços que retornam informações adicionais sobre o modelo e ano do veículo.
* Exemplo: Integrar uma API de consulta de veículos para preencher informações automaticamente, como o modelo e a marca, quando o usuário inserir a placa.
* Autenticação: Adicionar autenticação para proteger as rotas de CRUD.
* UI/UX: Melhorar a interface do usuário com componentes gráficos mais interativos, como modais ou formulários de edição mais dinâmicos.
* Entre outros...
