curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/register' \
    --header 'Content-Type: application/json' \
    --data '{
        "username": "John Doe",
        "email": "johndoe@example.com",
        "password": "securepassword123"
    }'

read -p "Pressione qualquer tecla para sair..."