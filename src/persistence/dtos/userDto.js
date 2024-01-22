
export const convertToUserDto = (user) => {
    return {
        user_id: user._id,
        user_name: user.firstName,
        user_email: user.email,
        user_cart: user.cart,
        user_role: user.role
    }
}


