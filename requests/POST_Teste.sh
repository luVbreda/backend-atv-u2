curl --request POST \
    --url 'https://backtest.lucasbreda.me/notes' \
    --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmNiYmFjNmU5NTUxNTM1NjU5ZDZjYyIsImlhdCI6MTc0Nzc2MjI5MywiZXhwIjoxNzQ3NzY1ODkzfQ.9KgtlNEQFjKi2rnfSEyIx7VxTeu-bHscCAA022YAhW0" \
    --header "Content-Type: application/json" \
    --data '{
  "title": "Minha primeira nota",
  "content": "Espero que ariel se foda!"
}'

read -p "Pressione qualquer tecla para sair..."