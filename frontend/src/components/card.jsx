import { from, useQuery } from '@apollo/client';
import React from 'react';
import { ProductCard, Tag, Button, Empty, Skeleton } from 'react-vant';
import { GET_PRODUCTS_BY_BRAND, GET_PRODUCTS_BY_BRAND_AND_MODEL } from '../serve/queries';
import { styled } from 'styled-components'

const Container = styled.div`
        margin-left: 10px;
        /* --rv-product-card-font-size:var(--rv-font-size-lg); */
        /* --rv-product-card-title-line-height:30px; */
        /* --rv-product-card-desc-color:#dbdbdb; */
        /* --rv-product-card-background-color: #fff; */
        /* --rv-product-card-padding:0px */
        .describe{
            /* font-size: 10; */
        /* --rv-product-card-font-size:var(--rv-font-size-sm) */

        }
    `

export function Card({ props }) {
    // console.log(props);
    const { brand } = props
    const { model } = props
    // console.log(brand);
    // console.log(model);
    // return

    let loading, error, data;

    if (brand.id && !model) {
        const result = useQuery(GET_PRODUCTS_BY_BRAND, {
            variables: {
                brand: brand.id
            }
        })
        // 从结果中获取 loading, error, 和 data
        loading = result.loading;
        error = result.error;
        data = result.data;
    }

    if (brand.id && model) {
        // console.log(2);
        const result = useQuery(GET_PRODUCTS_BY_BRAND_AND_MODEL, {
            variables: {
                brand: brand.id,
                model: model
            }
        })
        // 从结果中获取 loading, error, 和 data
        loading = result.loading;
        error = result.error;
        data = result.data;
    }

    return (
        <Container>{
            loading ? (<div></div>) : (
                data.products.length ? (
                    data.products.map(product => (
                        <ProductCard
                            key={product.id}
                            // num="2"
                            price={parseInt(product.price) + 100}
                            desc={
                                <>
                                    <span className='describe'>
                                        {`${product.capacity.name} ${product.color.name} ${product.version.name}`}
                                    </span>
                                </>
                            }
                            title={`${product.model.name}`}
                            thumb={product.color.picture ? product.color.picture : "https://img.yzcdn.cn/vant/ipad.jpeg"}
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