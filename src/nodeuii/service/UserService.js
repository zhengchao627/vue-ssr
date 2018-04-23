import { resolve } from "dns";

class UserService {

    getData(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`Hello UserAction ${id}`)
            }, 1000)
        })
    }
}

export default UserService;