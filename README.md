# stateless-auth-tutorial

## Usage
```
git clone https://github.com/iwsh/stateless-auth-tutorial.git
cd stateless-auth-tutorial
docker compose up
```

1. You can access login page at http://localhost:3000
2. At first, http://localhost:3000/cookie cannot be accessed (redirected to login page)
3. After login, you can see the decoded JWT access_token in http://localhost:3000/cookie.

User: admin  
Password: password
