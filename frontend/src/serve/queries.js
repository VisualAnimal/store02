import { gql } from "@apollo/client";

// 属性
export const GET_ATTRIBUTE = gql`
    query GetAttribute {
        brands(orderBy: {updateAt: desc}){
            id
            name 
            models{
                id 
                name 
                capacities{
                    id 
                    name
                } 
                colors{
                    id 
                    name
                } 
                versions{
                    id 
                    name
                }
            }
        }
    }
`

// 品牌
export const GET_BRAND_AND_PRODUCT = gql`
    query GetBrandAndProduct{
        brands{
            id
            name
            products{
                id
                brand{id name}
                model{id name}
                capacity{id name}
                color{id name}
                version{id name}
                price
            }
        }
    }
`
export const ADD_BRAND = gql`
    mutation CreateBrand($name: String){
        createBrand(data: {name: $name}){
            id
            name
        }
    }
`

export const UPDATE_BRAND = gql`
    mutation UpdateBrand($name: String, $brandId: ID){
        updateBrand(data: {name: $name}, where:{id: $brandId}){
            id
            name
        }
    }
`

// 型号
export const ADD_MODEL = gql`
    mutation CreateModer($name: String, $brand: ID){
        createModel(data: {name: $name, brand: {connect: {id: $brand}}}){
            id
            name
        }
    }
`

export const UPDATE_MODEL = gql`
    mutation UpdateModel($name: String, $modelId: ID){
        updateModel(data: {name: $name}, where: {id: $modelId}){
            id
            name
        }
    }
`

// 容量
export const ADD_CAPACITY = gql`
    mutation CreateCapacity($name: String, $model: ID){
        createCapacity(data: {name: $name, model: {connect: {id: $model}}}){
            id
            name
        }
    }
`

export const UPDATE_CAPACITY = gql`
    mutation UpdateCapacity($name: String, $capacityId: ID){
        updateCapacity(data: {name: $name}, where: {id: $capacityId}){
            id
            name
        }
    }
`

// 颜色 
export const ADD_COLOR = gql`
    mutation CreateColor($name: String, $model: ID){
        createColor(data: {name: $name, model: {connect: {id: $model}}}){
            id
            name
        }
    }
`

export const UPDATE_COLOR = gql`
    mutation UpdateColor($name: String, $colorId: ID){
        updateColor(data: {name: $name}, where: {id: $colorId}){
            id
            name
        }
    }
`

// 版本
export const ADD_VERSION = gql`
    mutation CreateVersion($name: String, $model: ID){
        createVersion(data: {name: $name, model: {connect: {id: $model}}}){
            id
            name
        }
    }
`

export const UPDATE_VERSION = gql`
    mutation UpdateVersion($name: String, $versionId: ID){
        updateVersion(data: {name: $name}, where: {id: $versionId}){
            id
            name
        }
    }
`

// 商品
export const ADD_PRODUCT = gql`
    mutation CreateProduct($brandId: ID, $modelId: ID, $capacityId: ID, $colorId: ID, $versionId: ID, $price: String){
        createProduct(data: {
            brand: {connect: {id: $brandId}}, 
            model: {connect: {id: $modelId}}, 
            capacity:{connect: {id: $capacityId}}, 
            color: {connect: {id: $colorId}}, 
            version: {connect: {id: $versionId}}, 
            price: $price
        }){
            id
            name
        }
    }
`