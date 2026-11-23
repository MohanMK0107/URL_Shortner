export const validateUrl = (url: string): boolean => {
    try {
        const parsedUrl = new URL(url);
        return(["http:","https:"].includes(parsedUrl.protocol) && !!parsedUrl.hostname)
    } catch (error) {
        return false
    }
}