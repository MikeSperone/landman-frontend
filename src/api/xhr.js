import { user } from '.';
function xhr(type, url, data, options={ }) {

    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(type, url, true);
        if (type === "PUT") {
            req.setRequestHeader("Content-type", "application/json");
        } else if (data instanceof FormData) {
            // req.setRequestHeader("Content-type", "multipart/form-data");
        } else {
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        const authorizationIsRequired = type !== "GET" && !url.match('login');
        if (authorizationIsRequired) {
            // authorization needed
            if (user.isLoggedIn) {
                console.info('isLoggedIn');
                req.setRequestHeader("Authorization", "Bearer " + user.token);
            } else {
                alert('Not logged in');
                return reject({status: 401});
            }
        }

        if (typeof options.onprogress !== 'undefined') {
            req.onprogress = options.onprogress;
        }

        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                switch (req.status) {
                    case 200:
                        console.info('req: ', req);
                        break;
                    case 201:
                        console.info('req: ', req);
                        break;
                    case 204:
                        console.info('success');
                        break;
                    case 400:
                        alert('Bad Request');
                        break;
                    case 401:
                        alert('You must be logged in to complete this action');
                        break;
                    case 404:
                        console.info('not found');
                        break;
                    case 500:
                        alert('server error');
                        break;
                    default:
                        console.log('unhandled response status', req.status);
                        return reject(JSON.parse(req.responseText));
                }
                console.info('responseText: ', req.responseText);
                return resolve(JSON.parse(req.responseText));
            }
        };
        req.send(data);
    });
}

export default xhr;
