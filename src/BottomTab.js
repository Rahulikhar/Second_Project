import { Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Favourite from './Favourite';
import Categories from './Categories';
import More from './More';
import Entypo from 'react-native-vector-icons/Entypo'


const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: { marginBottom: 5 },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Entypo
                            name='home'
                            size={20}
                            color={color}
                        />
                    }
                }}
            />
            <Tab.Screen name="Categories" component={Categories}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: { marginBottom: 5 },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Entypo
                            name='sweden'
                            size={20}
                            color={color}
                        />
                    }
                }}
            />
            <Tab.Screen name="Favourite" component={Favourite}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: { marginBottom: 5 },
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Entypo
                        name='heart-outlined'
                        size={20}
                        color={color}
                    />
                    }
                }}
            />
            <Tab.Screen name="More" component={More}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: { marginBottom: 5 },
                    tabBarIcon: ({ focused, color, size }) => {
                        return  <Entypo
                        name='dots-three-vertical'
                        size={20}
                        color={color}
                    />
                    }
                }}
            />

        </Tab.Navigator>

    )
}

export default BottomTab



