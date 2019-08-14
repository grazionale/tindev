import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './Pages/Login';
import Main from './Pages/Main';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
); 

/*createSwitchNavigator faz uma navegação entre páginas de maneira "seca"
*onde o usuário não visualiza efeitos, não haverá mudanças
*de bars, e também não será possível retornar a página
*anterior, por isso, utilizamos ela no Login

createStackNavigator possibilita a navegação entre páginas,
*inclusive cria as bars com botão de voltar

createBottomNavigator cria uma navegação por tabs na parte 
*de baixo do app

createMaterialTopTabNavigator navegação por abas no topo

createDrawerNavigator navegação por gesto de menu, slide
*esquerda para direita e abre o menu.
*/