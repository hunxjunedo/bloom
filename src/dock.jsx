import { ConfigProvider, Input, InputNumber } from "antd";
import { useState } from "react";
import Draggable from "react-draggable"
import Application from "./application";

export default function (props) {

    const { studytimer, openwindows, setopenwindows, setstudytimer, accentclr, msize, xlsize, ssize, spotifylink, setspotifylink, timerpaused, maxtimersecs, settimerprogress, setmaxtimersecs, settimerpaused } = props
    const divstyles = {
        color: accentclr,
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateRows: 'repeat(2, 1fr)',
        width: '90%',
        alignItems: 'center',
        justifyItems: 'center',

    }
    const resetstyles = {
        margin: 5,
        fontSize: ssize,
        color: accentclr,
        textAlign: 'end',
        cursor: 'pointer'
    }

    return (
        <ConfigProvider theme={{
            token: {
                colorBgContainer: 'transparent',
                colorText: accentclr,
                colorTextDescription: accentclr
            },
            components: {
                InputNumber: {
                    handleBorderColor: accentclr
                }
            }
        }}>
            <Draggable cancel={'.switch, input'}>
                <div style={{
                    position: 'absolute',
                    left: 10,
                    top: 10
                }}>
                    <div  style={{
                        borderRadius: 20,
                        background: 'rgb(156, 156, 156, 0.6)',
                        cursor: 'move',
                        backdropFilter: 'blur(10px)',
                        width: '5vw',
                        height: '5vw',
                        display: 'grid',
                        justifyItems: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        left: 10,
                        top: 10
                    }}>
                        <div style={{
                            borderRadius: '100px',
                            background: 'rgb(255, 255, 255, 0.8',
                            width: '50%',
                            height: '50%',
                            pointerEvents: 'none',
                            color: 'transparent'
                        }}>
                            .
                        </div>
                    </div>
                    {
                        (
                            <div style={{
                                width: '5vw',
                                height: 'fit-content',
                                display: 'grid',
                                gridAutoFlow: 'row',
                                position: "absolute",
                                top: '6vw',
                                left: 10,
                                background: 'rgb(156, 156, 156, 0.6)',
                                borderRadius: 20,
                                backdropFilter: "blur(10px)",
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}>
                                <Application {...{openwindows, accentclr, setopenwindows,  studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink}} type='settings'/>
                                <Application {...{openwindows, accentclr, setopenwindows,  studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink}} type='notes'/>

                            </div>

                        )
                    }

                </div>
            </Draggable>
        </ConfigProvider>
    )
}