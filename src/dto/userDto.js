export default class userDto {
    constructor(user) {
        this.email = user.email;
        this.userRole = user.userRole
        this.documents = user.documents
    }
}