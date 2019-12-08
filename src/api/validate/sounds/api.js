import Api from '../api_base';
import xhr from '../xhr';
import * as validate from './validate';
import { API_URL } from '../urls';

class Sounds extends Api {

    constructor(user) {
        super();
        this._fileName = '';
        this.user = user;
        this.state = {};
    }

    get audioFile() {
        return this._audioFile;
    }

    set audioFile(a) {
        this._audioFile = a;
        if (this._fileName) this._audioFile.fileName = this._fileName;
    }
    
    create() {
    }

    upload(fileName) {
        this.audioFile.fileName = fileName;
        console.info('audioFile: ', this.audioFile);
        var formData = new FormData();
        formData.append('audio_file', this.audioFile, fileName);
        formData.append('fingering_id', this.bin);
        return xhr("POST", API_URL + 'upload', formData, { user: this.user })
            .then(() => {
                alert('uploaded');
            })
            .catch(status => alert('Error uploading file: ', status));
    }

    read() {
    }

    update() {
    }

    delete() {
    }

}

export default Sounds;
