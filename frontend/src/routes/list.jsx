import { useQuery } from "@apollo/client"
import { GET_BRAND_AND_PRODUCT } from "../serve/queries";
// import './style.css'
import { ProductCard, Sidebar, SidebarItem, Skeleton, Sticky } from 'react-vant';
import { Location, Phone } from "@react-vant/icons"
import { useState } from "react"
import { Menu } from "../components/menu";
import { styled } from 'styled-components'
import { Card } from "../components/card";
import { Header } from "../components/header";
import { FilterBar } from "../components/filterBar";


const Container = styled.div`
        height: 100vh;
    `

const Wrapper = styled.div`
        display: flex;
    `
const Left = styled.div`
        background-color:var(--rv-background-color-light);
        width: 23%;
        height: 100vh;
        /* overflow-y: scroll; */
        /* overflow-y: hidden; */
        /* overflow-y: auto; */
    `
const Right = styled.div`
        width: 77%;
        /* background-color: #fff111; */
    `
export default function List() {
    const { loading, error, data } = useQuery(GET_BRAND_AND_PRODUCT)
    const [brand, setBrand] = useState(0)
    const [model, setModel] = useState('')
    // console.log(model);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error : {error.message}</p>;
    // console.log(data);

    const getMenuChecked = (val) => {
        // console.log(val);
        setBrand(val)
    }

    const modelSelect = (model) => {
        console.log(model);
    }
    return (
        <Container>
            <Sticky>
                <Header />
            </Sticky>
            <Wrapper>
                <Left>
                    <Sticky offsetTop={80}>
                        {loading ? (<Skeleton rowHeight={40} row={10} />) : (
                            <Menu props={{ data, getMenuChecked }} />
                        )}
                    </Sticky>
                </Left>
                <Right>
                    {loading ? (<Skeleton row={10} rowHeight={80} />) : (
                        <div>
                            <FilterBar props={{brand: data.brands[brand], setModel}}></FilterBar>
                            <Card props={{brand:data.brands[brand], model}}></Card>
                        </div>
                    )}
                </Right>
                {/* <ul>{data.brands.map(brand => (
                <li>{brand.name}</li>
            ))}</ul> */}
            </Wrapper>
        </Container>
    )
}