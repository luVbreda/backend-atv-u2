curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "email": "invalid-email@example.com",
        "password": "securepassword123"
    }'

read -p "Pressione qualquer tecla para sair..."