import 'dotenv/config';

export default class CompanyService {

    async outletStatus() {
        try {
            const res = await fetch(`http://192.168.4.31:8060/outlet-status`, {
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
            console.log('There was an error getting GR Server Outlet Status: ', err);
        }
    }

    async cycleOutletOnOff(time) {
        try {
            const res = await fetch(`http://192.168.4.31:8060/cycle-outlet/on-off?time=${time}`, {
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
            console.log('There was an error sending GR Server Outlet Cycle: ', err);
        }
    }
}