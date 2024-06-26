import 'dotenv/config';

export default class CompanyService {

    async outletStatus() {
        const res = await fetch(`http://192.168.4.31:8060/outlet-status`, {
            method: "GET",
            mode: "cors",
            apiKey: process.env.GR_SERVER_API_KEY
        });
        const data = await res.json();
        return data;
    }

    async cycleOutletOnOff(time) {
        const res = await fetch(`http://192.168.4.31:8060/cycle-outlet/on-off?time=${time}`, {
            method: "GET",
            mode: "cors",
            apiKey: process.env.GR_SERVER_API_KEY
        });
        const data = await res.json();
        return data;
    }
}