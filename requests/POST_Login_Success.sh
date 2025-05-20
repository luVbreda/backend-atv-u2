curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "email": "contatolucasbreda@gmail.com",
        "password": "Lucas.OpenNotes.123"
    }'

read -p "Pressione qualquer tecla para sair..."