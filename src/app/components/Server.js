const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/fires', async (req, res) => {
    try {
        const response = await axios.get('https://firms.modaps.eosdis.nasa.gov/api/area/csv/9ca42945d74cab06b773ce38a4735446/VIIRS_SNPP_NRT/world/1/2023-10-07');
        const csvData = response.data;
        const jsonData = convertCSVtoJSON(csvData);
        res.json(jsonData);
    } catch (error) {
        res.status(500).send('Error al obtener los datos.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${3001}`);
});ç

function convertCSVtoJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }
    return result; 
}
