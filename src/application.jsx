import { useState } from 'react';
import settingSVG from './apple-settings.svg';
import notesSVG from './apple-notes.svg';

import userSVG from './user.svg'
import Window from './window';
import Settings from './settings';
import Notes from './notes';
export default function Application(props){
    const {openwindows, setopenwindows, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink} = props
    console.log(openwindows)
    const windowEmit = (type, Content, contentprops) => {
        let windowexists = false
        // //first check if it already exists
        // let windowexists = false
        // openwindows.forEach(window => {
        //     window.name && window.name === type ? windowexists = true : console.log('*')
        // });
        

        //if it already doesnt exist
      if(!windowexists){
        let temporarywinds = openwindows;
        temporarywinds.push({windowname: type, Content, contentprops})
        setopenwindows(temporarywinds)
      }
        
    }
    //import the svg icon to send back
    //now see what is requested
    switch (props.type) {
        case 'settings':
            var icon = settingSVG
            var content = Settings
            var contentprops = {spotifylink, setspotifylink, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs}
            break;
        case 'notes':
            icon = notesSVG
            content = Notes
            var contentprops = {spotifylink, setspotifylink, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs}

        break;    
    
        default:
            break;
    }

    return (
   <>
        <img style={{
            userSelect: 'none',
            cursor: 'pointer',
            width: '90%',
            height: '90%'
        }} src={icon} onClick={()=>{windowEmit(props.type, content, contentprops)}} />
        {
        }
   </>
    )
    
}