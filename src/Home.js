import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = (props) => {
    const [ProductList, setProductList] = useState([])
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        GetProductdata()
        loadFavorites();
    }, [])

    const loadFavorites = async () => {
        try {
            const favoritesJSON = await AsyncStorage.getItem('favorites');
            if (favoritesJSON !== null) {
                setFavorites(JSON.parse(favoritesJSON));
            }
        } catch (error) {
            console.error('Error loading favorites: ', error);
        }
    };
    const addToFavorites = async (item) => {
        try {
            const updatedFavorites = [...favorites, item];
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error adding to favorites: ', error);
        }
    };
    const removeFromFavorites = async (item) => {
        try {
            const updatedFavorites = favorites.filter(fav => fav !== item);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error removing from favorites: ', error);
        }
    };
    const GetProductdata = () => {
        axios({
            method: "get",
            url: 'https://dummyjson.com/products'
        }).then(res => {
            const productsWithFavorites = res.data.products.map(product => ({
                ...product,
                favorite: false // Default value, can be changed later
            }));
            console.log(productsWithFavorites[0].favorite, "----")
            setProductList(productsWithFavorites)
        }).catch(err => {
            // console.log(err, "=====")
        })
    }

    const toggleFavorite = (index) => {
        const updatedProducts = [...ProductList];
        updatedProducts[index].favorite = !updatedProducts[index].favorite;
        setProductList(updatedProducts);
    };
    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <View style={{ flex: 0.3, backgroundColor: '#2A4BA0', }}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={styles.TopHeader}>
                            <Text style={styles.HeaderText}>Hey, Rahul</Text>
                            <Ionicons name='bag-outline' size={20} color="#fff" />
                        </View>
                        <View style={styles.TextInput}>
                            <AntDesign name="search1" size={20} color="#F8F9FB" style={styles.IconStyle} />
                            <TextInput
                                placeholder='Search Products or store'
                                placeholderTextColor={"#8891A5"}
                                style={{ fontSize: 14, color: '#fff', width: '80%' }}
                            />
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <Text style={styles.deliveryText}>DELIVARY TO</Text>
                                <Text style={styles.deliveryText}>WITHIN</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={styles.deliveryContainer}>
                                    <Text style={styles.deliveryText1}>Green Way 3000, Sylhet</Text>
                                    <Entypo name="chevron-down" size={20} color="#8891A5" />
                                </View>
                                <View style={styles.deliveryContainer}>
                                    <Text style={styles.deliveryText1}>1 Hour</Text>
                                    <Entypo name="chevron-down" size={20} color="#8891A5" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center' }}>

                    <View style={styles.bannerStyle}>
                        <Image source={require("./Assets/Group.png")} />
                        <View>
                            <Text style={[styles.bannerText, { fontSize: 20, fontWeight: 400 }]}>Get</Text>
                            <Text style={[styles.bannerText, { fontSize: 30, fontWeight: 700 }]}>50% OFF</Text>
                            <Text style={[styles.bannerText, { fontSize: 20, fontWeight: 400 }]}>on first 03 orders</Text>

                        </View>
                    </View>
                    <Text style={{ fontSize: 30, fontWeight: '400', color: '#1E222B', marginVertical: 20 }}>Recommended</Text>

                </View>
                <View style={styles.CartContainer}>

                    <FlatList
                        data={ProductList}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.CartStyle} key={item.id}>
                                    <TouchableOpacity style={styles.heartIcon}
                                        onPress={() => {
                                            toggleFavorite(index)
                                        }}
                                    >
                                        <AntDesign name={item.favorite==true?'heart':'hearto'} size={20} color={item.favorite == true ? '#FF8181' : '#000'} />
                                    </TouchableOpacity>
                                    <Image source={{ uri: item.thumbnail }} style={{ alignSelf: 'center', marginBottom: 20, height: 100, width: 100, resizeMode: 'contain' }} />

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                                        <View>
                                            <Text style={[styles.bannerText, { color: "#1E222B" }]}>${item.price}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: "400", color: '#616A7D', paddingVertical: 15 }}>{item.title}</Text>

                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.navigate("ProductDetails", { item: item })
                                            }}
                                        >
                                            <AntDesign name="pluscircle" size={20} color='#2A4BA0' />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }}
                    />
                </View>

            </View>
        </ScrollView >
    )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    TopHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30

    },
    ListContainer: {
        width: '90%',
        padding: 15
    },
    TextInput: {
        backgroundColor: '#153075',
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25
    },
    IconStyle: {
        paddingLeft: 20,
        paddingRight: 10
    },
    HeaderText: {
        fontSize: 22,
        color: '#F8F9FB',
        fontWeight: '600'
    },
    deliveryText: {
        fontSize: 11,
        color: '#8891A5',
        fontWeight: '800'
    },
    deliveryText1: {
        color: '#F8F9FB',
        fontSize: 14,
        fontWeight: '500',
        paddingRight: 5
    },
    deliveryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerStyle: {
        height: 150,
        backgroundColor: '#F9B023',
        borderRadius: 16,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    bannerText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: "600",
    },
    CartStyle: {
        backgroundColor: '#E7ECF0',
        borderRadius: 12,
        width: '45%',
        margin: 10
    },
    heartIcon: {
        marginTop: 20,
        marginLeft: 20,
        width: 30
    },
    CartContainer: {
        width: '90%',
        alignSelf: 'center'
    }
})