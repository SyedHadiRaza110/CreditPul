from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint('auth', __name__)

SECRET_KEY = os.environ.get("JWT_SECRET", "fallback_dev_secret")

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": os.environ.get("DB_PASSWORD", ""),
    "database": "creditpul"
}

def get_db():
    return pymysql.connect(**DB_CONFIG, cursorclass=pymysql.cursors.DictCursor)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"error": "Missing fields"}), 400

    hashed = generate_password_hash(password)

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id FROM users WHERE email=%s", (email,))
            if cur.fetchone():
                return jsonify({"error": "Email already registered"}), 409

            cur.execute(
                "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)",
                (name, email, hashed)
            )
            conn.commit()
        return jsonify({"message": "Registered successfully"}), 201
    finally:
        conn.close()


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email=%s", (email,))
            user = cur.fetchone()

        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({"error": "Invalid credentials"}), 401

        token = jwt.encode({
            "user_id": user['id'],
            "role": user['role'],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "token": token,
            "name": user['name'],
            "role": user['role']
        }), 200
    finally:
        conn.close()


def token_required(f):
    from functools import wraps

    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = payload['user_id']
            request.user_role = payload['role']
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated
