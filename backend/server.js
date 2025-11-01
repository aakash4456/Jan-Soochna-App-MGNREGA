const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize cache with a TTL of 1 hour (3600 seconds)
const myCache = new NodeCache({ stdTTL: 3600 });

app.use(cors());

app.get('/api/data', async (req, res) => {
    const { state_name, fin_year, district_name } = req.query;
    const cacheKey = `${state_name}_${fin_year}_${district_name}`;

    if (myCache.has(cacheKey)) {
        console.log('Serving from cache');
        return res.json(myCache.get(cacheKey));
    }
    console.log("backend hit by fetch button");
    

    try {
        console.log('Fetching from API');
        const response = await axios.get('https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722', {
            params: {
                'api-key': process.env.API_KEY,
                'format': 'json',
                'filters[state_name]': state_name,
                'filters[fin_year]': fin_year,
                // 'filters[district_name]': district_name,
            }
        });

        myCache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


// ask for geo location
app.get('/api/location-from-coords', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    try {
        console.log('Fetching location from Nominatim');
        const response = await axios.get(nominatimUrl, {
            headers: {
                // Per Nominatim's usage policy, a custom User-Agent is recommended.
                'User-Agent': 'JanSoochnaApp/1.0 (your-email@example.com)' 
            }
        });

        const address = response.data.address;
        
        // Nominatim's response can vary. We look for state and district/county.
        // The district might be called 'state_district' or 'county'.
        const locationData = {
            state: address.state,
            district: address.state_district || address.county
        };
        
        res.json(locationData);

    } catch (error) {
        console.error('Nominatim API error:', error.message);
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});