import {Model, model, models, Schema} from 'mongoose';

const TaskSchema = new Schema(
    {
        idProjeto : {type: Schema.Types.ObjectId, ref:'Projeto' , required: true},
        nomeTarefa : {type: String, required: true},
        descTarefa : {type: String, required: false},
        status : {type: String, required: true},
        prioridade : {type: String, required: true},
        data : {type: Date, required: true}
    });

export const Task = models.Task || model("Task", TaskSchema);