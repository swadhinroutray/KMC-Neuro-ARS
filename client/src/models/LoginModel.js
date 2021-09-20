import { observable, action, makeObservable } from 'mobx';
import { post } from '../utils/api'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

class LoginModel {
    constructor() {
        makeObservable(this, {
            formData: observable,
            loggedIn: observable,
            authChecked: observable,
            isLoading: observable,
            setField: action,
            login: action,
            logout: action,
            refreshAuth: action, 
        })
    }
    authChecked = false
    loggedIn = false;
    isLoading = false;

    formData = {
        email: "",
        password: ""
    };

    setField(field, newValue) {
        this.formData[field] = newValue.trim();
    }

    refreshAuth() {
        if (Cookies.get("connect.sid")) {
            this.authChecked = false;
            return;
        }
        else {
            try {
                this.login()
            }
            catch (err) {
            }
        }
    }

    login() {
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
        finally {
            this.authChecked = true;
        }
    }

    loginControl = res => {
        console.log(res)
        if (res.success === true) {
            this.loggedIn = true;
            this.setField('email', '');
            this.setField('password', '');
        } else {
            this.loggedIn = false;
            console.log("Error on Login")
            toast.error(`Error: ${res.data !== ''? res.data: 'Check the provided credentials.'}`, {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
        }
    }

    logout() {
        try {
            post('/api/logout', {}).then(res => { console.log(res) });
        }
        catch (err) {
            console.err(err);
        }
        finally {
            Cookies.remove("connect.sid", { path: '' })
            console.log("Logged Out")
            this.authChecked = true;
            this.loggedIn = false;
        }
    }
}

const store = new LoginModel();
export default store;