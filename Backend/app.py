from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'tamil_2005' 
app.config['MYSQL_DB'] = 'dashboard_db'

mysql = MySQL(app)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    cursor.execute("INSERT INTO users (username, password, last_login) VALUES (%s, %s, %s)",
                   (username, password, datetime.now()))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "User registered successfully"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()

    if user:
        cursor.execute("UPDATE users SET last_login = %s WHERE username = %s", (datetime.now(), username))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/users", methods=["GET"])
def get_users():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, username, last_login FROM users ORDER BY last_login DESC")
    users = cursor.fetchall()
    cursor.close()

    result = [
        {"id": u[0], "username": u[1], "last_login": u[2].strftime("%Y-%m-%d %H:%M:%S")}
        for u in users
    ]
    return jsonify(result)

@app.route("/recent-logins", methods=["GET"])
def recent_logins():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT username, last_login FROM users ORDER BY last_login DESC LIMIT 3")
    users = cursor.fetchall()
    cursor.close()

    return jsonify([
        {"username": u[0], "last_login": u[1].strftime("%Y-%m-%d %I:%M %p")}
        for u in users
    ])

@app.route("/total-logins", methods=["GET"])
def total_logins():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    cursor.close()
    return jsonify({"total_logins": count})

@app.route("/calls-today", methods=["GET"])
def calls_today():
    today = datetime.now().date()
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM users WHERE DATE(last_login) = %s", (today,))
    count = cursor.fetchone()[0]
    cursor.close()
    return jsonify({"calls_today": count})

if __name__ == "__main__":
    app.run(debug=True)
