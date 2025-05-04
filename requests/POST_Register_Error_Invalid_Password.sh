curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/register' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": ""
    }'

read -p "Pressione qualquer tecla para sair..."