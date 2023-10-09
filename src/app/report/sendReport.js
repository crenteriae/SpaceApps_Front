import axios from "axios";

const sendReport = async (long, lat, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://flamefox.azurewebsites.net/api/images",
      formData
    );
    //console.log(response.data.resourceId)
    const imageId = response.data.resourceId;
    const responseSec = await axios.post(
      "https://flamefox.azurewebsites.net/api/report",
      {
        longitude: long,
        latitude: lat,
        imageId: imageId,
      }
    );
    console.log(responseSec.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default sendReport;
