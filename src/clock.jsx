import Draggable from "react-draggable";
import { toast } from "react-toastify";


export default function (props) {
    const { twelwehrscheme,secondstotime , oppclr, msize, xlsize, settwelwehrscheme, time, maxtimersecs , timerpaused, settimerpaused, studytimer, setstudytimer, timerprogress } = props

    const infostudytimer = () => {
        toast.success('study until you see the flower completely open!', {
            position: "top-center",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    const divstyles = {
        color: oppclr,
        textAlign: 'center'
    }
    return (
        <Draggable cancel=".timer_controls">
            {studytimer ? 
            
            (<div className="timer" style={divstyles}>
                <h3 style={{textShadow: '0px 10px 90px black'}}>Study Timer</h3>
                <h1 style={{fontSize: xlsize, textShadow: '0px 10px 90px black'}}>{secondstotime(maxtimersecs - timerprogress)}</h1>
                <div style={{display: 'grid', gridAutoFlow: 'column'}}><p className="timer_controls" onClick={()=>{settimerpaused(false); infostudytimer()}}>resume</p> <p className="timer_controls" onClick={()=>{settimerpaused(true)}}>pause</p></div>
            </div>) 
            
            : (
                <div style={divstyles}
                    onClick={() => { settwelwehrscheme(!twelwehrscheme) }}
                >
                    <h3 style={{ fontSize: msize, textShadow: '0px 10px 90px black' }}>{time.day}, {time.month} {time.date}</h3>
                    <h1 className={'bold'} style={{ fontSize: xlsize, textShadow: '0px 10px 90px black' }}>  {time.hour}:{time.minute} </h1>
                </div>
            ) }
        </Draggable>
    )
}