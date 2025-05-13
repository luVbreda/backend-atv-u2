curl --request POST \
    --url 'https://backtest.lucasbreda.me/notes' \
    --header "Authorization: Bearer <TOKEN_JWT_REAL>" \
    --header "Content-Type: application/json" \
    --data '{
  "title": "Minha primeira nota",
  "content": "Este é o conteúdo da minha nota."
}'