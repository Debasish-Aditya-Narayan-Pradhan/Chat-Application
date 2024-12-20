package com.deba.chat.Chat_App.reposotories;

import com.deba.chat.Chat_App.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomReposotory extends MongoRepository<Room,String> {
    //get room using room id
    Room findByRoomId(String roomid);
}
