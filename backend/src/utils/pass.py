import bcrypt

usuarios = {
    "user@example.com": "user123",
    "adminCAN@fifa.com": "admin123",
    "adminMEX@fifa.com": "admin123",
    "adminUSA@fifa.com": "admin123",
    "funcionario1@fifa.com": "func123",
    "funcionario2@fifa.com": "func123",
}

for mail, password in usuarios.items():
    hashed = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    ).decode()

    print(f"{mail} -> {hashed}")