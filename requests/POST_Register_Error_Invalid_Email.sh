curl --request POST \
    --url 'https://backtest.lucasbreda.me/users/register' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "John Doe",
        "email": "invalid-email",
        "password": "securepassword123"
    }'

read -p "Pressione qualquer tecla para sair..."