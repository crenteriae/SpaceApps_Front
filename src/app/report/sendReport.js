import axios from "axios";

const sendReport = async (long, lat, file) => {
    const fn = file.name;
    const reader = new FileReader();
        reader.onloadend = () => {
        // Use a regex to remove data url part
        const base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');
        console.log(base64String);
        }
        reader.readAsDataURL(file)
    try{
        const response = axios.post('https://flamefox.azurewebsites.net/api/report', {
            longitude: long,
            latitude: lat,
            imageName: fn,
            imageData: base64String,
        })
        console.log(response.data)
    }
    catch(error){
        console.error(error);
    }
}

export default sendReport