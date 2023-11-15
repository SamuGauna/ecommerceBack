export default class userDto {
    constructor(user){
        this.user_id = user._id,
        this.user_name = user.firstName,
        this.user_email = user.email,
        this.user_cart = user.cart,
        this.user_role = user.role
    }
}


