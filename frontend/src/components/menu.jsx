import { useState } from "react";
import { Sidebar, Card } from "react-vant";
import { styled } from 'styled-components'

const Wrapper = styled.div`
    --rv-sidebar-width:100vw;
    --rv-sidebar-line-height: 13px;
`

export function Menu({props}) {
    const {data, setBrand} = props

    const [active, setActive] = useState(0);

    // console.log(active);
    return (
        <Wrapper>
            <Sidebar
                value={active}
                onChange={(v) => {
                    setActive(v)
                    setBrand(v)
                }}
            >
                {data.brands.map(brand => (
                    <Sidebar.Item key={brand.id} title={brand.name} />
                ))}
            </Sidebar>
        </Wrapper>
    )
}