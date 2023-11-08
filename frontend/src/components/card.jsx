import { from, useQuery } from '@apollo/client';
import React from 'react';
import { ProductCard, Tag, Button, Empty, Skeleton } from 'react-vant';
import { GET_PRODUCTS_BY_BRAND } from '../serve/queries';
import { styled } from 'styled-components'

const Container = styled.div`
        margin-left: 10px;
        /* --rv-product-card-background-color: #fff; */
        /* --rv-product-card-padding:0px */
    `

export function Card({ props }) {
    console.log(props);
    const { id } = props
    // return
    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_BRAND, {
        variables: {
            brand: id
        }
    })

    return (
        <Container>{
            loading ? (<Skeleton rowHeight={80} row={10} title />) : (
                data.products.length ? (
                    data.products.map(product => (
                        <ProductCard
                            key={product.id}
                            // num="2"
                            price={parseInt(product.price) + 100}
                            desc="描述信息"
                            title={`${product.model.name} ${product.capacity.name} ${product.color.name} ${product.version.name}`}
                            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                        />
                    ))
                ) : (
                    <Empty description="暂时没有了"></Empty>
                )


            )
        }
        </Container >
    );
};