import { resolve } from "dns";

class UserService {

    getData(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: `${id}`,
                    name: '袁大头',
                    desr: 'go warries go!!'
                })
            }, 1000)
        })
    }
}

export default UserService;