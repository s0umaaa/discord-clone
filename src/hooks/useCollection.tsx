import React,{useState ,useEffect} from 'react'
import { onSnapshot,collection, query, DocumentData, CollectionReference, Query } from "firebase/firestore"
import { channel } from 'diagnostics_channel';
import { db } from '../firebase';

interface Channels{
    id:string,
    channel: DocumentData
}

const useCollection = (data:string) => {

    const [documents, setDocuments]=useState<Channels[]>([])


    const collectionRef: Query<DocumentData> = query(collection(db, data))

    useEffect(()=>{
        
        onSnapshot(collectionRef,(querySnapshot)=>{
            const channelsResults: Channels[]=[];
            querySnapshot.docs.forEach((doc) => channelsResults.push({
                id: doc.id,
                channel: doc.data(),
            })
        )
        setDocuments(channelsResults)
        })
    },[])

  return {documents}
}

export default useCollection