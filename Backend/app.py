from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="dashboard_db"
)
cursor = conn.cursor(dictionary=True)

@app.route("/stats", methods=["GET"])
def get_stats():
    cursor.execute("SELECT COUNT(*) AS total_signups FROM users")
    total_signups = cursor.fetchone()["total_signups"]
    
    cursor.execute("SELECT SUM(login_count) AS total_logins FROM users")
    total_logins = cursor.fetchone()["total_logins"] or 0
    
    return jsonify({"total_signups": total_signups, "total_logins": total_logins})

@app.route("/users", methods=["GET"])
def get_users():
    cursor.execute("SELECT id, name, phone, details FROM users")
    users = cursor.fetchall()
    return jsonify(users)

@app.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    cursor.execute("SELECT id, name, phone, details FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

@app.route("/top-users", methods=["GET"])
def get_top_users():
    cursor.execute("SELECT name, phone, details, login_count FROM users ORDER BY login_count DESC LIMIT 3")
    top_users = cursor.fetchall()
    return jsonify(top_users)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE name = %s", (data['username'],))
    if cursor.fetchone():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    cursor.execute("INSERT INTO users (name, password) VALUES (%s, %s)", (data['username'], hashed_password))
    conn.commit()
    return jsonify({"message": "User created successfully"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE name = %s", (data['username'],))
    user = cursor.fetchone()
    
    if user and check_password_hash(user['password'], data['password']):
        return jsonify({"message": "Login successful"})
    
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE name = %s", (data['username'],))
    user = cursor.fetchone()
    
    if user:
        hashed_password = generate_password_hash(data['new_password'], method='pbkdf2:sha256')
        cursor.execute("UPDATE users SET password = %s WHERE name = %s", (hashed_password, data['username']))
        conn.commit()
        return jsonify({"message": "Password updated successfully"})
    
    return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
