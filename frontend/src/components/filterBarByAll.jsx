import { Button, Picker, Selector, Sticky, Tag } from 'react-vant'
import { styled } from 'styled-components'
import { ArrowDown, Search as SearchIcon } from '@react-vant/icons'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MODELS_BY_BRAND } from '../serve/queries'

const Wrapper = styled.div`
    display: flex;
    background-color: #fff;
    height: 35px;
    align-items: center;
    padding: 0px 10px;
    justify-content: right;
`

const Search = styled.div`
    display: flex;
    width: 50px;
    font-size: 13px;
    align-items: center;
    .icon{
        font-size: 8px;
    }
`

export function FilterBarAll({ props }) {
    // 传入品牌时，先清空已选价格区间
    useEffect(() => {
        return () => {
            props.setPriceRange([])
        }
    }, [props.brand.id])
    // console.log(props);
    const { setPriceRange } = props

    const options = [
        {
            label: '千元机',
            value: '1',
        },
        {
            label: '1~3千',
            value: '2',
        },
        {
            label: '3~5千',
            value: '3',
        },
        {
            label: '5千+',
            value: '4',
        },
    ]
    return (
        <Sticky offsetTop={80}>
            <Wrapper>
                {/* <Tag size='medium' type='success'>22</Tag> */}
                <Selector
                    style={{ '--rv-selector-padding': '2px 2px', }}
                    showCheckMark={false}
                    options={options}
                    // defaultValue={['1']}
                    onChange={setPriceRange}
                />
            </Wrapper>
        </Sticky>
    )
}