export const getFullURL = (file, folderName = '') => {
    switch (folderName) {
        case 'categories':
            return (file && file != '' && file != undefined)
                ? `${process.env.APP_URL}/uploads/categories/${file}`
                : ''
            break;
        case 'products':
            return (file && file != '' && file != undefined)
                ? `${process.env.APP_URL}/uploads/products/${file}`
                : ''
            break;
        case 'userProfile':
            return (file && file != '' && file != undefined)
                ? `${process.env.APP_URL}/uploads/userProfile/${file}`
                : ''
            break;
        default:
            break;
    }

}