import React, { useEffect, useState } from 'react'
import  './Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { CollectionReference, DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import {async} from "@firebase/util";
import useSubCollection from '../../hooks/useSubCollection';


const Chat=() =>{
    const [inputText, setInputText]= useState<string>("")
    const channelId= useAppSelector((state)=> state.channel.channelId)
    const user= useAppSelector((state)=> state.user.user)
    const {subDocuments:messages}=useSubCollection("channels","messages")

    const sendMessage= async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
    
    const collectionRef: CollectionReference<DocumentData> =collection(db, "channels", String(channelId),"messages")
    const docRef: DocumentReference<DocumentData>=await addDoc(collectionRef,{
        message:inputText,
        timestamp: serverTimestamp(),
        user: user,
    })
    //console.log(docRef)
    setInputText("");
    }

    const channelName = useAppSelector((state)=>state.channel.channelName)
  return (
    <div className='chat'>
        {/*chatheader*/}
        <ChatHeader channelName={channelName}/>
        {/* chatMessage*/}
        <div className='chatMessage'>
            {messages.map((message,index)=>(
            <ChatMessage 
            key={index} 
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
            />
            ))}

        </div>
        {/*chatInput*/}
        <div className='chatInput'>
            <AddCircleOutlineIcon/>
            <form>
                <input type='text' placeholder='send message to Udemy' onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setInputText(e.target.value)}
                    value={inputText}/>
                <button type='submit' className='chatInputButton' disabled={Boolean(!channelId)} onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> sendMessage(e)} >
                submit
                </button>
            </form>

            <div className='chatInputIcons'>
                <CardGiftcardIcon/>
                <GifIcon/>
                <EmojiEmotionsIcon/>
            </div>
        </div>
    </div>
  )
}

export default Chat