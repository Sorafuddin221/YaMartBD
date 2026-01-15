export const sendToken = (user, statusCode, rememberMe = false) => {
    const token = user.getJWTToken();

    // Determine the cookie expiration
    const expirationDays = rememberMe 
        ? 30 
        : parseInt(process.env.EXPIRE_COOKIE || '7', 10);
    
    const cookieOptions = {
        expires: new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    };

    return {
        success: true,
        user,
        token,
        cookieOptions
    };
};