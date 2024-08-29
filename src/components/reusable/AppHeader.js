import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../enums/StyleGuides';
import TextLable from './TextLable';

const AppHeader = ({ title, leftComp, rightComp, centerComp, titleStyle, style }) => {
    return (
        <View style={[styles.header, style]}>

            <View style={styles.leftComp}>
                {leftComp ? leftComp : <View style={styles.space} />}
            </View>

            <View style={styles.centerComp}>
                {centerComp ? centerComp : title ? (
                    <TextLable
                        title={title}
                        style={[styles.textStyle, titleStyle]}
                    />
                ) : (
                    <View style={styles.space} />
                )}
            </View>

            <View style={styles.rightComp}>
                {rightComp ? rightComp : <View style={styles.space} />}
            </View>

        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    leftComp: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%'
    },
    centerComp: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    rightComp: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%'
    },
    space: {
        width: '10%',
    },
    textStyle: {
        color: COLORS.WHITE,
        // ...TEXT_STYLE.textBold,
    },
});
