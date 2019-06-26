function request(method) {
    const getAuthHeader = () => {
        const token = window.localStorage.getItem('token');
        return (token)
            ? {'Authorization': `Bearer ${token}`}
            : {}
    };


    return async (url, data, isFormData, options) => {
        const authHeader = getAuthHeader();
        const contentType = isFormData ? {} : {'Content-Type': 'application/json'};
        const body = isFormData ? {'body': data} : {'body': JSON.stringify(data)};
        const response = await fetch(url, {
            method,
            'headers': {
                ...contentType,
                'Accept': 'application/json',
                ...authHeader
            },
            ...body,
            ...options
        });

        return response.json();
    };
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('remove');
