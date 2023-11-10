export const useApi = () => {
    return {
        // request: (
        //     method: string,
        //     path: string,
        //     options: any = {}
        // ): Promise<response> => {
        //     return api(path, method, options);
        // },

        get: (path: string, options: any = {}): Promise<Response> => {
            return api(path, "GET", options);
        },

        post: (path: string, options: any = {}): Promise<Response> => {
            return api(path, "POST", options);
        },

        delete: (path: string, options: any = {}): Promise<Response> => {
            return api(path, "DELETE", options);
        },
    };
};

const api = async (path: string, method: string, options: any): Promise<Response> => {

    const url = fullUrl(path)

    if (options.headers === undefined) {
        options.headers = {};
    }

    if (process.server) {
        options.headers = useRequestHeaders(["cookie", "user-agent"]);
    }

    options.headers["accept"] = "application/json";
    options.headers["referer"] = useRequestURL().origin || "";

    options.method = method

    return $fetch(url, options)

    // const { data } = await useAsyncData(
    //     key,
    //     () => 
    // )

}
const fullUrl = (path: string) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    if (path.startsWith("http://") || path.startsWith("http://")) {
        return path;
    } else if (path.startsWith("/")) {
        return apiUrl + path;
    }

    return apiUrl + "/" + path;
};
