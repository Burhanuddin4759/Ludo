import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonStyles from '../../enums/CommonStyles'
import BG from '../../assets/images/bg.jpg'
import { HEIGHT, WIDTH } from '../../enums/StyleGuides'

const Wrapper = (props) => {
    const { children, style } = props
    return (
        <ImageBackground
            style={styles.container}
            source={BG}
        >
            <SafeAreaView style={CommonStyles.container}>
                {children}
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        // flexWrap:'wrap'
        // resizeMode: 'cover'
    }
})