import { useState } from "react";
import { Sidebar, Card } from "react-vant";
import { styled } from 'styled-components'

const Wrapper = styled.div`
    --rv-sidebar-width:100vw;
    /* --rv-sidebar-selected-border-height:10px; */
    --rv-sidebar-line-height: 13px;
`

export function Menu({props}) {
    // console.log(props);
    const {data, getMenuChecked} = props
    // console.log(data);
    // return
    // const [items, getMenuChecked] = props
    // console.log(items);

    const [active, setActive] = useState(0);

    return (
        <Wrapper>
            <Sidebar
                value={active}
                onChange={(v) => {
                    setActive(v)
                    getMenuChecked(v)
                    // console.log(v);
                    // Toast.info(`标签名 ${v + 1}`);
                }}
            >
                {data.brands.map(brand => (
                    <Sidebar.Item key={brand.id} title={brand.name} >
                        {/* {item.products.map(product => (
                            // <Card key={product.id} items={product}>{product.model}</Card>
                            <div>22</div>
                        ))} */}
                    </Sidebar.Item>
                ))}
                {/* <Sidebar.Item title="标签名2" />
            <Sidebar.Item title="标签名3" /> */}
            </Sidebar>
        </Wrapper>
    )
}