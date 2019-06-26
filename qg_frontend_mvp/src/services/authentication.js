import {authenticate, register} from './fetchAPI';

export function GoogleAuthentication(response) {
    
    const userGoogleId = response.profileObj.googleId
    const userEmail = response.w3.U3;
    const userName = response.w3.ig;
    const userAvatar = response.w3.Paa;
    const userPassword = `${userEmail}${userGoogleId}`;

    register('auth/registration', userEmail, userPassword)
        .then(json => {
            console.log('register');
            console.log(json);
        })

    authenticate(userEmail, userPassword)
        .then( json => {
            console.log(json);
            const userData = {
                'email' : userEmail,
                'name' : userName,
                'avatar' : userAvatar,
                'accessToken': json.token,
                'userId' : json.userId
            };

            console.log(userData);
            
            return localStorage.setItem('userData', JSON.stringify(userData));
        })
}