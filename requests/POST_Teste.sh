curl --request POST \
    --url 'https://backtest.lucasbreda.me/notes' \
    --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmNkMTk5NmQyMmUyNmJjYjE4ZTkwNiIsImlhdCI6MTc0Nzc2NzkwMSwiZXhwIjoxNzQ3NzcxNTAxfQ.lh_zKADatoc1iepGu3g6wonf1XYHqtcr72CDhrL-65w" \
    --header "Content-Type: application/json" \
    --data '{
  "title": "ETItulo",
  "content": "pudim.cpm.br"
}'

read -p "Pressione qualquer tecla para sair..."