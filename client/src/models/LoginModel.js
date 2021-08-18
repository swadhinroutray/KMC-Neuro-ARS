import { observable, action, makeObservable } from 'mobx';
import { post } from '../utils/api'

class LoginModel {
    constructor() {
        makeObservable(this, {
            formData: observable,
            loggedIn: observable,
            isLoading: observable,
            setField: action,
            login: action,
        })
    }
    loggedIn = false;
    isLoading = false;

    formData = {
        email: "",
        password: ""
    };

    setField(field, newValue) {
        this.formData[field] = newValue.trim();
    }

    login() {
        console.log(this.formData.email, this.formData.password)
        const postBody = {
			"email": this.formData.email.trim(),
			"password": this.formData.password.trim(),
        };

        try {
            post('/api/login', postBody).then(this.loginControl);
        }
        catch (err) {
            console.err(err);
        }
    }

    loginControl = res => {
        console.log(res)
        if (res.success === true) {
            console.log("Logged In!")
            this.loggedIn = true;
            this.setField('email', '');
            this.setField('password', '');
        } else {
            this.loggedIn = false;
            console.log("Error on Login")
        }
    }
}

const store = new LoginModel();
export default store;