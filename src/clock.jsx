import Draggable from "react-draggable";
import { toast } from "react-toastify";


export default function (props) {
    const { twelwehrscheme,secondstotime , oppclr, msize, xlsize, settwelwehrscheme, time, maxtimersecs , timerpaused, settimerpaused, studytimer, setstudytimer, timerprogress } = props

    const infostudytimer = () => {
        toast.info('study until you see the flower completely open!', {
            position: "bottom-left",
            autoClose: false,
            hideProgressBar: true,
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
        <Draggable>
            {studytimer ? 
            
            (<div className="timer" style={divstyles}>
                <h3>Study Timer</h3>
                <h1 style={{fontSize: xlsize}}>{secondstotime(maxtimersecs - timerprogress)}</h1>
                <div style={{display: 'grid', gridAutoFlow: 'column'}}><p onClick={()=>{settimerpaused(false); infostudytimer()}}>resume</p> <p onClick={()=>{settimerpaused(true)}}>pause</p></div>
            </div>) 
            
            : (
                <div style={divstyles}
                    onClick={() => { settwelwehrscheme(!twelwehrscheme) }}
                >
                    <h3 style={{ fontSize: msize }}>{time.day}, {time.month} {time.date}</h3>
                    <h1 className={'bold'} style={{ fontSize: xlsize }}>  {time.hour}:{time.minute} </h1>
                </div>
            ) }
        </Draggable>
    )
}