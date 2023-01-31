import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

// Interface needs to be exported as a Type of the Repository
// export interface Message {
//     id: number,
//     content: string
// }

@Injectable()
export class MessagesRepository {

    public async findOne(id: string) {
        const messages = await this.retrieveDataFromStorageIntoJSON();
        return messages[id];
    }

    public async findAll() {
        const messages = await this.retrieveDataFromStorageIntoJSON();
        return messages;
    }

    public async create(content: string) {
        const messages = await this.retrieveDataFromStorageIntoJSON();
        const id = Math.floor(Math.random() * 999);

        // example message[22] = { id: 22, content: 'Hi There!' }
        messages[id] = { id, content };

        await writeFile('messages.json', JSON.stringify(messages));
    }

    private async retrieveDataFromStorageIntoJSON() {
        const dataFromStorageAsString = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(dataFromStorageAsString);
        return messages;
    }
}