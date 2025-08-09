// um model é um objeto que representa a collection (entidade) no banco de dados

import {Model, Schema, model, models} from "mongoose";

// required significa que ele é obrigatorio dentro do banco
const UsuarioSchema = new Schema(
    {
        nome : {type: String, required: true},
        email : {type: String, required: true},
        dataNascimento : {type: Date, required: true},
        genero : {type: String, required: true},
        login : {type: String, required: true},
        senha: {type: String, required: true}
    });

// Entidade usuario foi criada com o nome usuario, baseado no Schema do Usuario (login e senha)
export const Usuario = models.Usuario || model("Usuario", UsuarioSchema);
