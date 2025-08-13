import {Model, model, models, Schema} from "mongoose";

const ProjetoSchema = new Schema(
    {
        idUsuario : {type: Schema.Types.ObjectId, ref:'Usuario' , required: true},
        nomeProjeto : {type: String, required: true},
        descricaoProjeto : {type: String, required: true}
    }
);

export const Projeto = models.Projeto || model("Projeto", ProjetoSchema);