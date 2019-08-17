import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.25.150.61:3333'
});

export default api;

/*
Para utilizar o Axios no Android (apenas) é necessário
realizar algumas configurações para a aplicação conhecer
a url localhost.

Para seguir as configurações, seguida o passo 2
caso deseja "dribla-las" basta utilizar um IP no lugar
de localhost
1)
-Você pode utilizar o seu próprio IP da rede
-Utilizar o IP do GenyMotion http://10.0.3.2:3333
-Utilizar o IP do android studio http://10.0.2.2:3333
2) Fazer um redirecionamento de porta com ADB
adb reverse tcp:3333 tcp:3333
*/