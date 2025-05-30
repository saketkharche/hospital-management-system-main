import { jwtDecode } from 'jwt-decode';  // Changed from import jwtDecode

function isTokenExpired(token) {
    try {
        if (!token) {
            return true;
        }
        
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        
        return !decoded.exp || decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}

export default isTokenExpired;
