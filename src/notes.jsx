import { Collapse, Input, Modal } from "antd";
import { Delete, DeleteIcon, LucideDelete, PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
const { TextArea } = Input;


export default function Notes(props) {
    //first check if data exists
    const [createmode, setcreatemode] = useState(false)
    const [newnote, setnewnote] = useState({ title: '', text: '' })
    const { accentclr, studytimer, spotifylink, setspotifylink, setstudytimer, maxtimersecs, setmaxtimersecs } = props
    let dataexists = localStorage.getItem("notes") !== null;
    let data =  dataexists ? JSON.parse(localStorage.getItem("notes") ): ['']
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
    if(dataexists){
        data.forEach((onenote, index)=>{
         formatedData[index] = {key: ''+index, label: onenote.title, children: <Input suffix={<Trash size={14} style={{cursor: 'pointer'}} onClick={()=>(deletehandler(index))} />} onPressEnter={(e)=>(edithandler(index, e.target.value))} defaultValue={onenote.text} />}
        })
    }
    const handleNewNote = () => {
        if(newnote.title === '' || newnote.text === ''){
            return
        }
        //check if notes present
        let initialnotes = localStorage.getItem("notes")
        initialnotes = initialnotes === null ? [] : JSON.parse(initialnotes)
        //now push
        initialnotes.push({ title: newnote.title, text: newnote.text })
        //set now
        localStorage.setItem("notes", JSON.stringify(initialnotes))
        //clear the state of new note
        setnewnote({ title: '', text: '' })
        //close modal
        setcreatemode(false)
    }

    return (
        <div style={{
            display: 'grid',
            gridAutoFlow: 'row',
            color: accentclr,
            textAlign: "center",
            alignContent: dataexists ? "none" : "center",
            alignItems: dataexists ? "center" : "none",
            gridTemplateRows: dataexists ? "repeat(5, 1fr)" : "auto",
            height: '100%'
        }}>
            <Modal className="bold" title="Add Note" onOk={handleNewNote} open={createmode} onCancel={() => (setcreatemode(false))}>
                <Input value={newnote.title} onChange={(e) => (setnewnote({ title: e.target.value, text: newnote.text }))} className="bold" placeholder="title" size="large" />
                <TextArea value={newnote.text} onChange={(e) => (setnewnote({ title: newnote.title, text: e.target.value }))} className="reguar" autoCorrect="none" placeholder="note" size="middle" />
            </Modal>
            {


                dataexists && data.length > 0 ?
                    (
                        <>
                            <div>{<PlusIcon style={{cursor: 'pointer'}} onClick={()=>(setcreatemode(true))} />}</div>
                            <div>
                               {

                               <Collapse bordered={false} items={formatedData} />
                               }
                            </div>
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