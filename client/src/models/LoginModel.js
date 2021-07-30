import { observable, action, makeObservable } from 'mobx';

class LoginModel {
    constructor() {
        makeObservable(this, {
            formData: observable,
            loggedIn: observable,
            setField: action,
            login: action,
        })
    }
    loggedIn = false;

    formData = {
        email: "",
        password: ""
    };

    setField(field, newValue) {
        this.formData[field] = newValue.trim();
    }

    login() {
        this.loggedIn = true;
        this.setField('email', '');
        this.setField('password', '');
    }
}

const store = new LoginModel();
export default store;