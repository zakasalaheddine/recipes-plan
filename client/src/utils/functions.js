import axios from 'axios';

export async function uploadFile(file){
    try {
        const data = new FormData();
        data.append('file', file);
        const result = await axios.post('http://localhost:9000/upload', data);
        return await result.data;
    } catch (err) {
        throw err;
    }
}