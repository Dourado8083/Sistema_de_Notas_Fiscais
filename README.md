# Korp_Teste_GustavoDouradoSantos: Sistema de Emissão de Notas Fiscais

## 📝 Resumo do Projeto

Este projeto é um **Sistema de Emissão de Notas Fiscais** desenvolvido como teste técnico para a vaga de Desenvolvedor(a) Full Stack Júnior (Lovel/Ada AI).

A aplicação utiliza uma arquitetura de **Microsserviços** e é composta por:

1.  **Módulos:** Cadastro de Produtos, Cadastro de Notas Fiscais e Impressão/Fechamento de Notas.
2.  **Arquitetura:** Serviço de Estoque e Serviço de Faturamento.

## 🛠️ Tecnologias Principais

* **Frontend:** Angular
* **Backend:** [C#]
* **Persistência:** [Mysql]
* **Deploy:** Docker e Docker Compose

## 🚀 Como Iniciar (Usando Docker)

Para rodar todo o sistema (Frontend, Microsserviços e Banco de Dados) localmente:

1.  Clone este repositório.
2.  Execute o comando na raiz do projeto:

    ```bash
    docker-compose up --build -d
    ```

3.  Acesse a aplicação Angular em `4200`.

## ✅ Requisitos Implementados

* Microsserviços de Estoque e Faturamento.
* Persistência real em Banco de Dados.
* Tratamento de Falhas com recuperação e feedback ao usuário.
* **[Opcional Implementado: Adicione aqui se fez algum diferencial, ex: Tratamento de Concorrência.]**

## 📹 Detalhamento e Entrega

O detalhamento técnico completo (ciclos de vida do Angular, RxJS, tratamento de erros, LINQ/Gerenciamento de dependências Go, etc.) está no **vídeo de apresentação** enviado por e-mail.

---

### 👤 Autor
* **Gustavo Dourado Santos**
* **LinkedIn:** [https://www.linkedin.com/in/gustavodouradosantos/](https://www.linkedin.com/in/gustavodouradosantos/)
