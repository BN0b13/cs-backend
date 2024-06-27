import 'dotenv/config';

class GRServerRepository {

    // Read

    async health() {
        try {
            const res = await fetch('http://192.168.4.31:8060', {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.GR_SERVER_API_KEY
                }
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.log('There was an error getting GR Server Health: ', err);
        }
    }

    async getLogs({ page = '0', size = '10', sortDirection = 'ASC', sortKey = 'createdAt' }) {
        try {
            const res = await fetch(`http://192.168.4.31:8060/logs?page=${page}&size=${size}&sortDirection=${sortDirection}&sortKey=${sortKey}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.GR_SERVER_API_KEY
                }
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.log('There was an error getting GR Server Logs: ', err);
        }
    }

    // DELETE

    async deleteLogById(id) {
        try {
            const res = await fetch(`http://192.168.4.31:8060/logs/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.GR_SERVER_API_KEY
                }
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.log('There was an error deleting GR Server Log By ID: ', err);
        }
    }
}

export default GRServerRepository;