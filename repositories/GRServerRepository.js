import 'dotenv/config';

class GRServerRepository {

    // Read

    async health() {
        const res = await fetch('http://192.168.4.31:8060', {
            method: "GET",
            mode: "cors",
            apiKey: process.env.GR_SERVER_API_KEY
        });
        const data = await res.json();
        return data;
    }
}

export default GRServerRepository;