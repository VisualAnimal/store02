import { from, useQuery } from '@apollo/client';
import React from 'react';
import { Empty, Image } from 'react-vant';
import { GET_ALL_PRODUCTS_DESC, GET_ALL_PRODUCTS_DESC_AND_PRICE_0_TO_1000, GET_ALL_PRODUCTS_DESC_AND_PRICE_1000_TO_3000, GET_ALL_PRODUCTS_DESC_AND_PRICE_3000_TO_5000, GET_ALL_PRODUCTS_DESC_AND_PRICE_5000_PLUS, GET_PRODUCTS_BY_BRAND_AND_MODEL_DESC, GET_PRODUCTS_BY_BRAND_DESC } from '../serve/queries';
import { styled } from 'styled-components'

const Container = styled.div`
        margin-left: 10px;
        .describe{

        }
        .item{
            display: flex;
            justify-content: space-evenly;
        }
    `

const Row = styled.div`
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        justify-content: space-between;
        padding: 5px;
        font-size: medium;
        .left{
            display: flex;
            .img{
                margin-right: 5px;
            }
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
    const { brand, model, priceRange } = props

    let loading, error, data;
    if (priceRange.length) {
        // 价格区间1的商品
        if (priceRange[0] == '1') {
            console.log(1);
            const result = useQuery(GET_ALL_PRODUCTS_DESC_AND_PRICE_0_TO_1000)
            loading = result.loading;
            error = result.error;
            data = result.data;
        }
        // 价格区间2的商品
        if (priceRange[0] == '2') {
            console.log(2);
            const result = useQuery(GET_ALL_PRODUCTS_DESC_AND_PRICE_1000_TO_3000)
            loading = result.loading;
            error = result.error;
            data = result.data;
        }
        // 价格区间3的商品
        if (priceRange[0] == '3') {
            console.log(3);
            const result = useQuery(GET_ALL_PRODUCTS_DESC_AND_PRICE_3000_TO_5000)
            loading = result.loading;
            error = result.error;
            data = result.data;
        }
        // 价格区间4的商品
        if (priceRange[0] == '4') {
            const result = useQuery(GET_ALL_PRODUCTS_DESC_AND_PRICE_5000_PLUS)
            loading = result.loading;
            error = result.error;
            data = result.data;
        }
    } else {
        if (brand.id === 'clost30ra0000mgq50lv3wx1h') {
            // 全部商品
            // console.log(brand.id);
            if (brand.id == 'clost30ra0000mgq50lv3wx1h') {
                console.log('全部商品');
                const result = useQuery(GET_ALL_PRODUCTS_DESC)
                // 从结果中获取 loading, error, 和 data
                loading = result.loading;
                error = result.error;
                data = result.data;
            }
        }


        // 根据品牌获取商品
        if (brand.id && !model && brand.id !== 'clost30ra0000mgq50lv3wx1h' && priceRange.length == 0) {
            console.log('根据品牌获取商品');

            const result = useQuery(GET_PRODUCTS_BY_BRAND_DESC, {
                variables: {
                    brand: brand.id
                }
            })
            // 从结果中获取 loading, error, 和 data
            loading = result.loading;
            error = result.error;
            data = result.data;
        }

        // 根据品牌和型号获取商品
        if (brand.id && model && brand.id !== 'clost30ra0000mgq50lv3wx1h') {
            console.log('根据品牌和型号获取商品');

            const result = useQuery(GET_PRODUCTS_BY_BRAND_AND_MODEL_DESC, {
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
    }



    return (
        <Container>{
            loading ? (<div></div>) : (
                data.products.length ? (
                    data.products.map(product => (
                        <Row key={product.id}>
                            <div className="left">
                                <div className="img">
                                    <Image fit='contain' width={40} height={40} src={product.color.picture} />
                                </div>
                                <div className="info"><div className="title">
                                    <span className='model'>{product.model.name}</span>
                                    <span className='model'>{product.capacity.name}</span>
                                    <span className='model'>{product.color.name}</span>
                                    <span className='model'></span>
                                </div>
                                    <div className="description">
                                        <span>{product.version.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <span className='price'>{`￥${parseInt(product.price) + 100}`}</span>
                            </div>
                        </Row>
                    ))
                ) : (
                    <Empty description="暂时没有了"></Empty>
                )
            )
        }
        </Container >
    );
};