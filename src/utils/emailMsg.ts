export const message = (
  userId: string,
  service: string,
  typeAction: string
) => {
  let title: string;
  let info: string;

  if (typeAction == "create") {
    title = "Meu cadastro";
    info =
      "Para finalizar o seu cadastro, você será redirecionar para criar sua senha";
  } else {
    title = "Redefinição de senha";
    info = "Você será redirecionar para redefinir sua senha";
  }

  return ` 
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }

                h1 {
                    color: #1e92c8;
                }

                #container {
                    background: #fff;
                    border-radius: 0.5rem;
                    border: 2px solid #9d9797;
                    padding: 1rem;
                }

                p {
                    color: #9D9797;
                }

                button {
                background: #5dc4e4;
                color: #fff;
                border-radius: 0.5rem;
                border: transparent;
                height: 2rem;
                }
            </style>
        </head>
        <body>
            <div id='container'> 
                <h1>${title}</h1>

                <p>Seja muito bem vindo ao nosso serviço de autenticação</p>

                <p>
                    ${info}
                </p>

                <button>
                    <a href="${process.env.AUTHENTICATOR_FRONT}/cadastro/${service}/${userId}">Cadastrar senha</a>
                </button>
            </div>
        </body>
    </html>`;
};
