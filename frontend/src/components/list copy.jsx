/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { PullRefresh, List, Tabs, Cell } from 'react-vant'
import { GET_PRODUCTS } from '../serve/queries'

// 模拟异步请求
async function getData(throwError) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (throwError) {
                reject(new Error('error'))
            }
            resolve(Array.from({ length: 10 }, (_, i) => i))
        }, 2000)
    })
}

// 基础用法
export const BaseDemo = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS)
    const [list, setList] = useState([])
    const [finished, setFinished] = useState(false)

    const onLoad = async () => {
        const data = await getData()
        setList(v => [...v, ...data])
        if (list.length >= 30) {
            setFinished(true)
        }
    }
    return (
        loading ? 'loading...' : (
            <List finished={finished} onLoad={onLoad}>
                {/* {data.products.map(product => (
                    <>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                        <Cell title={product.brand.name}></Cell>
                    </>
                ))} */}
                {list.map((_, i) => (
                    <Cell key={i} title={i + 1} />
                ))}
            </List>
        )

    )
}

// 错误提示
// const ErrorDemo = () => {
//   const [list, setList] = useState<Array<number>>([])
//   const [finished, setFinished] = useState<boolean>(false)
//   const [count, setCount] = useState(0)

//   const onLoad = async () => {
//     setCount(v => v + 1)
//     const data = await getData(count === 1)
//     setList(v => [...v, ...data])
//     if (list.length >= 30) {
//       setFinished(true)
//     }
//   }

//   return (
//     <List
//       finished={finished}
//       errorText='请求失败，点击重新加载'
//       onLoad={onLoad}
//     >
//       {/* 若 onLoad 抛出错误，将显示错误提示，用户点击错误提示后会重新触发 onLoad 事件 */}
//       {list.map((_, i) => (
//         <Cell key={i} title={i + 1} />
//       ))}
//     </List>
//   )
// }

// // 下拉刷新
// const PullRefreshDemo = () => {
//   const [list, setList] = useState<Array<number>>([])
//   const [finished, setFinished] = useState<boolean>(false)

//   const onLoadRefresh = async (isRefresh) => {
//     const data = await getData()
//     setList(v => {
//       const newList = isRefresh  data : [...v, ...data]
//       if (newList.length >= 30) {
//         setFinished(true)
//       }
//       return newList
//     })
//   }

//   const onRefresh = async () => {
//     setFinished(false)
//     await onLoadRefresh(1)
//   }

//   return (
//     <PullRefresh onRefresh={onRefresh}>
//       {/* List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果 */}
//       <List finished={finished} onLoad={onLoadRefresh}>
//         {list.map((_, i) => (
//           <Cell key={i} title={i + 1} />
//         ))}
//       </List>
//     </PullRefresh>
//   )
// }

// export default () => (
//   <div className='demo-list'>
//     <Tabs sticky>
//       <Tabs.TabPane title='基本用法'>
//         <BaseDemo />
//       </Tabs.TabPane>
//       <Tabs.TabPane title='错误提示'>
//         <ErrorDemo />
//       </Tabs.TabPane>
//       <Tabs.TabPane title='下拉刷新'>
//         <PullRefreshDemo />
//       </Tabs.TabPane>
//     </Tabs>
//   </div>
// )
