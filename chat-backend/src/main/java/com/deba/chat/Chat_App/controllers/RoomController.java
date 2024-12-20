package com.deba.chat.Chat_App.controllers;


import com.deba.chat.Chat_App.entities.Message;
import com.deba.chat.Chat_App.entities.Room;
import com.deba.chat.Chat_App.reposotories.RoomReposotory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    private RoomReposotory roomReposotory;

    public  RoomController(RoomReposotory roomReposotory)
    {
        this.roomReposotory = roomReposotory;
    }
    //create room

    @PostMapping("/create")
    public ResponseEntity<?> RoomcreateRoom(@RequestBody String roomId)
    {
        if(roomReposotory.findByRoomId(roomId) != null)
        {
            //room is already there
            return ResponseEntity.badRequest().body("Room already exists!");
        }

        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomReposotory.save(room);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
    }
    @GetMapping("/{roomId}")
    public String createRoom(@PathVariable("roomId") String roomId)
    {
        Room room = roomReposotory.findByRoomId(roomId);
        if(room == null)
        {
            return "0";
            //
        }

        return "1";
    }

    //get room: join
    @GetMapping("/join/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable("roomId") String roomId)
    {
        Room room = roomReposotory.findByRoomId(roomId);
        if(room == null)
        {
            return ResponseEntity.badRequest().body("Room not found");
            //
        }

        return ResponseEntity.ok(room);
    }


    //get messages of room

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable("roomId") String roomId
    ,@RequestParam(value = "page",defaultValue = "0",required = false) int page
    ,@RequestParam(value = "size",defaultValue = "20", required = false) int size)
    {

       Room room =  roomReposotory.findByRoomId(roomId);
       if(room == null)
       {
           return ResponseEntity.badRequest().build();
       }

       //get message:
        //pagination


        List<Message> messages = room.getMessages();
        int start= Math.max(0,messages.size()-(page+1)*size);
        int end = Math.min(messages.size(),start+size);
        List<Message> paginateMessages= messages.subList(start,end);
        return ResponseEntity.ok(paginateMessages);
    }
}
