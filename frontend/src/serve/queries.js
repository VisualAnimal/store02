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
export const GET_BRANDS_BY_ORDER_NUMBER_DESC = gql`
    query GetBrands{
        brands(orderBy: {orderNumber: desc}){id name}
    }
`
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

export const GET_MODELS_BY_BRAND = gql`
    query GetModelsByBrand($brand:ID){
        models(where: {brand: {id: {equals: $brand}}}){
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

export const GET_ALL_PRODUCTS_DESC = gql`
    query GetAllProducts{
        products(orderBy: {id: desc}){
            id brand{id name} model{id name} capacity{id name} color{id name picture} version{id name} price
        }
    }
`

export const GET_ALL_PRODUCTS_DESC_AND_PRICE_0_TO_1000 = gql`
    query Products {
        products(orderBy: {id: desc} where: { price: { gte:0, lte: 1000 } }) {
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_ALL_PRODUCTS_DESC_AND_PRICE_1000_TO_3000 = gql`
    query Products {
        products(orderBy: {id: desc} where: { price: { gte:1000, lte: 3000 } }) {
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_ALL_PRODUCTS_DESC_AND_PRICE_3000_TO_5000 = gql`
    query Products {
        products(orderBy: {id: desc} where: { price: { gte:3000, lte: 5000 } }) {
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_ALL_PRODUCTS_DESC_AND_PRICE_5000_PLUS = gql`
    query Products {
        products(orderBy: {id: desc} where: { price: { gte:5000 } }) {
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_PRODUCTS_BY_BRAND = gql`
    query GetProducts($brand: ID){
        products(where: {brand: {id: {equals: $brand}}}){
            id
            brand{id name}
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_PRODUCTS_BY_BRAND_DESC = gql`
    query GetProducts($brand: ID){
        products(
            where: {brand: {id: {equals: $brand}}}
            orderBy: {id: desc}
        ){
            id
            brand{id name}
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_PRODUCTS_BY_BRAND_AND_MODEL = gql`
    query GetProducts($brand: ID, $model:ID){
        products(where: {
            brand: {id: {equals: $brand}}
            model: {id: {equals: $model}}
        }){
            id
            brand{id name}
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`

export const GET_PRODUCTS_BY_BRAND_AND_MODEL_DESC = gql`
    query GetProducts($brand: ID, $model:ID){
        products(
            where: {
                brand: {id: {equals: $brand}}
                model: {id: {equals: $model}}
            }
            orderBy: {id: desc}
        ){
            id
            brand{id name}
            model{id name}
            capacity{id name}
            color{id name picture}
            version{id name}
            price
        }
    }
`