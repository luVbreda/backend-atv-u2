curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/login' \
    --header 'Content-Type: application/json' \
    --data '{
        "email": "johndoe@example.com"
    }'

read -p "Pressione qualquer tecla para sair..."