

export default class CompanyService {

    async activatePumps(time) {
        const params = time ? `?time=${time}` : '';
        const res = await fetch(`http://192.168.4.31:8060/pumps${params}`);
        const data = await res.json();
        return data;
    }
}