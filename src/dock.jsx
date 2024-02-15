import { ConfigProvider, Input, InputNumber } from "antd";
import { useState } from "react";
import Draggable from "react-draggable"
import Application from "./application";

export default function (props) {

    const { studytimer, openwindows, setopenwindows, ismobile, setstudytimer, accentclr, msize, xlsize, ssize, spotifylink, setspotifylink, timerpaused, maxtimersecs, settimerprogress, setmaxtimersecs, settimerpaused, setaccentclr } = props
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
            <Draggable cancel={'.switch, input, .appicon'}>
                <div style={{
                    position: 'absolute',
                    left: 10,
                    top: 10
                }}>
                    <div  style={{
                        borderRadius: ismobile ? 12 : 20,
                        background: 'rgb(156, 156, 156, 0.6)',
                        cursor: 'move',
                        backdropFilter: 'blur(10px)',
                        width: ismobile ? '10vw' : '5vw',
                        height: ismobile ? '10vw' : '5vw',
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
                                width: ismobile ? '10vw' : '5vw',
                                height: 'fit-content',
                                display: 'grid',
                                gridAutoFlow: 'row',
                                position: "absolute",
                                top: ismobile ? '15vw': '6vw',
                                left: 10,
                                background: 'rgb(156, 156, 156, 0.6)',
                                borderRadius: ismobile ? 10 : 20,
                                backdropFilter: "blur(10px)",
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}>
                                <Application {...{openwindows, settimerpaused, accentclr, setopenwindows, settimerprogress, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink, setaccentclr}} type='settings'/>
                                <Application {...{openwindows, accentclr, setopenwindows, settimerprogress, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink}} type='notes'/>
                                <Application {...{openwindows, accentclr, setopenwindows, settimerprogress, studytimer, setstudytimer, maxtimersecs, setmaxtimersecs, spotifylink, setspotifylink}} type='tasks'/>
                            </div>

                        )
                    }

                </div>
            </Draggable>
        </ConfigProvider>
    )
}