import {Model, model, models, Schema} from 'mongoose';

const TaskSchema = new Schema(
    {
        nomeTarefa : {type: String, required: true},
        descTarefa : {type: String, required: false},
        status : {type: String, required: true},
        prioridade : {type: String, requires: true},
        data : {type: Date, requires: true}
    });

export const Task = models.Task || model("Task", TaskSchema);