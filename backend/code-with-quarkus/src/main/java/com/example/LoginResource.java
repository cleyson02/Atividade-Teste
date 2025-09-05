package com.example;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginResource {

    @POST
    @Path("/login")
    public Response login(LoginRequest loginRequest) {
        // Simulação de validação - em produção, usaríamos uma base de dados
        if ("usuario@exemplo.com".equals(loginRequest.getLogin()) && "Senha123!".equals(loginRequest.getSenha())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "SUCESSO! VOCÊ ESTÁ LOGADO");
            return Response.ok(response).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\": \"Credenciais inválidas\"}")
                    .build();
        }
    }

    @POST
    @Path("/recuperar-senha")
    public Response recuperarSenha(RecuperarSenhaRequest request) {
        // Simulação de recuperação de senha
        Map<String, String> response = new HashMap<>();
        response.put("message", "Instruções de recuperação enviadas para o email: " + request.getEmail());
        return Response.ok(response).build();
    }

    @GET
    @Path("/cep/{cep}")
    public Response buscarCep(@PathParam("cep") String cep) {
        // Simulação de busca de CEP - em produção, integrar com API ViaCEP ou similar
        Map<String, String> endereco = new HashMap<>();
        
        if ("01001000".equals(cep)) {
            endereco.put("logradouro", "Praça da Sé");
            endereco.put("bairro", "Sé");
            endereco.put("localidade", "São Paulo");
            endereco.put("uf", "SP");
            return Response.ok(endereco).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"CEP não encontrado\"}")
                    .build();
        }
    }

    public static class LoginRequest {
        private String login;
        private String senha;

        // getters e setters
        public String getLogin() { return login; }
        public void setLogin(String login) { this.login = login; }
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }

    public static class RecuperarSenhaRequest {
        private String email;

        // getters e setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}