import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import {View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png'; 
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

export default function Main( { navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(false);

    //Param1 = Função a ser executada, Array[param2] variaveis que quando alteradas irão chamar a função Param1. 
    //Obs: Se passar array[param2] vazio, então só irá executar a function uma vez
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            });

            setUsers(response.data);
        }
        loadUsers();
    }, [id]);

    //Estabelece uma conexao com backend assim que entra na tela Main
    useEffect(() => {
        const socket = io('http://172.25.150.61:3333', {
            query: { user: id }
        });
        //Fica ouvindo a function match ser executada no backend pelo 'socket.init'  
        socket.on('match', dev => {
            setMatchDev(dev);
        })
    }, [id]);

    async function handleLike() {
        //utilizando desistruturação do javascript  
        const [firstUser, ...otherUsers] = users;
        //param1 = url, param2 = body, param3 = headers
        await api.post(`/devs/${firstUser._id}/likes`, null, {
            headers: { user: id }
        });
        setUsers(otherUsers);
    }

    async function handleDislike() {
        //utilizando desistruturação do javascript  
        const [firstUser, ...otherUsers] = users;
        //param1 = url, param2 = body, param3 = headers
        await api.post(`/devs/${firstUser._id}/dislikes`, null, {
            headers: { user: id }
        });
        setUsers(otherUsers);
    }

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
                { users.length === 0 
                ? <Text style={styles.empty}>Acabou =(</Text>
                :   (
                    users.map((user, index) => (
                        <View key={user._id} style={[styles.card, { zIndex: users.length - index}]}>
                            <Image style={styles.avatar} source={ {uri: user.avatar }} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View>
                    )) 
                )}
            </View>
            {users.length > 0 && (
                <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleDislike} style={styles.button}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLike} style={styles.button}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
            )}
            { matchDev && (
                <View style={styles.matchContainer}>
                    <Image style={styles.matchImagem} source={itsamatch} />
                    <Image style={styles.matchAvatar} source={ {uri: matchDev.avatar}} />                
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>
                    <TouchableOpacity onPress={ () => setMatchDev(null)}>
                        <Text style={styles.closeMatch}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            ) }
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        marginTop: 30
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    bio: {
        fontSize: 14,
        color: "#999",
        marginTop: 5,
        lineHeight: 18  ,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2, //Sombra para android, para IOS, tem que usar tudo que está baixo
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },

    matchContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    matchImagem: {
        height: 60,
        resizeMode: 'contain'
    },

    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30
    },

    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    },

    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },

    closeMatch: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 30
    }
});