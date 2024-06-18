// utilities/getScreenSize.ts
const getScreenSize = (width: number): string => {
    if (width < 600) {
        return "small";
    } else if (width >= 600 && width < 1200) {
        return "medium";
    } else {
        return "large";
    }
}

export default getScreenSize;
