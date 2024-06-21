import React from 'react'
import "./SidebarChannel.scss";
import { DocumentData } from 'firebase/firestore';
import { useAppDispatch } from '../../app/hooks';
import { setChannelInfo } from '../../features/channelSlice';

type Props={
  id:string;
  channel: DocumentData;
}

const SidebarChannel=(props: Props)=> {
  const {id,channel}=props;
  const dispatch=useAppDispatch()
  return (
    <div className='sidebarChannel' onClick={()=>
      dispatch(
        setChannelInfo({
          channelId:id,
          channelName:channel.channel.channelName,
        })
    )}>
      <h4>
        <span className='sidebarChannelHash'>#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  )
}

export default SidebarChannel