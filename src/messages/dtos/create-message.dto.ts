import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {

    // Swagger
    @ApiProperty({
        description: 'The content of the message to be created',
        example: "Hi there!"
      })
    // Validation rule for the DTO
    @IsString()
    content: string;
}

