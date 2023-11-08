import { Arrow, Label, Location, LocationO, Logistics, OrdersO, PhoneCircle, PhoneCircleO, Scan, TodoListO, Wechat } from '@react-vant/icons'
import { styled } from 'styled-components'
import { QRCodeCanvas } from 'qrcode.react'

const Container = styled.div`
    display: flex;
    /* flex-direction: column; */
    padding: 20px 15px;
    justify-content: space-between;
    box-sizing: border-box;
    height: 80px;
    background-color: #fff;
    overflow-y: overlay;
    .left{
        .title{
        display: flex;
        align-items: center;
        font-weight: 700;
        /* background-color: #1f1f1f; */
        font-size: 17px;
        /* align-items: baseline; */
        }
        .location{
            display: flex;
            align-items: center;
            color: #a7a7a7;
            font-size: 12px;
        }
        .phone{
            display: flex;
            align-items: center;
            color: #a7a7a7;
            font-size: 12px;
        }
    }
    .right{
        div{
            margin: 0px 3px;
        }
        display: flex;
        align-items: center;
        .describe{
            display: flex;
            flex-direction: column;
            color: #a7a7a7;
            font-size: 12px;
            .highlight{
                /* color: #000; */
            }
            div{
                display: flex;
                align-items: center;
            }
        }
        /* background-color: #1f1f1f; */
        .qrcode{
            /* width: 30px;
            height: 30px; */
            /* color: #e1e1e1; */
        }
    }
`

export function Header() {
    return (
        <Container>
            <div className="left">
                <div className="title">
                    新新二手机（肇庆店）<Arrow />
                </div>
                <div className="location">
                    <LocationO />距您4.2km
                </div>
            </div>
            <div className="right">
                <div className="qrcode">
                    <QRCodeCanvas fgColor='#363636' size={30} value='http://45.207.38.55/list' />
                </div>
                <div className="describe">
                    <div>扫一扫，了解实时库存</div>
                    <div>13028809527，微信同号</div>
                    {/* <div><OrdersO /><span className='highlight'>实时库存</span>，可送货上门</div> */}
                    {/* <div className="phone">
                        13028809527 微信同号
                    </div> */}
                </div>
            </div>
        </Container>
    )
}