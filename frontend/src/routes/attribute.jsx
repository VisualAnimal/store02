import { useMutation, useQuery } from "@apollo/client";
import { ADD_BRAND, ADD_CAPACITY, ADD_COLOR, ADD_MODEL, ADD_VERSION, GET_ATTRIBUTE, UPDATE_BRAND, UPDATE_CAPACITY, UPDATE_COLOR, UPDATE_MODEL, UPDATE_VERSION } from "../serve/queries";

export default function Attribute() {
    const { loading, error, data } = useQuery(GET_ATTRIBUTE)

    // 增加
    const [createBrand] = useMutation(ADD_BRAND, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [createModel] = useMutation(ADD_MODEL, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [createCapacity] = useMutation(ADD_CAPACITY, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [createColor] = useMutation(ADD_COLOR, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [createVersion] = useMutation(ADD_VERSION, {
        refetchQueries: [GET_ATTRIBUTE]
    })

    // 更新
    const [updateBrand] = useMutation(UPDATE_BRAND, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [updateModel] = useMutation(UPDATE_MODEL, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [updateCapacity] = useMutation(UPDATE_CAPACITY, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [updateColor] = useMutation(UPDATE_COLOR, {
        refetchQueries: [GET_ATTRIBUTE]
    })
    const [updateVersion] = useMutation(UPDATE_VERSION, {
        refetchQueries: [GET_ATTRIBUTE]
    })

    // 增加品牌
    const handleAddBrand = async () => {
        const brand = prompt("新品牌名称:")
        if (brand) {
            const response = await createBrand({
                variables: {
                    name: brand
                }
            })
        }
    }

    // 增加型号
    const handleAddModel = async (brand) => {
        const model = prompt("新型号名称:")
        // console.log(brand);
        if (model) {
            const response = await createModel({
                variables: {
                    name: model,
                    brand
                }
            })
        }
    }

    // 增加容量
    const handleAddCapacity = async (modelId) => {
        const capacity = prompt("新容量名称:")
        // console.log(brand);
        if (capacity) {
            const response = await createCapacity({
                variables: {
                    name: capacity,
                    model: modelId
                }
            })
        }
    }

    // 增加颜色
    const handleAddColor = async (modelId) => {
        const color = prompt("新颜色名称:")
        // console.log(brand);
        if (color) {
            const response = await createColor({
                variables: {
                    name: color,
                    model: modelId
                }
            })
        }
    }

    // 增加版本
    const handleAddVersion = async (modelId) => {
        const version = prompt("新版本名称:")
        if (version) {
            const response = await createVersion({
                variables: {
                    name: version,
                    model: modelId
                }
            })
        }
    }

    // 更新品牌
    const handleUpdateBrand = async (brand) => {
        const brandName = prompt("新品牌名称：", brand.name);
        if (brandName) {
            const response = await updateBrand({
                variables: {
                    name: brandName,
                    brandId: brand.id
                }
            });
        }
    }

    // 更新型号
    const handleUpdateModel = async (model) => {
        const modelName = prompt("新型号名称：", model.name);
        if (modelName) {
            // 使用相应的 GraphQL 变异来更新型号
            // 这里需要创建一个名为 `UPDATE_MODEL` 的 GraphQL 变异
            // 并使用它来更新型号的名称
            // 请确保在你的 queries.js 文件中定义了相应的变异
            const response = await updateModel({
                variables: {
                    name: modelName,
                    modelId: model.id
                }
            });
        }
    }

    // 更新容量
    const handleUpdateCapacity = async (capacity) => {
        const capacityName = prompt("新容量名称：", capacity.name);
        console.log(capacity);
        if (capacityName) {
            // 使用相应的 GraphQL 变异来更新容量
            // 这里需要创建一个名为 `UPDATE_CAPACITY` 的 GraphQL 变异
            // 并使用它来更新容量的名称
            // 请确保在你的 queries.js 文件中定义了相应的变异
            const response = await updateCapacity({
                variables: {
                    name: capacityName,
                    capacityId: capacity.id
                }
            });
        }
    }

    // 更新颜色
    const handleUpdateColor = async (color) => {
        const colorName = prompt("新颜色名称：", color.name);
        if (colorName) {
            // 使用相应的 GraphQL 变异来更新颜色
            // 这里需要创建一个名为 `UPDATE_COLOR` 的 GraphQL 变异
            // 并使用它来更新颜色的名称
            // 请确保在你的 queries.js 文件中定义了相应的变异
            const response = await updateColor({
                variables: {
                    name: colorName,
                    colorId: color.id
                }
            });
        }
    }

    // 更新版本
    const handleUpdateVersion = async (version) => {
        const versionName = prompt("新版本名称：", version.name);
        if (versionName) {
            // 使用相应的 GraphQL 变异来更新版本
            // 这里需要创建一个名为 `UPDATE_VERSION` 的 GraphQL 变异
            // 并使用它来更新版本的名称
            // 请确保在你的 queries.js 文件中定义了相应的变异
            const response = await updateVersion({
                variables: {
                    name: versionName,
                    versionId: version.id
                }
            });
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data.brands);

    return (
        <div>
            <button onClick={handleAddBrand}>新增品牌</button>
            <ul>{
                data.brands.map(brand => (
                    <li onClick={(e) => { handleUpdateBrand(brand), e.stopPropagation() }} key={brand.id}>{brand.name}{' '}
                        <button onClick={(e) => { handleAddModel(brand.id), e.stopPropagation() }}>增加型号</button>
                        <ul>{brand.models.map(model => (
                            <li onClick={(e) => { handleUpdateModel(model), e.stopPropagation() }} key={model.id}>{model.name}
                                <span onClick={(e) => e.stopPropagation()}>容量：</span>
                                {model.capacities.length ? (
                                    model.capacities.map(capacity => (
                                        <span onClick={(e) => { handleUpdateCapacity(capacity), e.stopPropagation() }} style={{ backgroundColor: "gold", marginRight: 5 }} key={capacity.id}>{capacity.name}</span>
                                    ))
                                ) : '空'}
                                <button onClick={(e) => { handleAddCapacity(model.id), e.stopPropagation() }}>+</button>
                                <span onClick={(e) => e.stopPropagation()}>颜色：</span>
                                {model.colors.length ? (
                                    model.colors.map(color => (
                                        <span onClick={(e) => { handleUpdateColor(color), e.stopPropagation() }} style={{ backgroundColor: "gold", marginRight: 5 }} key={color.id}>{color.name}</span>
                                    ))
                                ) : '空'}
                                <button onClick={(e) => { handleAddColor(model.id), e.stopPropagation() }}>+</button>
                                <span onClick={(e) => e.stopPropagation()}>版本：</span>
                                {model.versions.length ? (
                                    model.versions.map(version => (
                                        <span onClick={(e) => { handleUpdateVersion(version), e.stopPropagation() }} style={{ backgroundColor: "gold", marginRight: 5 }} key={version.id}>{version.name}</span>
                                    ))
                                ) : '空'}
                                <button onClick={(e) => { handleAddVersion(model.id), e.stopPropagation() }}>+</button>
                            </li>
                        ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}