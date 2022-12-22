from fastapi import FastAPI, HTTPException, Response, Request
from fastapi.middleware.cors import CORSMiddleware
import jwt
import os
from pydantic import BaseModel

app = FastAPI()
origin = os.getenv("UI_ORIGIN", default="http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    # get frontend origin from env, or use "http://localhost:3000" for debug
    allow_origins=[origin],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

SECRET_KEY = os.getenv("SECRET")
if SECRET_KEY is None:
    SECRET_KEY = "my-secret"


class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(req: LoginRequest, response: Response):
    username = req.username
    password = req.password
    # usernameとpasswordを使って、認証を行います。
    # 認証が成功した場合は、JWTトークンを生成して返却します。
    if username == "admin" and password == "password":
        payload = {"username": username}
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # JWTトークンをcookieとして設定します。
        response.set_cookie(key="access_token", value=token)
        return {"message": "Successfully logged in"}
    else:
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")


@app.get("/cookie")
def read_cookie(request: Request):
    access_token = request.cookies["access_token"]
    if access_token is not None:
        try:
            payload = jwt.decode(access_token, SECRET_KEY,
                                 algorithms=['HS256'])
            return {"payload": payload}
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid access_token")
    else:
        raise HTTPException(
            status_code=401, detail="Access_token is not present in cookie")
