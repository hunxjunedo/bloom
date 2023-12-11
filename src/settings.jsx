import { ColorPicker, Input, InputNumber, Switch } from "antd"
const genericdiv = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    maxHeight: '10vh',
    borderBottom: '1px solid rgb(233, 233, 233, 0.2)',
}



function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

export default function Settings(props) {
const {accentclr, studytimer, spotifylink, setspotifylink, setstudytimer, maxtimersecs, setmaxtimersecs, settimerprogress, setaccentclr} = props 
console.log(spotifylink) 
return (
        <div className="bold" style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridAutoFlow: 'row',
            color: accentclr,
            gridTemplateRows: 'repeat(5, 1fr)'
        }}>
      <div style={genericdiv}>
   <p className="start">Study Timer</p>
   <p className="end"><Switch defaultChecked={studytimer} onChange={(changed) => {settimerprogress(0);setstudytimer(changed)}} /></p>
      </div>
      <div style={genericdiv}>
   <p className="start">Timer Minutes</p>
   <p className="end"><InputNumber defaultValue={maxtimersecs / 60} onChange={(e)=>(setmaxtimersecs(e* 60))} min={5} max={5*60} /></p>
      </div>
      <div style={genericdiv}>
        <p className="start">Spotify Link</p>
        <p className="end"><Input placeholder="press enter" defaultValue={spotifylink} onPressEnter={(e)=>( isValidHttpUrl(e.target.value) ? setspotifylink(e.target.value)  : console.log('dont be naughty'))} /></p>
      </div>
      <div style={genericdiv}>
        <p className="start">Theme Color</p>
        <p className="end"><ColorPicker defaultValue={accentclr} onChange={(val, color)=>(setaccentclr(color))} /></p>
      </div>
        </div>
    )
}