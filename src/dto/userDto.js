export default class userDto {
    constructor(user) {
        this.user = user.first_name
        this.email = user.email;
        this.userRole = user.userRole
        this.documents = user.documents
        this.id = user._id,
        this.cart = user.cart
    }
}