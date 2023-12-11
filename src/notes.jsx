import { Collapse, Input, Modal } from "antd";
import { Check, CheckCircle, Delete, DeleteIcon, LucideDelete, PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
const { TextArea } = Input;


export default function Notes(props) {
    //first check if data exists
    const [createmode, setcreatemode] = useState(false)
    const [newnote, setnewnote] = useState({ title: '', text: '' })
    const [newtask, setnewtask] = useState('')
    const { accentclr, studytimer, spotifylink, setspotifylink, setstudytimer, maxtimersecs, setmaxtimersecs, notestype } = props
    let tasksneeded = notestype === 'tasks' ? 'tasks' : 'notes'
    let dataexists = localStorage.getItem(tasksneeded) !== null;
    let data =  dataexists ? JSON.parse(localStorage.getItem(tasksneeded) ): ['']
    const checkstyle = {
        margin: '10px',
        cursor: 'pointer'
    }

    const markasdone = (index) => {
        //get 
        let initialtasks = JSON.parse(localStorage.getItem(tasksneeded))
        //check
        initialtasks.forEach((onetask, taskindex)=>{
          taskindex === index ? onetask.done = true : console.log(':>')
        })
        //set
        localStorage.setItem(tasksneeded, JSON.stringify(initialtasks))
    }
    const taskstyles = {
        width: '95%',
        height : '90%',
        borderRadius: '15px',
        background: "rgb(40, 40, 40)",
        maxHeight: '7vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
    let formatedData = []
    //edit
    const edithandler = (index, val) => {
        data.forEach((note, i)=>{
            i === index ? note.text = val : console.log(";)")
        })
        //now change the localstoarge
        localStorage.setItem('notes', JSON.stringify(data))
        //now toastify
        toast.info('edited ✔️', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    const deletehandler = (index) => {
        //traverse
        data.forEach((onedata, i) => {
            i === index ? data.splice(i, 1) : console.log(';>')
        })

                //now change the localstoarge
                localStorage.setItem('notes', JSON.stringify(data))
                //now toastify
                toast.success('deleted ✔️', {
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
    //formation
    if(dataexists && tasksneeded === 'notes'){
        data.forEach((onenote, index)=>{
         formatedData[index] = {key: ''+index, label: onenote.title, children: <Input suffix={<Trash size={14} style={{cursor: 'pointer'}} onClick={()=>(deletehandler(index))} />} onPressEnter={(e)=>(edithandler(index, e.target.value))} defaultValue={onenote.text} />}
        })
    }
    const handleNewNote = () => {
        // if(newnote.title === '' || newnote.text === ''){
        //     return
        // }
        //SOME CONFIGS
        var newversion = tasksneeded === 'tasks' ? {text: newtask, done: false} : {text: newnote.text, title: newnote.title}
        var emptyversion = tasksneeded === 'tasks' ? '' : {text: '', title: ''}
        var clearfunc = tasksneeded === 'tasks' ? setnewtask : setnewnote
        //check if notes present
        let initialnotes = localStorage.getItem(tasksneeded)
        initialnotes = initialnotes === null ? [] : JSON.parse(initialnotes)
        //now push
        initialnotes.push(newversion)
        //set now
        localStorage.setItem(tasksneeded, JSON.stringify(initialnotes))
        //clear the state of new note
        clearfunc(emptyversion)
        //close modal
        setcreatemode(false)
    }

    return (
        <div style={{
            display: 'flex',
            gridAutoFlow: 'row',
            flexFlow: 'row',
            flexDirection: 'column',
            color: accentclr,
            gap: '5px',
            textAlign: "center",
            alignContent: dataexists ? "none" : "center",
            alignItems: dataexists ? "center" : "none",
            gridTemplateRows:  "auto",
            height: '100%'
        }}>
            <Modal className="bold" title={tasksneeded ? 'Add Task' : 'Add Note'} onOk={handleNewNote} open={createmode} onCancel={() => (setcreatemode(false))}>
             {tasksneeded === 'notes' ? 
              <>
              <Input value={newnote.title} onChange={(e) => (setnewnote({ title: e.target.value, text: newnote.text }))} className="bold" placeholder="title" size="large" />
                <TextArea value={newnote.text} onChange={(e) => (setnewnote({ title: newnote.title, text: e.target.value }))} className="reguar" autoCorrect="none" placeholder="note" size="middle" /> 
             </>

             :

             <Input placeholder="todo..." onChange={e=>(setnewtask(e.target.value))} onPressEnter={handleNewNote} />
            
            
            }
            </Modal>
            {


                dataexists && data.length > 0 ?
                    (
                        <>
                            <div>{<PlusIcon style={{cursor: 'pointer'}} onClick={()=>(setcreatemode(true))} />}</div>
                               {

                               tasksneeded === 'notes' ? <Collapse bordered={false} items={formatedData} /> : data.map((onetask, index) => (
                                <div className="bold" style={taskstyles} >{onetask.done ? <strike>{onetask.text}</strike> : <>{onetask.text} <CheckCircle onClick={()=>(markasdone(index))} style={checkstyle} size={14} /></> }</div>
                               ))
                               }
                        </>

                    ) :

                    (
                        <>
                            <div style={{height: '5vh'}}>{<PlusIcon />}</div>

                            <h3 >Nothing Here 🙃</h3>
                            <p onClick={() => (setcreatemode(true))} style={{ textDecoration: 'underline', cursor: 'pointer' }}>create one</p>
                        </>
                    )
            }
        </div>
    )
}