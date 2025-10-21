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

    try {
        console.log('Fetching from API');
        const response = await axios.get('https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722', {
            params: {
                'api-key': process.env.API_KEY,
                'format': 'json',
                'filters[state_name]': state_name,
                'filters[fin_year]': fin_year,
                'filters[district_name]': district_name,
            }
        });

        myCache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});