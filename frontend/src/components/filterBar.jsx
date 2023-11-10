import { Button, Picker, Sticky, Tag } from 'react-vant'
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
    /* color: #a7a7a7; */
    .icon{
        font-size: 8px;
    }
    /* right: 0px; */
`

export function FilterBar({ props }) {
    // console.log(props);
    // console.log(value);
    const [model, setModel] = useState('')

    // 传入品牌时，先清空已选型号
    useEffect(() => {
        setModel('')
        return () => {
            props.setModel('')
        }
    }, [props.brand.id])

    const { id, name } = props.brand
    const { loading, error, data } = useQuery(GET_MODELS_BY_BRAND, {
        variables: {
            brand: id
        }
    })

    if (loading) {
        return
    }

    const models = data.models.map(model => {
        return {
            text: model.name,
            value: model.id
        }
    })
    // console.log(models);
    return (
        <Sticky offsetTop={80}>
            <Wrapper>
                <Picker
                    visibleItemCount={12}
                    popup={{
                        round: true,
                    }}
                    // value={models}
                    title="选择型号"
                    columns={models}
                    onConfirm={e => {
                        props.setModel(e)
                        setModel(models.find(item => item.value == e).text)
                        // console.log(models.find(item => item.value == e).text)
                    }}
                >
                    {(val, _, actions) => {
                        return (
                            <div>
                                <Search onClick={() => actions.open()}>
                                    型号
                                    <ArrowDown className='icon' />
                                </Search>
                            </div>
                        )
                    }}
                </Picker>
                <Tag
                    type='success'
                    size='mediumn'
                    show={model}
                    closeable
                    onClose={() => {
                        setModel('')
                        props.setModel('')
                    }}
                >
                    {model}
                    {/* {console.log(models.find(item => item.value == model))} */}
                </Tag>
            </Wrapper>
        </Sticky>
    )
}