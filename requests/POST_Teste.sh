curl --request POST \
    --url 'https://backtest.lucasbreda.me/notes' \
    --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTZiNjEzMDllODM4ZjgyZjM0MzE2ZCIsImlhdCI6MTc0NzE2ODE5NCwiZXhwIjoxNzQ3MTcxNzk0fQ.2e7gQ6i-XaelDUEcKQkEY6lZH4sO9uZXG6md_xgW8hQ" \
    --header "Content-Type: application/json" \
    --data '{
  "title": "Minha primeira nota",
  "content": "Este é o conteúdo da minha nota."
}'

read -p "Pressione qualquer tecla para sair..."