import { useState } from 'react';
import settingSVG from './apple-settings.svg';
import notesSVG from './apple-notes.svg';
import tasksSVG from './apple-reminders.svg'

import userSVG from './user.svg'
import Window from './window';
import Settings from './settings';
import Notes from './notes';
export default function Application(props){
    const {openwindows, settimerpaused, setopenwindows, setaccentclr, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink, settimerprogress} = props
    console.log(openwindows)
        //the issue of draggable not allowing click
        // var clicked = false
        // $(".glower").on('mousedown', e => { clicked = true});
        // $(document).on('mousemove', e => {clicked = false});
        // $(".glower").on('mouseup', e => {clicked ?  glowcolor + 1 >= availableglows.length ? setglowcolor(0) : setglowcolor(glowcolor + 1) : console.log('good');  });
        // clicked = false;
          ///
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
            var contentprops = {spotifylink,settimerpaused, setspotifylink, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, settimerprogress, setaccentclr}
            break;
        case 'notes':
            icon = notesSVG
            content = Notes
            var contentprops = {spotifylink, setspotifylink, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, settimerprogress}

        break;   

        case 'tasks':
            icon = tasksSVG
            content = Notes
            var contentprops = {spotifylink, setspotifylink, accentclr, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, settimerprogress, notestype: 'tasks'}

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
        }} src={icon} className='appicon' onClick={()=>{windowEmit(props.type, content, contentprops)}} />
        {
        }
   </>
    )
    
}