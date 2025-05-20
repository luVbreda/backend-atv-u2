curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "email": "caiotaio6@gmail.com",
        "password": "123456"
    }'

read -p "Pressione qualquer tecla para sair..."