"use client";

import { DeletarTarefa } from "./actions";
import { Types } from 'mongoose';
import {Pencil, Trash} from "lucide-react";
import { useRouter } from "next/navigation";

type Props = { id: string };

export default async function DeletarTask({ id }: Props)
{
    const objectID = new Types.ObjectId(id);
    const router = useRouter();

    async function handleDelete() {
        await DeletarTarefa(objectID);
        router.refresh();
    }

    return(
        <>
            <button className="text-left px-3">
            <Pencil size={20}/>
            </button>
            <button onClick={handleDelete} className="text-left px-2">
            <Trash size={20}/>
            </button>
        </>
    );
}

