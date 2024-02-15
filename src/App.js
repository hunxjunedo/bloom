
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import videoassets from './videolinks.json'
import "video-react/dist/video-react.css"; // import css
import { BigPlayButton, ControlBar, LoadingSpinner, Player, VolumeMenuButton } from 'video-react';
import Clock from './clock'
import SupportDock from './dock'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spotify } from 'react-spotify-embed';
import Window from './window';
import { FastAverageColor } from 'fast-average-color';
import $ from 'jquery'

function App() {
  //calculate random index
  let maxindex = videoassets.total - 1
  let minindex = 0
  let randvid =  Math.floor(Math.random() * (maxindex - minindex + 1)) + minindex;
//color avg
// var rndcolor = 'hsl(' + Math.round(Math.random() * 359) + ',100%,50%)';
  const oppositecolor = 'white'
  const [accentclr, setaccentclr] = useState('purple')
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState(null);
  const [currentvideo, setcurrentvideo] = useState(randvid)
  const [twelwehrscheme, settwelwehrscheme] = useState(false)
  const [time, settime] = useState({hour : 23, minute: 23, second: 23, meridium: 'PM', day: 'Monday', month: 'June', date: 11})
  const [studytimer, setstudytimer] = useState(false);
  const [timerpaused, settimerpaused] = useState(true);
  const [timerprogress, settimerprogress] = useState(0)
  const [openwindows, setopenwindows] = useState([{windowname: 'empty', content: 'empty', contentprops: {}}])
  const [maxtimersecs, setmaxtimersecs] = useState(15*60)
  const [spotifylink, setspotifylink] = useState('https://open.spotify.com/album/4q3ve949eWWJnuRRPzU8bQ?si=NZABHHnaTWukoZX9RpMCLg');
  const defaulttitle = 'Bloom'
  const ismobile = window.innerWidth < 700
  console.log(window.innerWidth)
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.subscribeToStateChange((state) => {
        setPlayerState(state);
      });
    }


  
    //time interval
    const uniinterval = setInterval(()=>{
      let currentdate = new Date();
      let hour = currentdate.getHours();
      let meridium = hour >= 12 ? 'PM' : 'AM'
      hour = hour > 12 && twelwehrscheme ? hour - 12 : hour;
      let minute = ('0' + currentdate.getMinutes()).slice(-2);
      let second = ('0' +currentdate.getSeconds()).slice(-2);
      let date = currentdate.getDate();
      let day = currentdate.toLocaleString('en-US', {weekday: 'long'})
      let month = currentdate.toLocaleDateString('default', {month: 'long'})
      !studytimer ? settime({hour, minute, second, meridium, date, day, month}) : console.log('hey there!')
      //see if timer has to be changed
       studytimer && !timerpaused && timerprogress < maxtimersecs ? settimerprogress(timerprogress + 1) : console.log('🤍')
       window.document.title =  studytimer && !timerpaused ? secondstotime(maxtimersecs - timerprogress) : defaulttitle
       timerprogress >= maxtimersecs ? settimerpaused(true) : console.log('🥸')
      //change bloom
      let percentminutescmpleted = !studytimer ? ((currentdate.getHours() * 60 * 60 + currentdate.getMinutes() * 60 + currentdate.getSeconds()) / (12 * 60 * 60) ) * 100 : timerprogress/maxtimersecs * 100
      console.log(percentminutescmpleted)
      percentminutescmpleted = Math.round(percentminutescmpleted * 10000) / 10000
      console.log(percentminutescmpleted)
      //change bloom
      let vidlength = playerState ? playerState.duration : videoassets['videos'][currentvideo].duration
      console.log(vidlength)
      let vidprogress = percentminutescmpleted > 100 ? vidlength -  ((percentminutescmpleted - 100) * vidlength)/100 : (vidlength * percentminutescmpleted) / 100
      console.log(vidprogress)
      vidprogress = Math.round(vidprogress * 10000) / 10000
      console.log(vidprogress)
      playerRef.current.seek(vidprogress)

      
    }, 1000)
    return () => {clearInterval(uniinterval)}
  }, [twelwehrscheme, studytimer, timerpaused, timerprogress]);

   const secondstotime = (secondsinitial) => {
    console.log(secondsinitial)
    let hours = Math.floor(secondsinitial / (60*60));
    hours = ('0' + hours).split(-2)
    let minutes = Math.floor((secondsinitial - (hours*60*60))/60);
    let seconds = Math.floor(secondsinitial - (hours*60*60) - (minutes*60))
    seconds = ('0' + seconds).slice(-2)
    return (hours != '00' ? hours + ":" : '') + minutes + ":" + seconds
}

    const playerstyles = {
      position: 'absolute',
      right: 10,
      top: 10,
      width: 'fit-content',
      scale: ismobile ? '0.5' : '1'
    }

    const msize = ismobile ? 15 : 20; const xlsize =  ismobile ? 60 : 80; const ssize = ismobile ? 12 : 15
  return (
<>
<ToastContainer/>

{
  openwindows.map((window, index)=> (
    <Window {...{window}} index={index} accentclr={accentclr} oppcolor={oppositecolor} {...{openwindows, setopenwindows, msize, xlsize, ssize}} />
  ))
}
<Player  preload ref={playerRef}  controls={false} muted={true} style={{width: '100vw', height: '100vh', position: 'absolute', PointerEvents: 'none'}}	 src={videoassets['videos'][currentvideo]["videos"]["small"].url} >

        </Player>
        <Spotify wide style={playerstyles} link={spotifylink} />
                <SupportDock {...{accentclr, ismobile, setaccentclr, openwindows, setopenwindows, oppclr: oppositecolor, studytimer,msize, xlsize, ssize, spotifylink, setspotifylink, setstudytimer, timerpaused, settimerpaused, settimerprogress, maxtimersecs, setmaxtimersecs}} />
               <Clock { ...{twelwehrscheme, msize, oppclr: oppositecolor, xlsize, ssize, secondstotime, maxtimersecs, settwelwehrscheme, time, timerpaused, settimerpaused, studytimer, setstudytimer, timerprogress}} />
              </>

  )
}

export default App;
