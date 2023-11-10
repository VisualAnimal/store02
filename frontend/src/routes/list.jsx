import { useQuery } from "@apollo/client"
import { GET_BRANDS_BY_ORDER_NUMBER_DESC, GET_BRAND_AND_PRODUCT } from "../serve/queries";
import { Skeleton, Sticky } from 'react-vant';
import { useState } from "react"
import { Menu } from "../components/menu";
import { styled } from 'styled-components'
import { Card } from "../components/card";
import { Header } from "../components/header";
import { FilterBar } from "../components/filterBar";
import { FilterBarAll } from "../components/filterBarByAll";


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
    `
const Right = styled.div`
        width: 77%;
    `
export default function List() {
    const { loading, error, data } = useQuery(GET_BRANDS_BY_ORDER_NUMBER_DESC)
    const [brand, setBrand] = useState(0)
    const [model, setModel] = useState('')
    const [priceRange, setPriceRange] = useState([])

    return (
        <Container>
            <Sticky>
                <Header />
            </Sticky>
            <Wrapper>
                <Left>
                    <Sticky offsetTop={80}>
                        {loading ? (<Skeleton rowHeight={40} row={10} />) : (
                            <Menu props={{ data, setBrand }} />
                        )}
                    </Sticky>
                </Left>
                <Right>
                    {loading ? (<Skeleton row={10} rowHeight={80} />) : (
                        <div>
                            {brand == 0 ? (
                                <FilterBarAll props={{brand: data.brands[brand], setPriceRange}} />
                            ) : (
                                <FilterBar props={{ brand: data.brands[brand], setModel }}></FilterBar>
                            )}
                            <Card props={{priceRange, brand: data.brands[brand], model }}></Card>
                        </div>
                    )}
                </Right>
            </Wrapper>
        </Container >
    )
}