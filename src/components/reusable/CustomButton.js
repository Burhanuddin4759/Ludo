import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
    const { title, sectitle, onPress, style, fontstyle, secfontstyle, icon } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btn, style]}
        >
            {
                icon
                    ?
                    icon
                    :
                    <View>
                        <Text style={fontstyle}>
                            {title}
                        </Text>
                        {
                            sectitle
                                ?
                                <Text style={secfontstyle}>
                                    {sectitle}
                                </Text>
                                : null
                        }

                    </View>
            }
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btn: {
        borderRadius: 12,
        justifyContent: 'center'
    }
})