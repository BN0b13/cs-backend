
class GRServerRepository {

    // Read

    async health() {
        const res = await fetch('http://192.168.4.31:8060');
        const data = await res.json();
        return data;
    }
}

export default GRServerRepository;