const users = [];

const getUsers = (request, response) => {
    const responseJSON = { users };

    response.writeHead(200, { 'Content-Type': 'application/json' });

        response.write(JSON.stringify(responseJSON));
    
    
    response.end();
};

const addUser = (request, response) => {
      const { name, age } = request.body;

    //Will send error
    if (!name || !age) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({
            message: 'Name and age are required.'}));
        return response.end();
    }

    //Updating age
    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        existingUser.age = age;
        response.writeHead(204);
        return response.end();
    }

    //Add user
    const newUser = { name, age };
    users.push(newUser);

    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ message: 'User added'}));
    response.end()
};

const notReal = (request, response) => {
    const responseJSON = {
        message: 'Resource not found',
        id: 'not_found'
    };

    response.writeHead(404, { 'Content-Type': 'application/json' });

    if (request.method !== 'HEAD') {
        response.write(JSON.stringify(responseJSON));
    }

    response.end();
};

module.exports = {
    getUsers,
    addUser,
    notReal
};
