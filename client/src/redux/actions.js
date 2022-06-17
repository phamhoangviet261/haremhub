export const changeUsername = (name) => {
    // console.log("name", name)
    return {
        type: 'changeUsername',
        payload: name
    }
}