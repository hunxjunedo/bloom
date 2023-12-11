import { render } from "@testing-library/react";
import { ConfigProvider } from "antd";
import { XSquare } from "lucide-react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";

export default function Window(props) {
    const {  index, accentclr, oppcolor, openwindows, setopenwindows } = props;
    const {windowname, Content, contentprops} =props.window 
    
    const deletewindow = (windowindex) => {
 //traverse
 openwindows.forEach((window, index) => {
    if(index === windowindex){

    let tempwindows = openwindows
    tempwindows.splice(index, 1)
    setopenwindows(tempwindows)

    }
 });
    }
    console.log(props)
    //emit a div window
    return (
        windowname !== 'empty' ?

            (
  <Draggable cancel=" .react-resizable-handle, .inner-conent ">
                  <ResizableBox
                    minConstraints={[100, 100]} maxConstraints={[1000, 1000]} style={{
                        resize: 'both',
                        minWidth: '20vw',
                        minHeight: '20vw',
                        position: "absolute",
                        top: 10 + 10 * index,
                        right: 10 + 10 * index,
                        background: 'rgb(10, 10, 10, 0.9)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 20,
                        borderRadius: 20,
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                        display: 'grid',
                        gridTemplateRows: "10% 90%",
                        overflow: 'clip'
                    
                    }}

                    width={200} height={200}
                    resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: accentclr,
                        display: "grid",
                        gridTemplateColumns: "20% 60% 20%",
                        justifyItems: 'center',
                        alignItems: 'center',
                        color: oppcolor,
                        cursor: 'move'
                    }} className="controls bold">
                        <div></div>
                        <div>{windowname}</div>
                        <XSquare 
                        onClick={()=>(deletewindow(index))}
                        style={{cursor: 'pointer'}} size={15} />
                    </div>

                    <div style={{
                        width: '100%',
                        height: '100%'
                    }} className="inner-conent">
                        {
                            <ConfigProvider
                            theme={{
                                components: {
                                    InputNumber: {
                                        handleBg: 'transparent'
                                    },
                                    Input: {
                                        margin: 10
                                    }
                                    ,
                                    Collapse: {
                                        headerBg: 'rgb(40, 40, 40)',
                                    }
                                    ,
                                    Modal: {
                                        contentBg: 'rgba(10, 10, 10, 0.9)',
                                        headerBg: 'transparent',
                                        borderRadius: 30
                                    }
                                },
                                token: {
                                    colorPrimary: accentclr,
                                    colorBgContainer: 'transparent',
                                    colorBorder	: accentclr,
                                    colorText: accentclr,
                                    colorTextQuaternary: "rgb(232 232 232 / 67%)",
                                    colorTextTertiary: "rgb(232 232 232 / 90%)",
                                   
                                }
                            }}
                            >
                                <Content {...contentprops} accentclr={accentclr} />
                            </ConfigProvider>
                        }
                    </div>
                </ResizableBox>

  </Draggable>
            )

            :

            ('')
    )
}