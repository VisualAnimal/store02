import { useMutation, useQuery } from "@apollo/client"
import { ADD_PRODUCT, GET_ATTRIBUTE } from "../serve/queries"
import { Picker } from 'react-vant'

export default function Product() {
    const { loading, error, data } = useQuery(GET_ATTRIBUTE)
    const [createProduct] = useMutation(ADD_PRODUCT)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const columns = (model) => {
        return model.capacities.map(capacity => ({
            text: capacity.name,
            value: capacity.id,
            children: model.colors.map(color => ({
                text: color.name,
                value: color.id,
                children: model.versions.map(version => ({
                    text: version.name,
                    value: version.id
                }))
            }))
        }))
    }

    // 添加商品
    const handleAddProduct = async ({ val, brand, model }) => {
        const price = prompt("价格：")
        if (price) {
            const response = await createProduct({
                variables: {
                    brandId: brand.id,
                    modelId: model.id,
                    capacityId: val[0],
                    colorId: val[1],
                    versionId: val[2],
                    price:parseInt(price)
                }
            })
        }
    }

    return (
        <div>
            <ul>{data.brands.map(brand => (
                <li key={brand.id}>{brand.name}
                    <ul>{brand.models.map(model => (
                        <li style={{marginLeft:"50px"}} key={model.id}>
                            {model.name}{' '}
                            <Picker popup={{ round: true }} title='选择配置' columns={columns(model)} onConfirm={(val) => handleAddProduct({ val, brand, model })}>{(val, _, actions) => {
                                return (
                                    <button onClick={() => actions.open()}>选择</button>
                                )
                            }}
                            </Picker>
                        </li>
                    ))}</ul>
                </li>
            ))}</ul>
        </div>
    )
}