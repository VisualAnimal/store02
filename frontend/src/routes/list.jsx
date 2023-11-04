import { useQuery } from "@apollo/client"
import { GET_BRAND_AND_PRODUCT } from "../serve/queries";
import './style.css'
import { ProductCard, Sidebar, SidebarItem } from 'react-vant';
import { Location, Phone } from "@react-vant/icons"
import { useState } from "react"


export default function List() {
    const { loading, error, data } = useQuery(GET_BRAND_AND_PRODUCT)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    console.log(data);

    return (
        <div>
            <Header />
            <Menu items={data.brands} />
            {/* <ul>{data.brands.map(brand => (
                <li>{brand.name}</li>
            ))}</ul> */}
        </div>
    )
}

export function Header() {
    return (
        < div >
            <div className="container">
                <div className="left">
                    <span className="title">新新二手机(好世界店)</span>
                    <span className="location"></span>

                    <div className="description">
                        <span className="location"><Location /> 距离4.2km</span>
                        <span className="location"><Phone />13028809527 微信同步</span>
                    </div>
                </div>
                <div className="right">
                </div>
            </div>
            {/* <!-- <div className="tab">
        <van-tabs v-model:active="active" type="line" animated>
            <van-tab title="🛵配送"></van-tab>
            <van-tab title="🚚快递"></van-tab>
        </van-tabs>
    </div> --> */}
        </div >
    )

}

export function Menu({ items }) {
    // console.log(items);
    const [active, setActive] = useState(0);

    return (
        <Sidebar
            value={active}
            onChange={(v) => {
                setActive(v);
                // Toast.info(`标签名 ${v + 1}`);
            }}
        >
            {items.map(item => (
                <Sidebar.Item key={item.id} title={item.name} >
                    {item.products.map(product => (
                        <Card key={product.id} items={product}>{product.model}</Card>
                    ))}
                </Sidebar.Item>
            ))}
            {/* <Sidebar.Item title="标签名2" />
            <Sidebar.Item title="标签名3" /> */}
        </Sidebar>
    )
}

export function Card({ items }) {
    console.log('ddd', items);
    return (
        <ProductCard
            price={parseInt(items.price)+100}
            desc="描述信息"
            title={`${items.brand.name} ${items.model.name} ${items.capacity.name} ${items.version.name} ${items.color.name}`}
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
    )
}