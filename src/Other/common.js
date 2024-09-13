import axios from "axios";

const GettData = async () => {
    try {
        const responce = await axios.get("https://www.reddit.com/r/javascript/new.json");
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GettData };