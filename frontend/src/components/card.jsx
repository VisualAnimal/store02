import { from, useQuery } from '@apollo/client';
import React from 'react';
import { ProductCard, Tag, Button, Empty, Skeleton, Cell } from 'react-vant';
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
        .item{
            display: flex;
            justify-content: space-evenly;
            /* background-color: #1f1f;
            font-size:20px; */
        }
    `

    const Row = styled.div`
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        justify-content: space-between;
        padding: 5px;
        font-size: medium;
        .left{
            .description{
                color: #a1a1a1;
                font-size: small;
            }
            span{
                margin-right: 5px;
            }
        };
        .right{
            display: flex;
            align-items: center;
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
                        <Row>
                            <div className="left">
                                <div className="title">
                                    <span className='model'>{product.model.name}</span>
                                    <span className='model'>{product.capacity.name}</span>
                                    <span className='model'>{product.color.name}</span>
                                    <span className='model'></span>
                                </div>
                                <div className="description">
                                    <span>{product.version.name}</span>
                                </div>
                            </div>
                            <div className="right">
                                <span className='price'>{`￥${parseInt(product.price)+100}`}</span>
                            </div>
                        </Row>
                        // <Cell.Group>
                        //     <Cell label={`${product.color.name} ${product.version.name}`} value={`￥${product.price}`} title={`${product.model.name} ${product.capacity.name}`} />
                        // </Cell.Group>
                        // <div className='item'>
                        //     <span className='model'>{product.model.name}</span>
                        //     <span className='capacity'>{product.capacity.name}</span>
                        //     <span className='color'>{product.color.name}</span>
                        // </div>
                        // <ProductCard
                        //     key={product.id}
                        //     // num="2"
                        //     price={parseInt(product.price) + 100}
                        //     desc={
                        //         <>
                        //             <span className='describe'>
                        //                 {`${product.capacity.name} ${product.color.name} ${product.version.name}`}
                        //             </span>
                        //         </>
                        //     }
                        //     title={`${product.model.name}`}
                        //     thumb={product.color.picture ? product.color.picture : "https://img.yzcdn.cn/vant/ipad.jpeg"}
                        // />
                    ))
                ) : (
                    <Empty description="暂时没有了"></Empty>
                )


            )
        }
        </Container >
    );
};