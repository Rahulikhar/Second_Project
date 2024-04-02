import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Rating } from 'react-native-ratings';
import { SwiperFlatList } from 'react-native-swiper-flatlist';


const { width } = Dimensions.get('window');


const ProductDetails = (props) => {
    const [ProductDtail, setProductDtail] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://dummyjson.com/products/${props.route.params.item.id}`
        }).then(res => {
            if (res.status == 200) {
                console.log(res.data)
                setProductDtail(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const colors = ['tomato'];
    return (
        <View style={styles.maincontainer}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.BackBTN}
                    activeOpacity={0.9}
                    onPress={() => props.navigation.goBack()}
                >
                    <AntDesign name="left" color="#000" size={10} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                >
                    <Ionicons name='bag-outline' size={25} color="#000" />
                </TouchableOpacity>

            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={[styles.MainText, { fontWeight: '300' }]}>Thin  Choise</Text>
                <Text style={styles.MainText}>Top Orange</Text>

            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', alignItems: 'center' }}>
                <Rating
                    startingValue={ProductDtail.rating}
                    fractions={2}
                    imageSize={20}
                    fullStarColor="#FFD700" // Yellow color for full stars
                    emptyStarColor="#000" // Gray color for unselected stars

                    style={{ padding: 5 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#A1A1AB' }}> 110 Reviews</Text>
            </View>
            <View style={{ marginTop: 10, height: 250 }}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    index={2}
                    // showPagination
                    data={ProductDtail.images}
                    renderItem={({ item }) => (
                        <View style={[styles.child, { backgroundColor: item }]}>
                            <Image source={{ uri: item }} height={250} width={width} resizeMode='cover' />
                        </View>
                    )}
                />
                <TouchableOpacity style={styles.heartIcon}
                    activeOpacity={0.9}>
                    <AntDesign name={props.route.params.item.favorite == true ? 'heart' : 'hearto'} size={20} color={props.route.params.item.favorite == true ? '#FF8181' : '#000'} />
                </TouchableOpacity>
            </View>
            <View style={{ alignSelf: 'center', width: '100%', width: "90%", alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: '#2A4BA0' }}>${ProductDtail.price}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "400", color: '#2A4BA0' }}>/KG</Text>
                </View>
                <Text style={{ backgroundColor: '#2A4BA0', borderRadius: 20, padding: 5, fontSize: 12, marginLeft: 10, color: '#fff' }}>${ProductDtail.discountPercentage} OFF</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ width: '40%' }}
                    activeOpacity={0.9}
                    onPress={() => {
                        props.navigation.navigate("ShoppingCart", { ProductDtail: ProductDtail })
                    }}
                >
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#2A4BA0', padding: 15, textAlign: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#2A4BA0' }}>Add To Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '40%' }} activeOpacity={0.9}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff', backgroundColor: '#2A4BA0', padding: 15, textAlign: 'center', borderRadius: 10 }}>Buy Now</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#1E222B', marginBottom: 5 }}>
                    Details
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#8891A5' }}>{ProductDtail.description}</Text>
            </View>
        </View>
    )
}

export default ProductDetails



const styles = StyleSheet.create({
    container: { height: 200, backgroundColor: 'white' },
    child: { justifyContent: 'center' },
    text: { fontSize: width * 0.5, textAlign: 'center' },
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    BackBTN: {
        backgroundColor: "#F8F9FB",
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: "space-between",
        alignSelf: 'center',
        marginTop: 20
    },
    MainText: {
        color: '#1E222B',
        fontSize: 50,
        fontWeight: "800"
    },
    heartIcon: {
        height: 50,
        width: 50,
        borderRadius: 7,
        backgroundColor: '#fff',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: "center",
        left: 320,
        top: 20
    }
})