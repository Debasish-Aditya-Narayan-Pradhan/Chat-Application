package com.deba.chat.Chat_App.controllers;

import com.deba.chat.Chat_App.entities.Message;
import com.deba.chat.Chat_App.entities.Room;
import com.deba.chat.Chat_App.playload.MessageRequest;
import com.deba.chat.Chat_App.reposotories.RoomReposotory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {


    private RoomReposotory roomReposotory;

    public ChatController(RoomReposotory roomReposotory) {
        this.roomReposotory = roomReposotory;
    }

    //for sending and receiving messages

    @MessageMapping("/sendMessage/{roomId}") // /app/sendMessage/roomId
    @SendTo("/topic/room/{roomId}") //subscribe
   public Message sendMessage(
            @RequestBody MessageRequest messageRequest
            ) throws Exception {

      Room room = roomReposotory.findByRoomId(messageRequest.getRoomId());

      Message message = new Message();
      message.setContent(messageRequest.getContent());
      message.setSender(messageRequest.getSender());
      message.setTimeStamp(LocalDateTime.now());


      if(room != null)
      {
          room.getMessages().add(message);
          roomReposotory.save(room);
      }
      else {
          throw  new RuntimeException("room not found");
      }

      return message;
   }
}
