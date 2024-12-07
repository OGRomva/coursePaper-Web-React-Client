import $api from '../http';

export default class DownloadService {
    static async uploadFiles(formData: FormData) {
        return $api.post('/commit/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}