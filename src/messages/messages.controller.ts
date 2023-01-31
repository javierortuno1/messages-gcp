import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messagesService: MessagesService) {}

    /**
     * Get All the messages
     * @returns 
     */
    @Get()
    listMessages() {
        // we do not to await since we are returning a call to the service function
        return this.messagesService.findAll();
    }

    /**
     * Post message for creating a new message
     * @param body of type CreateMessageDto. Applying the DTO to the
     * request Handler
     * @returns 
     */
    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    /**
     * Get one specific message from messages storage
     * @param id of the specific message
     * @returns 
     */
    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        // we need await since we have to wait for the service to get the value of the variable
        const message = await this.messagesService.findOne(id);

        if (!message) {
            throw new NotFoundException('message not found');
        }

        return message;
    }

}
