import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"

const ShoppingCart = (props) => {
    return (
        <View style={styles.maincontainer}>
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.BackBTN}
                    activeOpacity={0.9}
                    onPress={()=>{
                        props.navigation.goBack()
                    }}
                >
                    <AntDesign name="left" color="#000" size={10} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '400', paddingLeft: 20, color: '#1E222B' }}>Shopping Cart (5)</Text>
            </View>
            <View style={{ flex: 1, }}>
                <FlatList
                    data={[1]}
                    renderItem={({ item }) => {
                        return (

                            <View style={{ flexDirection: 'row', alignItems: "center", width: '90%', alignSelf: 'center', justifyContent: 'space-between', borderBottomWidth: 1, paddingVertical: 15, borderBottomColor: '#EBEBFB' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={{ uri: props.route.params.ProductDtail?.images[1] }} height={30} width={30}
                                        style={{ borderRadius: 7 }}
                                        resizeMode='cover'
                                    />
                                    <View style={{ paddingLeft: 20 }}>
                                        <Text style={{ color: "#1E222B", fontSize: 14, fontWeight: "400" }}>{props.route.params.ProductDtail.title}</Text>
                                        <Text style={{ color: "#1E222B", fontSize: 14, fontWeight: "400" }}>${props.route.params.ProductDtail.price}</Text>
                                    </View>

                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={styles.BackBTN}
                                            activeOpacity={0.9}
                                        >
                                            <AntDesign name="minus" color="#1E222B" size={15} />
                                        </TouchableOpacity>
                                        <Text style={{ paddingHorizontal: 10, color: '#1E222B', fontSize: 14, fontWeight: '500' }}>1</Text>
                                        <TouchableOpacity style={styles.BackBTN}
                                            activeOpacity={0.9}
                                        >
                                            <AntDesign name="plus" color="#1E222B" size={15} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={{ width: '96%', alignSelf: 'center', backgroundColor: '#F8F9FB', borderRadius: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '96%', alignSelf: 'center', padding: 20, }}>
                    <View>
                        <Text style={{ padding: 10, fontSize: 14, fontWeight: '400', color: '#616A7D' }}>Subtotal</Text>
                        <Text style={{ padding: 10, fontSize: 14, fontWeight: '400', color: '#616A7D' }}>Delivery</Text>
                        <Text style={{ padding: 10, fontSize: 14, fontWeight: '400', color: '#616A7D' }}>Total</Text>
                    </View>
                    <View>
                        <Text style={{ padding: 10, fontSize: 14, fontWeight: '500', color: '#1E222B' }}>${props.route.params.ProductDtail.price}</Text>
                        <Text style={{ padding: 10, fontSize: 14, fontWeight: '500', color: '#1E222B' }}>$2</Text>
                        <Text style={{ padding: 10, fontSize: 14, fontWeight: '500', color: '#1E222B' }}>${props.route.params.ProductDtail.price + 2}</Text>
                    </View>
                </View>

                <TouchableOpacity style={{ width: "90%", alignSelf: 'center', backgroundColor: '#2A4BA0', padding: 15, borderRadius: 17, marginBottom: 30 }}
                    activeOpacity={0.9}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff', textAlign: 'center' }}>Proceed  To checkout</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default ShoppingCart

const styles = StyleSheet.create({
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
        borderRadius: 20,
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    }
})